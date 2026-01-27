import { join } from "path";

const PROJECT_ROOT = join(import.meta.dir, "..");
const DIST_DIR = join(PROJECT_ROOT, "dist");

// Read index.html
const indexPath = join(PROJECT_ROOT, "index.html");
const indexFile = Bun.file(indexPath);
let html = await indexFile.text();

// Update paths for production (they're already correct but ensure consistency)
html = html
  .replace('href="/index.css"', 'href="./index.css"')
  .replace('src="/index.js"', 'src="./index.js"');

// Write to dist
await Bun.write(join(DIST_DIR, "index.html"), html);

console.log("Built index.html");
