'use strict';

/*
 * Turns probate-site/copy/*.md into text safe to paste into WordPress:
 * removes HTML comments (internal notes and TODOs) and writes the result
 * to probate-site/publish/. Then lists anything visible that is still
 * unfinished and exits with code 1 if there is any.
 *
 * Usage: node probate-site/tools/prepare-publish.js [outDir]
 *
 * The files in copy/ stay the source of truth. Never edit publish/ by hand.
 */

const fs = require('node:fs');
const path = require('node:path');

const copyDir = path.join(__dirname, '..', 'copy');
const outDir = process.argv[2] || path.join(__dirname, '..', 'publish');

// Visible text that means a page is not finished.
const UNFINISHED = [/\[TODO[^\]]*\]/i, /£\[TODO\]/i, /^\s*REVIEW\b/, /\bTODO\b/];

fs.mkdirSync(outDir, { recursive: true });
let problems = 0;

for (const file of fs.readdirSync(copyDir).filter((f) => f.endsWith('.md')).sort()) {
  const source = fs.readFileSync(path.join(copyDir, file), 'utf8');
  const clean = source.replace(/<!--[\s\S]*?-->/g, '').replace(/\n{3,}/g, '\n\n').trim() + '\n';
  fs.writeFileSync(path.join(outDir, file), clean);

  clean.split('\n').forEach((line, i) => {
    if (UNFINISHED.some((re) => re.test(line))) {
      problems += 1;
      console.log(`${file}:${i + 1}: ${line.trim().slice(0, 110)}`);
    }
  });
}

console.log(
  problems
    ? `\n${problems} unfinished line(s) would be visible. Do not publish those pages yet.`
    : '\nNo visible placeholders. Facts still need checking against TODO.md.'
);
process.exit(problems ? 1 : 0);
