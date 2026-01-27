import { watch } from "fs";
import { join } from "path";

const PROJECT_ROOT = import.meta.dir.replace("/src", "");
const DIST_DIR = join(PROJECT_ROOT, ".dist");
const SRC_DIR = join(PROJECT_ROOT, "src");
const PUBLIC_DIR = join(PROJECT_ROOT, "public");

// WebSocket clients for live reload
const wsClients = new Set<WebSocket>();

// Build TypeScript/TSX
async function buildJS() {
  console.log("Building JS...");
  const result = await Bun.build({
    entrypoints: [join(SRC_DIR, "index.tsx")],
    outdir: DIST_DIR,
    minify: false,
    sourcemap: "inline",
  });

  if (!result.success) {
    console.error("Build failed:", result.logs);
    return false;
  }
  return true;
}

// Build CSS with Tailwind
async function buildCSS() {
  console.log("Building CSS...");
  const proc = Bun.spawn(
    ["bunx", "tailwindcss", "-i", "./src/index.css", "-o", "./.dist/index.css"],
    {
      cwd: PROJECT_ROOT,
      stdout: "inherit",
      stderr: "inherit",
    }
  );
  await proc.exited;
  return proc.exitCode === 0;
}

// Notify all connected clients to reload
function notifyReload() {
  for (const client of wsClients) {
    try {
      client.send("reload");
    } catch {
      wsClients.delete(client);
    }
  }
}

// Initial build
await buildJS();
await buildCSS();

// Watch for file changes
let debounceTimer: Timer | null = null;
watch(SRC_DIR, { recursive: true }, async (event, filename) => {
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(async () => {
    console.log(`\nFile changed: ${filename}`);
    const jsSuccess = await buildJS();
    const cssSuccess = await buildCSS();
    if (jsSuccess && cssSuccess) {
      notifyReload();
    }
  }, 100);
});

// WebSocket server for live reload
const wsServer = Bun.serve({
  port: 3001,
  fetch(req, server) {
    if (server.upgrade(req)) return;
    return new Response("WebSocket only", { status: 400 });
  },
  websocket: {
    open(ws) {
      wsClients.add(ws);
    },
    close(ws) {
      wsClients.delete(ws);
    },
    message() {},
  },
});

// HTTP server
const server = Bun.serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);
    let pathname = url.pathname;

    // Live reload script injection
    const liveReloadScript = `
      <script>
        const ws = new WebSocket('ws://localhost:3001');
        ws.onmessage = () => location.reload();
        ws.onclose = () => setTimeout(() => location.reload(), 1000);
      </script>
    `;

    // Serve index.html for root
    if (pathname === "/" || pathname === "/index.html") {
      const indexPath = join(PROJECT_ROOT, "index.html");
      const file = Bun.file(indexPath);
      if (await file.exists()) {
        let html = await file.text();
        // Rewrite paths for dev server
        html = html
          .replace('href="/index.css"', 'href="/index.css"')
          .replace('src="/index.js"', 'src="/index.js"')
          .replace("</body>", `${liveReloadScript}</body>`);
        return new Response(html, {
          headers: { "Content-Type": "text/html" },
        });
      }
    }

    // Serve built files from .dist
    if (pathname === "/index.js" || pathname === "/index.css") {
      const filePath = join(DIST_DIR, pathname);
      const file = Bun.file(filePath);
      if (await file.exists()) {
        return new Response(file);
      }
    }

    // Serve public files
    const publicPath = join(PUBLIC_DIR, pathname);
    const publicFile = Bun.file(publicPath);
    if (await publicFile.exists()) {
      return new Response(publicFile);
    }

    // 404
    return new Response("Not found", { status: 404 });
  },
});

console.log(`
🏀 Luigi's Basketball Trivia Dev Server
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Local:   http://localhost:${server.port}
   Reload:  ws://localhost:${wsServer.port}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
