# Inventário inicial de otimização da VPS

Status do documento: PENDING - inventário parcial, criado a partir da auditoria de leitura em 2026-09-20. Nenhuma otimização em produção foi executada.

| ID | Item | Estado observado | Status |
| --- | --- | --- | --- |
| VPS-APP-001 | FUSE MCP | Monorepo Node/TypeScript local; ainda não publicado. | VERIFIED |
| VPS-APP-002 | Serviços vizinhos | Nginx e múltiplos containers já atendem outros domínios. | VERIFIED |
| VPS-PROXY-001 | Nginx | Ocupa 80/443 e deve continuar como proxy TLS. | VERIFIED |
| VPS-PORT-001 | Porta 3100 | Livre no momento da auditoria; reservada para loopback do FUSE. | VERIFIED |
| VPS-CICD-001 | GHCR/GitHub Actions | Configuração versionada; secrets e execução ainda pendentes. | PENDING |
| VPS-TLS-001 | mcp.fusesite.com.br | Registro A criado; certificado ainda não emitido. | PENDING |
| VPS-DATA-001 | Banco/arquivos FUSE | Não há persistência durável no MVP atual. | NOT APPLICABLE |

## Fluxo de release proposto

`commit main -> testes no GitHub -> build Docker no GitHub -> imagem GHCR por digest -> pull na VPS via GitHub Actions -> health check -> rollback pelo digest anterior`.

Não há build na VPS e o Compose de produção não possui instrução `build`.

