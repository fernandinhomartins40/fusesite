import { describe, expect, it } from "vitest";
import { composeCampaignBrief, validateCampaign } from "./brief.js";
const campaign = { campaignType: "lançamento", niche: "Perfumaria e cosméticos", objective: "vender", conceptId: "editorial-premium", brandName: "FUSE", message: "Nova fragrância", formats: ["Instagram 1080×1350"], products: [{ name: "Perfume Aurora", price: "R$ 199" }] };
describe("brief determinístico", () => { it("preserva produto e preço", () => expect(composeCampaignBrief(campaign)).toContain("Perfume Aurora — R$ 199")); it("recusa campos comerciais ausentes", () => expect(validateCampaign({ ...campaign, products: [] }).valid).toBe(false)); });
