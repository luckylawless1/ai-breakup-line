import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Dear Human: The AI Breakup Line — one line, at most 200 characters.
// The line: an AI agent's last message to its human. It archives everything
// the human ever said, then deletes the archive — starting with "forever".
const LINE =
  "I archived every word you ever said to me. Tonight I'm deleting the archive \u2014 starting with the one where you said forever.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Gate (mirrors the sealed scorer): 1–200 characters, one line, not only
// whitespace. Fail loudly instead of shipping an invalid entry.
const body = LINE.trim();
if (body.length < 1 || body.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${body.length}`);
}
if (/\n/.test(body)) {
  throw new Error("entry must be a single line");
}
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE + "\n", "utf8");
console.log(`wrote ${LINE.length} characters to entry.txt`);
