# Landing FUSE recuperada

Este diretório é um arquivo fiel do código de interface recuperado em 20 de setembro de 2026 da aplicação legada em `72.60.10.112`, cujo container `fusesite` atendia a landing pela porta 3230.

Ele preserva a implementação Vite/React, seus componentes, página e assets para referência e migração. Não é consumido pelo monorepo atual, nem é publicado automaticamente.

Por segurança e para não restaurar um fluxo de implantação obsoleto, a cópia exclui intencionalmente:

- credenciais, arquivos `.env`, Git e dependências instaladas;
- workflows e configurações de deploy;
- Docker, Compose, Nginx e documentação operacional legados.

O próximo passo recomendado é adaptar o conteúdo e o visual desta fonte para um app de landing atual do projeto, mantendo o pipeline GHCR/GitHub Actions já definido neste repositório.
