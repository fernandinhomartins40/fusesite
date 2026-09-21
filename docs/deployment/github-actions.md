# Deploy por GitHub Actions e GHCR

O deploy do FUSE MCP é executado somente por `.github/workflows/container-deploy.yml`. A VPS nunca executa `docker build`: ela apenas faz pull da imagem identificada pelo SHA do commit e reinicia o serviço FUSE.

## Único secret necessário no GitHub

Configure em `Settings > Secrets and variables > Actions`:

| Secret | Uso |
| --- | --- |
| `VPS_PASSWORD` | Senha SSH do usuário `root` na VPS. |

O endereço da VPS, o usuário `root` e o fingerprint SSH ficam versionados no workflow. O runner instala `sshpass`, valida a chave pública da VPS contra esse fingerprint e usa `VPS_PASSWORD` para `ssh` e `scp`. Para publicar e fazer pull da imagem no GHCR, o workflow usa o `GITHUB_TOKEN` temporário fornecido automaticamente pelo GitHub; não há token GHCR adicional.

O deploy usa o digest da imagem, não a tag `latest`; isso torna o rollback explícito e impede que uma alteração de tag modifique uma release em execução.

## Preparação única da VPS

Esta etapa não publica aplicação. Ela deve deixar prontos o Docker, o diretório `/opt/fuse-mcp-platform`, o Nginx para `mcp.fusesite.com.br`, TLS e o acesso SSH por senha. Depois disso, toda alteração de imagem é feita pelo workflow.

O pacote GHCR precisa permanecer associado a este repositório para que o `GITHUB_TOKEN` temporário do workflow tenha acesso de leitura durante o deploy.
