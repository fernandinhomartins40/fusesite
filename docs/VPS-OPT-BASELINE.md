# Baseline inicial da VPS

Data da leitura: 2026-09-20. Esta é uma fotografia de inventário, não uma medição de desempenho sob carga.

| Métrica | Resultado | Status |
| --- | --- | --- |
| Sistema | Ubuntu 22.04 LTS com Docker e Nginx | VERIFIED |
| Portas públicas ocupadas | 22, 25, 80, 443, 587, 3001, 3050, 3060, 9001, 9006 | VERIFIED |
| Porta proposta do FUSE | 127.0.0.1:3100, livre durante a auditoria | VERIFIED |
| RAM/CPU em repouso e em pico | Não coletadas | NOT MEASURED |
| Latência, erro e throughput | Não coletados | NOT MEASURED |
| Disco, inodes, logs e backups | Não inventariados integralmente | NOT VERIFIED |

## Limites iniciais da aplicação

O Compose declara limite de 384 MiB e 0,50 CPU, com reserva de 128 MiB. Esses valores são um orçamento inicial reversível para o MCP, não uma alegação de consumo efetivo. Devem ser validados após o primeiro deploy por meio de `docker stats`, logs, health checks e tráfego representativo.
