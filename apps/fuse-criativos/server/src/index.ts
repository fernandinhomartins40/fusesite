import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { createCreativeStudioServer } from "./studio.js";

const port = Number(process.env.PORT ?? 3000);
const landingDist = process.env.FUSE_LANDING_DIST ?? fileURLToPath(new URL("../../landing", import.meta.url));
const contentTypes: Record<string, string> = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
};

async function serveLanding(pathname: string, response: import("node:http").ServerResponse) {
  const requestedPath = pathname === "/" ? "index.html" : decodeURIComponent(pathname).replace(/^\/+/, "");
  const filePath = resolve(landingDist, requestedPath);

  if (relative(landingDist, filePath).startsWith("..")) return false;

  try {
    if (!(await stat(filePath)).isFile()) return false;
    response.writeHead(200, {
      "cache-control": requestedPath === "index.html" ? "no-cache" : "public, max-age=31536000, immutable",
      "content-type": contentTypes[extname(filePath)] ?? "application/octet-stream",
    });
    response.end(await readFile(filePath));
    return true;
  } catch {
    return false;
  }
}

const httpServer = createServer(async (request, response) => {
  const url = new URL(request.url ?? "/", `http://${request.headers.host ?? "localhost"}`);
  const isLandingHost = ["fusesite.com.br", "www.fusesite.com.br"].includes(url.hostname);

  if (request.method === "GET" && isLandingHost && (await serveLanding(url.pathname, response))) {
    return;
  }

  if (request.method === "GET" && url.pathname === "/health") {
    response.writeHead(200, { "content-type": "application/json" });
    response.end(JSON.stringify({ status: "ok", service: "fuse-mcp-platform" }));
    return;
  }

  if (url.pathname !== "/criativos/mcp") {
    response.writeHead(404, { "content-type": "application/json" });
    response.end(JSON.stringify({ error: "not_found" }));
    return;
  }

  const chunks: Buffer[] = [];
  for await (const chunk of request) chunks.push(Buffer.from(chunk));
  const body = chunks.length === 0 ? undefined : JSON.parse(Buffer.concat(chunks).toString("utf8"));
  const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });
  const mcpServer = createCreativeStudioServer();
  await mcpServer.connect(transport);
  await transport.handleRequest(request, response, body);
});

httpServer.listen(port, () => {
  console.info(JSON.stringify({ event: "server_started", port }));
});
