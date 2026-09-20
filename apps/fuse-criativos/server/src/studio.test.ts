import { describe, expect, it } from "vitest";
import {
  OPEN_CREATIVE_STUDIO_METADATA,
  STUDIO_RESOURCE_MIME_TYPE,
  STUDIO_RESOURCE_URI,
  readStudioHtml,
} from "./studio.js";

describe("open_creative_studio UI contract", () => {
  it("uses a stable MCP Apps resource URI and resource MIME type", () => {
    expect(STUDIO_RESOURCE_URI).toBe("ui://fuse-criativos/studio-v1.html");
    expect(STUDIO_RESOURCE_MIME_TYPE).toBe("text/html;profile=mcp-app");
  });

  it("announces the real UI resource with the MCP Apps field and compatibility alias", () => {
    expect(OPEN_CREATIVE_STUDIO_METADATA.ui.resourceUri).toBe(STUDIO_RESOURCE_URI);
    expect(OPEN_CREATIVE_STUDIO_METADATA["openai/outputTemplate"]).toBe(
      STUDIO_RESOURCE_URI,
    );
  });

  it("serves a built, interactive HTML studio rather than a text-only response", () => {
    const html = readStudioHtml();
    expect(html).toContain('id="root"');
    expect(html).toContain("FUSE Criativos");
    expect(html).toContain("Abrir demonstração");
  });
});
