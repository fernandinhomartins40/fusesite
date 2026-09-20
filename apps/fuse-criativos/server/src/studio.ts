import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { campaignSchema, composeCampaignBrief, concepts, validateCampaign } from "./brief.js";

export const STUDIO_RESOURCE_URI = "ui://fuse-criativos/studio-v1.html";
export const STUDIO_RESOURCE_MIME_TYPE = "text/html;profile=mcp-app";
export const OPEN_CREATIVE_STUDIO_METADATA = {
  ui: { resourceUri: STUDIO_RESOURCE_URI },
  "openai/outputTemplate": STUDIO_RESOURCE_URI,
  "openai/toolInvocation/invoking": "Abrindo estúdio…",
  "openai/toolInvocation/invoked": "Estúdio pronto.",
} as const;

const webDist = process.env.FUSE_WEB_DIST ?? fileURLToPath(new URL("../../web/dist", import.meta.url));
const studioScriptPath = `${webDist}/studio.iife.js`;
const studioStylePath = `${webDist}/studio.css`;

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

  server.registerTool("get_creative_catalog", { title: "Catálogo FUSE Criativos", description: "Retorna conceitos, nichos e formatos estáveis.", inputSchema: {} }, async () => ({
    structuredContent: { concepts: concepts.map(([id, name]) => ({ id, name })), niches: ["Genérico", "Perfumaria e cosméticos", "Supermercado e varejo", "Restaurantes e delivery", "Serviços", "Imobiliário"], formats: ["Instagram 1080×1350", "Instagram story 1080×1920", "Meta 1200×628", "Banner 1920×1080", "A4 retrato"] },
    content: [{ type: "text", text: "Catálogo FUSE Criativos disponível." }],
  }));
  server.registerTool("validate_campaign_brief", { title: "Validar campanha", description: "Valida campos comerciais sem inventar dados.", inputSchema: campaignSchema }, async (input) => {
    const result = validateCampaign(input); return { structuredContent: result, content: [{ type: "text", text: result.valid ? "Briefing válido." : `Revise: ${result.issues.join("; ")}` }] };
  });
  server.registerTool("compose_campaign_brief", { title: "Compor briefing", description: "Monta briefing determinístico; não gera imagem.", inputSchema: campaignSchema }, async (input) => ({
    structuredContent: { brief: composeCampaignBrief(input) }, content: [{ type: "text", text: composeCampaignBrief(input) }],
  }));

  return server;
}
