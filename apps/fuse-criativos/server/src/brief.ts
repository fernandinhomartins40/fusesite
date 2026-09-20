import { z } from "zod";

export const concepts = [
  ["editorial-premium", "Editorial premium"], ["minimalista-produto", "Minimalista de produto"],
  ["oferta-varejista-impacto", "Oferta varejista de impacto"], ["encarte-organizado", "Encarte organizado"],
  ["lifestyle-autentico", "Lifestyle autêntico"], ["estudio-publicitario", "Estúdio publicitário"],
  ["tipografico-ousado", "Tipográfico ousado"], ["colagem-contemporanea", "Colagem contemporânea"],
  ["retro-moderno", "Retrô moderno"], ["organico-artesanal", "Orgânico e artesanal"],
  ["tecnologia-premium", "Tecnologia premium"], ["institucional-humano", "Institucional humano"],
] as const;

export const campaignSchema = z.object({
  campaignType: z.string().min(1), niche: z.string().min(1), objective: z.string().min(1),
  conceptId: z.string().min(1), brandName: z.string().min(1), message: z.string().min(1).max(180),
  cta: z.string().max(80).optional(), audience: z.string().max(180).optional(),
  formats: z.array(z.string()).min(1),
  products: z.array(z.object({ name: z.string().min(1), price: z.string().optional(), condition: z.string().optional() })).min(1),
  imageIds: z.array(z.string()).optional(),
});
export type Campaign = z.infer<typeof campaignSchema>;

export function validateCampaign(input: unknown) {
  const parsed = campaignSchema.safeParse(input);
  if (parsed.success) return { valid: true, issues: [] as string[] };
  return { valid: false, issues: parsed.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`) };
}

export function composeCampaignBrief(campaign: Campaign): string {
  const concept = concepts.find(([id]) => id === campaign.conceptId)?.[1] ?? campaign.conceptId;
  const products = campaign.products.map((p) => `- ${p.name}${p.price ? ` — ${p.price}` : ""}${p.condition ? ` (${p.condition})` : ""}`).join("\n");
  return `Crie UMA peça para ${campaign.formats[0]}.
Objetivo: ${campaign.objective}. Nicho: ${campaign.niche}. Público: ${campaign.audience || "não informado"}.
Conceito: ${concept}. Marca: ${campaign.brandName}.
Mensagem principal: ${campaign.message}. CTA: ${campaign.cta || "não informado"}.
Produtos e condições (preservar exatamente):\n${products}
Direção: hierarquia clara, área segura, contraste e legibilidade no formato final. Preserve logo, embalagens e referências anexadas; não invente preços, textos, dados comerciais ou elementos de marca. Evite estética genérica de IA. Após esta peça, mantenha a mesma direção nos formatos restantes: ${campaign.formats.slice(1).join(", ") || "nenhum"}.`;
}
