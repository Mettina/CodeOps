// [DAY 47 · MINI-PROJECT] Run: node scripts/test-csv.mjs
import assert from "node:assert/strict";
import { toCsv } from "../lib/csv.js";

const out = toCsv([
  { name: 'Bole, Kitfo', note: 'plain' },
  { name: 'The "Best" Tibs', note: "line1\nline2" },
]);
assert.equal(
  out,
  'name,note\r\n"Bole, Kitfo",plain\r\n"The ""Best"" Tibs","line1\nline2"'
);
console.log("CSV ok:\n" + out);
