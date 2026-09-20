import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export const STUDIO_RESOURCE_URI = "ui://fuse-criativos/studio-v1.html";
export const STUDIO_RESOURCE_MIME_TYPE = "text/html;profile=mcp-app";
export const OPEN_CREATIVE_STUDIO_METADATA = {
  ui: { resourceUri: STUDIO_RESOURCE_URI },
  "openai/outputTemplate": STUDIO_RESOURCE_URI,
  "openai/toolInvocation/invoking": "Abrindo estúdio…",
  "openai/toolInvocation/invoked": "Estúdio pronto.",
} as const;

const studioScriptPath = fileURLToPath(new URL("../../web/dist/studio.iife.js", import.meta.url));
const studioStylePath = fileURLToPath(new URL("../../web/dist/studio.css", import.meta.url));

export function readStudioHtml(): string {
  const script = readFileSync(studioScriptPath, "utf8");
  const styles = readFileSync(studioStylePath, "utf8");
  return `<!doctype html>
<html lang="pt-BR">
  <head><meta charset="UTF-8" /><style>${styles}</style></head>
  <body><div id="root"></div><script type="module">${script}</script></body>
</html>`;
}

export function createCreativeStudioServer(): McpServer {
  const server = new McpServer(
    { name: "FUSE Criativos", version: "0.1.0" },
    { capabilities: { tools: {}, resources: {} } },
  );

  server.registerResource("fuse-creative-studio", STUDIO_RESOURCE_URI, {}, async () => ({
    contents: [
      {
        uri: STUDIO_RESOURCE_URI,
        mimeType: STUDIO_RESOURCE_MIME_TYPE,
        text: readStudioHtml(),
        _meta: { ui: { prefersBorder: true } },
      },
    ],
  }));

  server.registerTool(
    "open_creative_studio",
    {
      title: "Abrir estúdio FUSE Criativos",
      description:
        "Abre o estúdio visual FUSE Criativos para preparar uma campanha. Também retorna uma confirmação estruturada útil quando o host não renderiza UI.",
      inputSchema: {
        objective: z.string().max(120).optional(),
        niche: z.string().max(120).optional(),
        campaignType: z.string().max(120).optional(),
      },
      _meta: OPEN_CREATIVE_STUDIO_METADATA,
    },
    async ({ objective, niche, campaignType }) => ({
      structuredContent: {
        status: "ready",
        objective: objective ?? null,
        niche: niche ?? null,
        campaignType: campaignType ?? null,
      },
      content: [
        {
          type: "text",
          text: "O estúdio FUSE Criativos está pronto para receber os dados da campanha.",
        },
      ],
    }),
  );

  return server;
}
