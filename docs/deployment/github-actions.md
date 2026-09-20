# Deploy por GitHub Actions e GHCR

O deploy do FUSE MCP é executado somente por `.github/workflows/container-deploy.yml`. A VPS nunca executa `docker build`: ela apenas faz pull da imagem identificada pelo SHA do commit e reinicia o serviço FUSE.

## Secrets obrigatórios no GitHub

Configure em `Settings > Secrets and variables > Actions`:

| Secret | Uso |
| --- | --- |
| `VPS_HOST` | IP ou host da VPS. |
| `VPS_DEPLOY_USER` | Usuário não-root com acesso ao Docker. |
| `VPS_SSH_KEY` | Chave privada exclusiva do deploy. |
| `VPS_HOST_FINGERPRINT` | Fingerprint SHA256 da chave SSH do host. |
| `GHCR_USERNAME` | Conta que possui o pacote no GHCR. |
| `GHCR_PULL_TOKEN` | PAT classic com somente `read:packages`. |

O workflow usa `GITHUB_TOKEN` com `packages: write` para publicar a imagem. O PAT de pull não deve ter permissões de repositório.

O deploy usa o digest da imagem, não a tag `latest`; isso torna o rollback explícito e impede que uma alteração de tag modifique uma release em execução.

## Preparação única da VPS

Esta etapa não publica aplicação. Ela deve deixar prontos o Docker, o usuário `fusemcp`, o diretório `/opt/fuse-mcp-platform`, o Nginx para `mcp.fusesite.com.br`, TLS e o acesso SSH por chave. Depois disso, toda alteração de imagem é feita pelo workflow.

Antes do primeiro push, defina o pacote GHCR como público ou entregue ao servidor um token com `read:packages`.
