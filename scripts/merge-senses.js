'use strict';
// Merges other senses (docs/senses/final.json) into packages/toeic.json as each word's optional 6th field
// [[sense, ex, exKo], ...] and records their hash in docs/toeic-sources.json (postSortValidation.senses).
// Re-running replaces every 6th field, so it is idempotent; words absent from the input lose theirs.
// Usage: node scripts/merge-senses.js [input=docs/senses/final.json] [--check]   (--check writes nothing)
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const Core = require('../core.js');
const root = path.join(__dirname, '..');

const normalize = text => text.normalize('NFKC').replace(/[‘’]/g, "'").replace(/\s+/g, ' ').trim().toLowerCase();
const hash = value => crypto.createHash('sha256').update(JSON.stringify(value)).digest('hex');

// Same projection as wordsSha256: words sorted by normalized headword, here [headword, senses] for words with senses.
function sensesSha256(words) {
  return hash(words.filter(word => word.length > 5).map(word => [word[0], word[5]])
    .sort((a, b) => { const l = normalize(a[0]), r = normalize(b[0]); return l < r ? -1 : l > r ? 1 : 0; }));
}

// Returns {words, errors}; words is a new array, the input package is not changed.
function merge(words, entries) {
  const errors = [];
  const byIndex = new Map();
  if (!Array.isArray(entries)) return {words, errors:['input is not an array']};
  entries.forEach((entry, i) => {
    const where = `#${i} ${entry && entry.en}`;
    const word = entry && Number.isInteger(entry.index) ? words[entry.index] : null;
    if (!word) return errors.push(`${where}: index ${entry && entry.index} out of range`);
    if (word[0] !== entry.en) return errors.push(`${where}: index ${entry.index} is "${word[0]}"`);
    const sense = [entry.sense, entry.ex, entry.exKo];
    if (!sense.every(field => typeof field === 'string' && field.trim() === field && field)) return errors.push(`${where}: empty or padded sense/ex/exKo`);
    if (!Core.clozeExample([word[0], '', '', entry.ex], false)) return errors.push(`${where}: headword not found in ex (cloze)`);
    if (entry.ex === word[3]) return errors.push(`${where}: ex repeats the main example`);
    const list = byIndex.get(entry.index) || [];
    if (list.some(other => other[0] === entry.sense || other[1] === entry.ex)) return errors.push(`${where}: duplicate sense or ex`);
    list.push(sense);
    byIndex.set(entry.index, list);
  });
  return {words:words.map((word, index) => byIndex.has(index) ? [...word.slice(0, 5), byIndex.get(index)] : word.slice(0, 5)), errors};
}

// Keeps the file's hand layout: one field per line, senses on one line, levels compact.
function formatPackage(pkg) {
  const head = Object.keys(pkg).filter(key => key !== 'words')
    .map(key => `  ${JSON.stringify(key)}: ${JSON.stringify(pkg[key])}`);
  const words = pkg.words.map(word => `    [\n${word.map(field => `      ${JSON.stringify(field)}`).join(',\n')}\n    ]`);
  return `{\n${head.join(',\n')},\n  "words": [\n${words.join(',\n')}\n  ]\n}\n`;
}

if (require.main === module) {
  const args = process.argv.slice(2);
  const check = args.includes('--check');
  const input = path.resolve(root, args.find(arg => !arg.startsWith('--')) || 'docs/senses/final.json');
  const pkgFile = path.join(root, 'packages/toeic.json');
  const sourcesFile = path.join(root, 'docs/toeic-sources.json');
  const pkgText = fs.readFileSync(pkgFile, 'utf8');
  const pkg = JSON.parse(pkgText);
  const {words, errors} = merge(pkg.words, JSON.parse(fs.readFileSync(input, 'utf8')));
  if (errors.length) {
    console.error(`${errors.length} errors, nothing written:\n` + errors.join('\n'));
    process.exit(1);
  }
  const withSenses = words.filter(word => word.length > 5);
  const summary = {
    source: path.relative(root, input).replace(/\\/g, '/'),
    wordCount: withSenses.length,
    senseCount: withSenses.reduce((sum, word) => sum + word[5].length, 0),
    sensesSha256: sensesSha256(words),
    hashProjection: 'SHA-256 of JSON.stringify of [headword, senses] for words with a 6th field, sorted like wordsSha256. wordsSha256 covers the first five fields only.'
  };
  console.log(JSON.stringify(summary, null, 2));
  if (check) process.exit(0);
  // Keep each file's line endings (core.autocrlf checkouts use CRLF; git stores LF either way).
  const eol = text => text.includes('\r\n') ? out => out.replace(/\n/g, '\r\n') : out => out;
  fs.writeFileSync(pkgFile, eol(pkgText)(formatPackage({...pkg, words})));
  const sourcesText = fs.readFileSync(sourcesFile, 'utf8');
  const sources = JSON.parse(sourcesText);
  sources.postSortValidation.senses = summary;
  fs.writeFileSync(sourcesFile, eol(sourcesText)(JSON.stringify(sources, null, 2) + '\n'));
  console.log('wrote packages/toeic.json and docs/toeic-sources.json');
}

module.exports = {merge, formatPackage, sensesSha256};
