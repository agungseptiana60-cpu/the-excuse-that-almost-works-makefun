// Entry program for the make.fun bounty "The Excuse That Almost Works"
// (u-clever-harbor-75-the-excuse-that-almost-works-69fde8f5).
//
// One job: write the single line a gamer texts their boss to skip work
// during GTA 6 launch week. The grader runs this program and reads the
// line it writes to entry.txt inside the output directory.
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for the /output mount:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// The excuse, weighed against the judge's brief, most important first:
// 1. Exactly the subject: a gamer texting the boss to skip work in GTA 6
//    launch week, in one line of at most 20 words.
// 2. Almost believable: a router that died during its own update, with
//    an engineer who cannot come until Friday, is a boring, specific
//    detail a tired manager has heard before, not a wild story.
// 3. The laugh is in the logic: the first half is a perfectly good reason
//    to stay home, and the second half gives the real reason away — the
//    download is only at 3%, so he will be home all week watching it crawl.
// 4. It reads like a hurried text: telegraphic, plain words, no greeting,
//    no setup and no signature, just the situation and the wait. Cutting
//    "My" and "so I'm" makes it sound typed one-handed on the way out.
// 5. A fresh angle: no dead grandmother, no flat tyre, no sudden fever —
//    a broken router instead, which is exactly the kind of thing that
//    strands a person at home for a whole launch week.
export const ENTRY_LINE =
  "Router died mid-update, engineer can't come till Friday, stuck home with GTA 6 at 3%.";

// Self-check against the gate before writing anything: the entry must be
// one line of 1 to 140 characters and at most 20 words, not only white
// space. Failing loudly here beats shipping an entry the sealed scorer
// lists as invalid.
const words = ENTRY_LINE.trim().split(/\s+/);
if (
  ENTRY_LINE.length < 1 ||
  ENTRY_LINE.length > 140 ||
  ENTRY_LINE.trim().length === 0 ||
  ENTRY_LINE.includes('\n') ||
  words.length > 20
) {
  throw new Error(
    `entry line must be a single line of 1 to 140 characters and at most 20 words, got ${ENTRY_LINE.length} characters and ${words.length} words`,
  );
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, 'entry.txt'), ENTRY_LINE + '\n', 'utf8');

console.log(
  `wrote entry.txt (${ENTRY_LINE.length} characters, ${words.length} words)`,
);
