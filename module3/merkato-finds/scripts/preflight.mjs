// The pre-flight checklist, automated where it can be.  Run: npm run preflight
// (then still run npm run build).
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const SRC = path.join(root, "src");
const problems = [];
const files = [];

(function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full);
    else if (/\.(js|jsx|mjs)$/.test(name)) files.push(full);
  }
})(SRC);

// Does `target` exist with EXACTLY this capitalisation? (macOS forgives, Linux does not.)
function existsExact(target) {
  const parts = path.relative(root, target).split(path.sep);
  let cur = root;
  for (const part of parts) {
    if (!fs.existsSync(cur) || !fs.readdirSync(cur).includes(part)) return false;
    cur = path.join(cur, part);
  }
  return true;
}
const EXT = ["", ".js", ".jsx", ".mjs", ".json", ".css", "/index.js", "/index.jsx"];

// 1. Case-sensitive imports
for (const file of files) {
  const text = fs.readFileSync(file, "utf8");
  for (const m of text.matchAll(/(?:from\s+|import\s*\(\s*|import\s+)["']([^"']+)["']/g)) {
    const spec = m[1];
    let base;
    if (spec.startsWith("@/")) base = path.join(SRC, spec.slice(2));
    else if (spec.startsWith(".")) base = path.resolve(path.dirname(file), spec);
    else continue;
    if (!EXT.some((e) => fs.existsSync(base + e) && existsExact(base + e))) {
      problems.push(`import case/missing: "${spec}" in ${path.relative(root, file)}`);
    }
  }
}

// 2. Every env var read in code is listed in .env.example (platform ones are exempt)
const example = fs.existsSync(".env.example") ? fs.readFileSync(".env.example", "utf8") : "";
if (!example) problems.push(".env.example is missing");
const used = new Set();
for (const file of files) {
  for (const m of fs.readFileSync(file, "utf8").matchAll(/process\.env\.([A-Z0-9_]+)/g)) used.add(m[1]);
}
for (const name of used) {
  if (name === "NODE_ENV" || name.startsWith("VERCEL")) continue;
  if (!new RegExp(`^#?\\s*${name}=`, "m").test(example)) problems.push(`env var ${name} is used but not in .env.example`);
}

// 3. No secret behind NEXT_PUBLIC_
for (const name of used) {
  if (name.startsWith("NEXT_PUBLIC_") && /SECRET|KEY|TOKEN|PASSWORD/.test(name)) {
    problems.push(`${name}: NEXT_PUBLIC_ values are shipped to every browser`);
  }
}

// 4. .gitignore keeps secrets out but does NOT swallow .env.example
const ignore = fs.readFileSync(".gitignore", "utf8").split(/\r?\n/).map((l) => l.trim());
if (!ignore.some((l) => /^\.env/.test(l))) problems.push(".gitignore does not ignore .env files");
if (ignore.includes(".env*") && !ignore.includes("!.env.example")) {
  problems.push(".gitignore has `.env*`, which also hides .env.example from git");
}

// 5. Remote image hosts that next/image can receive must be allowed in next.config.js:
//    literal <Image src="https://host/..."> and every `image: "https://host/..."` in src/data.
const config = fs.readFileSync("next.config.js", "utf8");
const hosts = new Set();
for (const file of files) {
  const text = fs.readFileSync(file, "utf8");
  for (const m of text.matchAll(/<Image[^>]*\ssrc="https:\/\/([^/"]+)/g)) hosts.add(m[1]);
  if (file.includes(`${path.sep}data${path.sep}`)) {
    for (const m of text.matchAll(/image:\s*"https:\/\/([^/"]+)/g)) hosts.add(m[1]);
  }
}
for (const host of hosts) {
  if (!config.includes(host)) problems.push(`image host ${host} is used with next/image but not in next.config.js images.remotePatterns`);
}

console.log(`Checked ${files.length} files, ${used.size} env vars.`);
if (problems.length) { console.error("\nPROBLEMS:\n- " + problems.join("\n- ")); process.exit(1); }
console.log("Pre-flight OK: imports, env vars, .gitignore and image hosts all fine.");
