'use strict';
// Merges other senses (docs/senses/<input>.json) into packages/<package>.json as each word's optional 6th field
// [[sense, ex, exKo], ...] and records their hash in docs/<package>-sources.json.
// A sense missing from the word's ko is appended as "ko; sense" so the meaning quiz accepts it.
// Re-running replaces every 6th field, so it is idempotent; words absent from the input lose theirs.
// Usage: node scripts/merge-senses.js [package=toeic] [input] [--check]   (--check writes nothing)
//   input defaults to docs/senses/final.json for toeic, docs/senses/<package>-final.json otherwise.
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

// Returns {words, errors, koAdded}; words is a new array, the input package is not changed.
function merge(words, entries) {
  const errors = [];
  const byIndex = new Map();
  if (!Array.isArray(entries)) return {words, errors:['input is not an array'], koAdded:[]};
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
  const koAdded = [];
  const merged = words.map((word, index) => {
    if (!byIndex.has(index)) return word.slice(0, 5);
    let ko = word[1];
    for (const [sense] of byIndex.get(index)) if (!ko.includes(sense)) { ko += '; ' + sense; koAdded.push(`${word[0]}: ${ko}`); }
    return [word[0], ko, ...word.slice(2, 5), byIndex.get(index)];
  });
  return {words:merged, errors, koAdded};
}

// Keeps each package file's hand layout, read from its current text (layoutText); default is the TOEIC layout:
// header keys compact or pretty-printed, words one field per line (toeic) or one word per line (suneung, teps).
function formatPackage(pkg, layoutText = '') {
  const text = layoutText.replace(/\r\n/g, '\n');
  const prettyHead = /\n {2}"[^"]+": [[{]\n/.test(text.split('\n  "words"')[0]);
  const wordRows = /\n {2}"words": \[\n {4}\[["\]]/.test(text);
  const head = Object.keys(pkg).filter(key => key !== 'words').map(key => `  ${JSON.stringify(key)}: ${prettyHead
    ? JSON.stringify(pkg[key], null, 2).replace(/\n/g, '\n  ') : JSON.stringify(pkg[key])}`);
  const words = pkg.words.map(word => wordRows ? `    ${JSON.stringify(word)}`
    : `    [\n${word.map(field => `      ${JSON.stringify(field)}`).join(',\n')}\n    ]`);
  return `{\n${head.join(',\n')},\n  "words": [\n${words.join(',\n')}\n  ]\n}\n`;
}

// Adds or replaces a last top-level "senses" key as text, so the rest of a hand-formatted sources file stays byte-identical.
function withSensesKey(text, summary) {
  const body = text.replace(/\r\n/g, '\n');
  const marker = body.lastIndexOf(',\n  "senses": {');
  const head = marker >= 0 ? body.slice(0, marker) : body.replace(/\s*\}\s*$/, '');
  return `${head},\n  "senses": ${JSON.stringify(summary, null, 2).replace(/\n/g, '\n  ')}\n}\n`;
}

if (require.main === module) {
  const args = process.argv.slice(2).filter(arg => !arg.startsWith('--'));
  const check = process.argv.includes('--check');
  // Old form "merge-senses.js <input>" still means toeic.
  const pkgId = args[0] && fs.existsSync(path.join(root, `packages/${args[0]}.json`)) ? args.shift() : 'toeic';
  const input = path.resolve(root, args[0] || (pkgId === 'toeic' ? 'docs/senses/final.json' : `docs/senses/${pkgId}-final.json`));
  const pkgFile = path.join(root, `packages/${pkgId}.json`);
  const sourcesFile = path.join(root, `docs/${pkgId}-sources.json`);
  const pkgText = fs.readFileSync(pkgFile, 'utf8');
  const pkg = JSON.parse(pkgText);
  const eol = text => text.includes('\r\n') ? out => out.replace(/\n/g, '\r\n') : out => out;
  if (eol(pkgText)(formatPackage(pkg, pkgText)) !== pkgText) {
    console.error(`packages/${pkgId}.json has a layout this script cannot reproduce; nothing written.`);
    process.exit(1);
  }
  const {words, errors, koAdded} = merge(pkg.words, JSON.parse(fs.readFileSync(input, 'utf8')));
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
    hashProjection: 'SHA-256 of JSON.stringify of [headword, senses] for words with a 6th field, sorted by normalized headword. Senses missing from ko were appended to ko as "; sense".'
  };
  console.log(JSON.stringify(summary, null, 2));
  console.log(`ko extended (${koAdded.length}):` + koAdded.map(line => '\n  ' + line).join(''));
  if (check) process.exit(0);
  // Keep each file's line endings (core.autocrlf checkouts use CRLF; git stores LF either way).
  fs.writeFileSync(pkgFile, eol(pkgText)(formatPackage({...pkg, words}, pkgText)));
  const sourcesText = fs.readFileSync(sourcesFile, 'utf8');
  if (pkgId === 'toeic') {
    const sources = JSON.parse(sourcesText);
    sources.postSortValidation.senses = summary;
    fs.writeFileSync(sourcesFile, eol(sourcesText)(JSON.stringify(sources, null, 2) + '\n'));
  } else fs.writeFileSync(sourcesFile, eol(sourcesText)(withSensesKey(sourcesText, summary)));
  console.log(`wrote packages/${pkgId}.json and docs/${pkgId}-sources.json`);
}

module.exports = {merge, formatPackage, sensesSha256, withSensesKey};
