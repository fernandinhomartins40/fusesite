# FUSE MCP Platform

Monorepo da plataforma de plugins MCP da FUSE. A primeira entrega é a prova de renderização do FUSE Criativos: uma ferramenta MCP que anuncia e entrega uma UI real, em vez de apenas confirmar texto.

## Rodar localmente

```powershell
pnpm install
pnpm build
pnpm test
pnpm dev
```

O endpoint MCP local será `http://localhost:3000/criativos/mcp` e o health check será `http://localhost:3000/health`.

O teste visual no ChatGPT só deve ser feito depois de expor o endpoint por HTTPS; nenhum deploy ou alteração de VPS faz parte desta etapa.

