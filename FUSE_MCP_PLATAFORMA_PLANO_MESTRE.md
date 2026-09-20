# FUSE MCP — Contexto, arquitetura e prompt mestre de implementação

> Documento-base para iniciar um repositório GitHub e continuar o desenvolvimento no VS Code com o Codex.
>
> Domínio principal: `fusesite.com.br`  
> Base planejada dos MCPs: `mcp.fusesite.com.br`  
> Primeiro produto: **FUSE Criativos**

---

## 1. Objetivo deste documento

Este arquivo reúne o contexto funcional, visual, técnico e comercial discutido para o ecossistema de plugins da FUSE. Ele deve ser colocado na raiz do repositório e entregue integralmente ao Codex como fonte de verdade.

O projeto inicial é o **FUSE Criativos**, um plugin visual para ChatGPT Work que ajuda pessoas sem formação em design a montar campanhas e peças profissionais. O usuário escolhe conceitos visuais por miniaturas, envia logo e fotografias de produtos, informa oferta, preços, público, canal e formatos, e recebe um briefing/prompt de direção de arte pronto para o ChatGPT gerar as imagens usando a capacidade nativa de imagens do próprio Work.

O projeto precisa nascer como uma plataforma reutilizável para outros produtos FUSE, e não como uma implementação descartável de um único MCP.

Produtos já previstos:

- **FUSE Criativos** — direção de arte e preparação visual de campanhas.
- **FUSE Prospecta** — prospecção e organização de oportunidades comerciais.
- **Fuse DEV** — criação assistida de landing pages, sistemas e produtos digitais.
- **FUSE Branding** — identidade visual, logos, manuais e pacotes de marca.
- Outros MCPs e plugins FUSE ainda não definidos.

---

## 2. Decisões que já estão tomadas

Estas decisões não devem ser reinterpretadas sem autorização:

1. Os clientes utilizarão o **ChatGPT Work**.
2. A geração final das imagens deve acontecer **dentro do ChatGPT Work**, usando os recursos nativos disponíveis na conta e no workspace do cliente.
3. O servidor da FUSE não chamará a API de geração de imagens da OpenAI.
4. Não deve ser exigida `OPENAI_API_KEY` para o fluxo principal do FUSE Criativos.
5. O MCP fornece interface, catálogo de conceitos, formulários, validação, organização dos arquivos e composição do briefing/prompt.
6. O MCP não deve afirmar que renderizou uma imagem quando apenas preparou ou enviou uma solicitação ao ChatGPT.
7. A interface precisa realmente renderizar dentro do ChatGPT. Uma ferramenta MCP que retorna somente texto não atende ao produto.
8. O frontend embarcado será servido pelo MCP como recurso de UI e ligado à ferramenta de abertura do estúdio.
9. O servidor ficará em VPS Ubuntu 22.04 LTS e será publicado com HTTPS.
10. O domínio base será `fusesite.com.br`.
11. O subdomínio central para a plataforma será `mcp.fusesite.com.br`.
12. A arquitetura deve comportar vários MCPs e plugins sem duplicar infraestrutura comum.
13. O projeto será versionado em GitHub e desenvolvido no VS Code com Codex.
14. A primeira entrega deve ser utilizável em modo de desenvolvedor antes de qualquer submissão pública.

---

## 3. Correção conceitual importante

### 3.1 O que deu errado na tentativa anterior

A tentativa anterior instalou um pacote local e expôs uma ferramenta chamada “Open creative studio”, mas a chamada retornava apenas uma confirmação textual. O ChatGPT dizia que o estúdio estava aberto, porém nenhum componente visual aparecia.

Isso aconteceu porque existir uma ferramenta MCP ou uma habilidade não basta para criar uma interface clicável. A ferramenta que abre o estúdio precisa anunciar um **recurso de UI** e o servidor precisa entregar o HTML do componente no formato esperado pelo host.

O novo projeto deve ter testes automatizados que impeçam regressão para esse comportamento.

### 3.2 Arquitetura correta

O fluxo correto é:

1. O usuário pede para abrir o FUSE Criativos.
2. O ChatGPT chama a ferramenta MCP `open_creative_studio`.
3. A definição da ferramenta aponta para um recurso de UI por `_meta.ui.resourceUri` e mantém o alias de compatibilidade quando necessário.
4. O MCP devolve um resultado estruturado mínimo e o ChatGPT renderiza o recurso HTML associado.
5. A UI inicializa a ponte MCP Apps.
6. O usuário preenche o fluxo visual, seleciona conceitos e envia arquivos.
7. A UI atualiza o contexto visível ao modelo e inclui os IDs dos arquivos enviados.
8. No botão final, a UI envia uma mensagem de continuação ao ChatGPT com o briefing completo.
9. O ChatGPT, quando a capacidade nativa de imagens estiver disponível, executa a geração na conversa.

### 3.3 Limitação que deve ser respeitada

O plugin não deve depender de códigos internos, comandos privados ou “slash commands” não documentados para forçar um modelo específico de imagens. A interface deve solicitar a geração por uma mensagem clara, anexar as referências pelos mecanismos suportados e deixar o ChatGPT selecionar a capacidade nativa disponível.

Portanto:

- o MCP pode preparar o pedido de geração;
- a UI pode enviar uma mensagem de continuação;
- a UI pode tornar imagens enviadas visíveis ao modelo;
- o MCP não controla internamente qual versão não pública do gerador será usada;
- a disponibilidade de geração depende da conta, plano, workspace e recursos liberados ao usuário.

---

## 4. Visão de produto — FUSE Criativos

### 4.1 Problema

Ferramentas modernas geram imagens tecnicamente boas, mas usuários comuns frequentemente produzem criativos com aparência genérica de IA porque:

- não dominam direção de arte;
- não conhecem hierarquia visual, grid, tipografia e contraste;
- descrevem apenas o produto, sem conceito de campanha;
- não sabem fornecer referências corretamente;
- misturam objetivos, mensagens e formatos incompatíveis;
- pedem texto demais para uma única peça;
- não definem público, canal, posicionamento ou estágio do funil;
- não controlam fidelidade da marca e do produto;
- não fazem revisão de legibilidade, preço, oferta e chamadas.

### 4.2 Proposta de valor

O FUSE Criativos transforma um formulário simples em uma direção de arte profissional. A experiência deve parecer um pequeno estúdio criativo orientado, e não um formulário burocrático nem uma caixa de prompt.

Promessa de produto:

> Escolha um conceito visual, informe sua campanha e envie seus materiais. O FUSE organiza a direção de arte e conduz o ChatGPT na criação de peças profissionais, coerentes com a marca e prontas para cada formato.

### 4.3 Público

- pequenos e médios empresários;
- agências e freelancers;
- equipes de marketing;
- supermercados, farmácias, lojas e varejo local;
- perfumarias e cosméticos;
- restaurantes e delivery;
- imobiliárias;
- clínicas e profissionais de saúde, respeitando regras de publicidade;
- educação, cursos e eventos;
- prestadores de serviços;
- e-commerce;
- negócios genéricos que não se enquadrem em um pacote específico.

---

## 5. Princípios de design incorporados ao produto

O catálogo e o motor de briefing devem traduzir conceitos usados por designers experientes:

### 5.1 Fundamentos obrigatórios

- **Hierarquia visual:** primeiro o elemento principal, depois promessa/oferta e finalmente detalhes.
- **Contraste:** diferença suficiente de escala, cor, peso e espaço para leitura imediata.
- **Grid e alinhamento:** organização consistente, margens seguras e ritmo visual.
- **Espaço negativo:** evitar preencher cada área da peça.
- **Proximidade:** informações relacionadas formam blocos reconhecíveis.
- **Repetição:** cores, formas, cantos e padrões mantêm unidade.
- **Equilíbrio:** composições simétricas ou assimétricas com peso visual controlado.
- **Tipografia:** no máximo poucas famílias e pesos; legibilidade acima de efeitos.
- **Cor:** paleta derivada da marca ou justificada pelo conceito.
- **Ponto focal:** toda peça deve ter uma prioridade inequívoca.
- **Consistência de campanha:** formatos diferentes parecem parte da mesma família.
- **Fidelidade:** logos, embalagens e características reais não podem ser redesenhados arbitrariamente.

### 5.2 Regras contra a “cara de IA”

- não usar brilho, neon, partículas, vidro ou gradientes apenas por hábito;
- não acrescentar elementos futuristas quando não servem ao posicionamento;
- evitar excesso de objetos flutuantes e profundidade artificial;
- não deformar embalagens nem substituir a identidade do produto;
- não inserir texto inventado em rótulos;
- evitar pele plastificada e expressões genéricas em pessoas;
- adotar referências editoriais e comerciais coerentes com o nicho;
- usar iluminação, lente, materiais, cenário e composição intencionalmente;
- produzir uma ideia central reconhecível, não apenas uma imagem “bonita”.

### 5.3 Controle de qualidade

Cada briefing final deve incluir uma lista de verificação:

- objetivo identificável em até três segundos;
- produto ou serviço inequivocamente reconhecível;
- logo aplicada sem alteração;
- preço e moeda corretos;
- chamada principal curta e legível;
- informação legal ou condição de oferta preservada;
- contraste adequado no tamanho final;
- área segura respeitada;
- nenhum dado comercial inventado;
- nenhum elemento de marca adulterado;
- consistência entre os formatos solicitados;
- referências anexadas usadas com prioridade correta.

---

## 6. Catálogo inicial de conceitos visuais

Cada conceito deve possuir: `id`, nome, descrição curta, objetivo, nichos indicados, palavras-chave, paleta sugerida, princípios de composição, iluminação, fotografia/ilustração, tipografia, lista do que evitar, miniatura local e template de direção de arte.

### Conceitos gerais

1. **Editorial premium** — fotografia refinada, espaço negativo, tipografia elegante e hierarquia contida.
2. **Minimalista de produto** — produto protagonista, fundo controlado, poucos elementos e foco em acabamento.
3. **Oferta varejista de impacto** — preço e promoção em alta prioridade, contraste forte e leitura rápida.
4. **Encarte organizado** — vários produtos em grid, categorias claras, preços consistentes e alta densidade controlada.
5. **Lifestyle autêntico** — produto em uso real, ambiente natural, emoção e contexto humano.
6. **Estúdio publicitário** — fotografia comercial, luz recortada, materiais realistas e acabamento de campanha.
7. **Tipográfico ousado** — mensagem como elemento principal, composição gráfica e ritmo visual forte.
8. **Colagem contemporânea** — recortes, camadas e texturas, mantendo intenção editorial.
9. **Retrô moderno** — referências históricas reinterpretadas sem parecer fantasia genérica.
10. **Orgânico e artesanal** — texturas naturais, materiais táteis, tons terrosos e proximidade humana.
11. **Tecnologia premium** — precisão, interface ou geometria discreta, evitando neon gratuito.
12. **Institucional humano** — confiança, clareza, pessoas reais e linguagem acessível.
13. **Luxo silencioso** — poucos elementos, materiais nobres, baixa saturação e atenção ao detalhe.
14. **Pop vibrante** — cores intensas, formas gráficas e energia jovem com hierarquia rigorosa.
15. **Campanha sazonal** — linguagem contextual para datas, sem clichês excessivos.
16. **Antes e depois** — comparação clara, ética e verificável, sem promessas enganosas.
17. **Prova social** — destaque para depoimento ou resultado, preservando autenticidade.
18. **Lançamento/novidade** — suspense, revelação e produto heroico.

### Pacotes de nicho prioritários

#### Perfumaria e cosméticos

- lançamento sensorial;
- luxo editorial;
- frescor e notas olfativas;
- presenteável/sazonal;
- rotina de beleza;
- produto em pedestal de estúdio.

#### Supermercados e varejo

- encarte semanal;
- oferta relâmpago;
- feira e hortifrúti;
- açougue/frios;
- combo econômico;
- campanha de mês ou feriado.

#### Restaurantes e delivery

- fotografia gastronômica hero;
- combo/oferta;
- cardápio visual;
- lançamento de prato;
- ocasião e experiência.

#### Serviços

- autoridade profissional;
- problema e solução;
- benefício direto;
- institucional humano;
- chamada para orçamento.

#### Imobiliário

- empreendimento premium;
- oportunidade de compra;
- estilo de vida;
- localização e conveniência;
- captação de imóvel.

O sistema deve permitir adicionar conceitos e nichos por arquivos de configuração versionados, sem editar a lógica central.

---

## 7. Experiência visual do estúdio

### 7.1 Fluxo em etapas

1. **Tipo de campanha** — novidade, promoção, lançamento, institucional, evento, encarte ou personalizada.
2. **Nicho** — seleção por cartões, com opção genérica.
3. **Objetivo** — vender, apresentar, captar lead, gerar tráfego, informar ou fortalecer marca.
4. **Conceito visual** — grade de miniaturas filtráveis, comparação e detalhes.
5. **Marca** — nome, logo, cores, tom e regras obrigatórias.
6. **Produtos/serviços** — um ou vários itens, imagem, nome, descrição, preço anterior, preço atual e condição.
7. **Público e mensagem** — público, promessa, chamada, benefícios, região e datas.
8. **Referências** — upload/seleção de imagens e indicação do papel de cada uma.
9. **Formatos** — escolha múltipla com pré-visualização de proporção.
10. **Revisão** — resumo completo, alertas de dados ausentes e correções.
11. **Gerar no ChatGPT** — preparar contexto e enviar o pedido de geração para a conversa.

### 7.2 Formatos iniciais

- Instagram feed: 1080 × 1080 e 1080 × 1350;
- Instagram story/reel cover: 1080 × 1920;
- Facebook/Meta horizontal: 1200 × 628;
- banner horizontal: 1920 × 1080;
- WhatsApp quadrado: 1080 × 1080;
- A4 retrato e paisagem;
- encarte multipágina configurável;
- formato personalizado com largura, altura e unidade.

### 7.3 Interface

- identidade visual FUSE: fundo navy/preto profundo, azul elétrico e violeta, com versão clara quando melhorar a leitura;
- aparência premium, tecnológica e minimalista;
- símbolo F abstrato usado com moderação;
- tipografia geométrica e legível;
- responsividade para desktop e celular;
- navegação por teclado e atributos de acessibilidade;
- estados claros de carregamento, erro, vazio, sucesso e indisponibilidade da ponte;
- nunca mostrar uma confirmação falsa de que algo abriu ou foi gerado;
- apresentação inline inicialmente, com solicitação de fullscreen quando suportada e necessária;
- fallback explicativo se o host não oferecer determinada capacidade.

### 7.4 Miniaturas

As miniaturas dos conceitos devem ser assets estáticos curados e versionados no repositório. Não gerar miniaturas em tempo real. Durante o desenvolvimento, placeholders claramente identificados podem ser usados, mas a entrega de produção deve permitir substituí-los por imagens finais sem recompilar a lógica do servidor.

---

## 8. Fluxo de arquivos e geração no Work

### 8.1 Uploads

A UI deve detectar capacidades, usar os mecanismos de arquivo fornecidos pelo host quando disponíveis e oferecer fallback compreensível.

Arquivos esperados:

- logo em PNG, SVG, JPG ou WEBP;
- fotos de produtos;
- referências visuais;
- manual de marca em PDF, quando aplicável;
- tabelas simples de produtos para encartes em uma fase posterior.

### 8.2 Estado visível ao modelo

Ao concluir etapas significativas, a UI deve manter:

- `modelContent`: resumo estruturado do briefing que o modelo precisa conhecer;
- `privateContent`: dados apenas da interface, como etapa aberta, filtros e preferências visuais;
- `imageIds`: IDs válidos das imagens selecionadas ou enviadas que devem acompanhar turnos seguintes.

Não colocar segredos, tokens, dados de pagamento ou informações desnecessárias no estado do widget.

### 8.3 Botão final

O botão deve se chamar de forma honesta, por exemplo:

- “Preparar e gerar no ChatGPT”; ou
- “Enviar campanha para geração”.

Ao clicar:

1. validar campos;
2. mostrar um resumo final;
3. persistir o estado necessário;
4. enviar uma mensagem de continuação ao ChatGPT;
5. incluir instruções profissionais e os IDs das referências;
6. pedir uma peça por vez quando houver múltiplos formatos;
7. pedir confirmação somente quando faltar uma decisão realmente necessária;
8. deixar claro na UI que a geração acontecerá na conversa.

### 8.4 Estrutura do briefing enviado

O texto final deve conter:

- objetivo e canal;
- nicho e público;
- conceito selecionado e justificativa;
- mensagem principal e CTA;
- produtos, preços e condições exatamente como fornecidos;
- regras de marca;
- papel de cada referência;
- especificação do formato atual;
- direção de composição, luz, câmera, materiais, cores e tipografia;
- elementos proibidos;
- checagem de legibilidade e fidelidade;
- pedido explícito para não inventar informações;
- instrução para preservar logo e embalagens;
- sequência dos próximos formatos.

---

## 9. Arquitetura da plataforma FUSE MCP

### 9.1 Estratégia de domínio

Usar inicialmente uma única base pública:

```text
https://mcp.fusesite.com.br
```

Rotas previstas:

```text
https://mcp.fusesite.com.br/health
https://mcp.fusesite.com.br/criativos/mcp
https://mcp.fusesite.com.br/criativos/ui/...
https://mcp.fusesite.com.br/prospecta/mcp
https://mcp.fusesite.com.br/prospecta/ui/...
https://mcp.fusesite.com.br/dev/mcp
https://mcp.fusesite.com.br/dev/ui/...
https://mcp.fusesite.com.br/branding/mcp
https://mcp.fusesite.com.br/branding/ui/...
```

Essa abordagem reduz configuração de DNS e certificados e mantém os produtos isolados por caminho. A aplicação deve ser construída para aceitar uma variável `PUBLIC_BASE_URL` e prefixos por produto.

Se algum produto exigir isolamento operacional, será possível migrá-lo depois para:

```text
https://criativos.mcp.fusesite.com.br/mcp
https://prospecta.mcp.fusesite.com.br/mcp
```

Não adotar essa fragmentação no primeiro deploy sem necessidade.

### 9.2 Componentes

- **Reverse proxy:** Nginx ou Caddy, com HTTPS e roteamento.
- **Gateway:** roteia caminhos, aplica limites e cabeçalhos comuns.
- **Servidores MCP:** um módulo por produto, usando Streamable HTTP.
- **Recursos de UI:** bundles HTML/JS/CSS de cada produto.
- **Pacotes compartilhados:** tipos, validação, UI FUSE, telemetria e segurança.
- **Banco:** opcional no MVP; obrigatório quando existirem usuários, planos e persistência durável.
- **Autenticação:** camada preparada desde o início, ativada antes da oferta comercial.
- **Observabilidade:** logs estruturados, request ID, health checks e erros sem dados sensíveis.

### 9.3 Estrutura sugerida do monorepo

```text
fuse-mcp-platform/
├── AGENTS.md
├── README.md
├── FUSE_MCP_PLATAFORMA_PLANO_MESTRE.md
├── package.json
├── pnpm-workspace.yaml
├── apps/
│   ├── gateway/
│   ├── fuse-criativos/
│   │   ├── server/
│   │   ├── web/
│   │   ├── content/
│   │   │   ├── concepts/
│   │   │   ├── niches/
│   │   │   └── formats/
│   │   └── tests/
│   ├── fuse-prospecta/
│   ├── fuse-dev/
│   └── fuse-branding/
├── packages/
│   ├── fuse-ui/
│   ├── mcp-core/
│   ├── schemas/
│   ├── auth/
│   ├── config/
│   └── observability/
├── plugins/
│   ├── fuse-criativos/
│   ├── fuse-prospecta/
│   ├── fuse-dev/
│   └── fuse-branding/
├── infra/
│   ├── docker/
│   ├── nginx/
│   ├── systemd/
│   └── scripts/
├── docs/
│   ├── architecture/
│   ├── deployment/
│   ├── product/
│   └── runbooks/
└── .github/
    └── workflows/
```

### 9.4 Stack recomendada

- Node.js LTS;
- TypeScript estrito;
- React para os componentes visuais;
- Vite para bundle do frontend;
- SDK MCP oficial compatível com Streamable HTTP;
- Zod ou equivalente para schemas compartilhados;
- pnpm workspaces;
- Vitest para testes unitários;
- Playwright para testes de interface e capturas;
- ESLint e Prettier;
- Docker Compose para implantação reproduzível;
- Nginx ou Caddy para TLS e proxy;
- PostgreSQL quando autenticação e planos forem ativados.

Não introduzir Laravel, Next.js, Redis, filas ou Kubernetes no MVP sem necessidade demonstrada.

---

## 10. Ferramentas MCP do FUSE Criativos

O conjunto inicial deve ser pequeno e previsível:

### `open_creative_studio`

- abre o estúdio visual;
- não pede previamente todos os dados pelo chat;
- retorna o recurso de UI;
- aceita opcionalmente objetivo, nicho ou campanha para pré-preenchimento.

### `get_creative_catalog`

- fornece conceitos, nichos e formatos;
- operação somente leitura;
- pode ser chamada pela UI ou modelo;
- retorna IDs estáveis e resultados estruturados.

### `validate_campaign_brief`

- valida dados sem usar IA externa;
- aponta campos ausentes, conflitos de oferta e excesso de texto;
- nunca inventa correções comerciais.

### `compose_campaign_brief`

- recebe os dados já validados;
- produz um briefing estruturado e determinístico;
- não gera imagem;
- não chama API da OpenAI;
- devolve conteúdo que a UI pode encaminhar ao ChatGPT.

Evitar dezenas de ferramentas pequenas. Não criar ferramenta chamada `generate_image` se o servidor não gera imagem.

---

## 11. Segurança, privacidade e comercialização

### 11.1 MVP privado

Na primeira fase, permitir acesso apenas ao proprietário e a usuários de teste. Ainda assim:

- HTTPS obrigatório;
- nenhum segredo no repositório;
- `.env.example` sem valores reais;
- limites de tamanho e tipo de arquivo;
- validação de entrada no servidor;
- logs sem conteúdo integral de briefings ou imagens;
- CORS e CSP compatíveis com o host, sem curingas desnecessários;
- atualização regular de dependências;
- endpoint de saúde sem informações sensíveis.

### 11.2 Cobrança futura

O plugin instalado no ChatGPT não substitui o controle comercial da FUSE. Para cobrar acesso, a plataforma precisará de:

- contas FUSE;
- autenticação compatível com MCP/ChatGPT;
- associação entre identidade e plano;
- planos, assinatura e status de pagamento;
- autorização por ferramenta e limites de uso;
- painel administrativo;
- termos de uso e política de privacidade;
- atendimento, cancelamento e exclusão de dados;
- provedor de pagamento definido em fase própria.

Não implementar pagamento no MVP técnico. Criar interfaces e documentação para que autenticação e billing possam ser acoplados sem reescrever cada MCP.

### 11.3 Multi-tenant

Quando clientes externos forem liberados:

- toda informação persistente deve carregar `tenant_id` e `user_id`;
- nenhuma consulta pode confiar apenas em IDs enviados pelo cliente;
- autorização deve ser verificada no servidor;
- usuários não podem ler campanhas, logos ou produtos de outros clientes;
- exclusão e retenção de arquivos devem ser configuráveis.

---

## 12. Implantação na VPS

Ambiente conhecido:

- Ubuntu 22.04 LTS;
- acesso administrativo por SSH;
- domínio `fusesite.com.br`;
- desenvolvimento com Codex CLI no servidor ou VS Code remoto.

### 12.1 Resultado esperado

```text
Internet
   ↓ HTTPS
mcp.fusesite.com.br
   ↓ reverse proxy
gateway/processos MCP
   ├── /criativos/mcp
   ├── /prospecta/mcp
   ├── /dev/mcp
   └── /branding/mcp
```

### 12.2 Requisitos operacionais

- serviços não devem rodar como `root`;
- criar usuário de implantação com privilégios mínimos;
- firewall permitindo apenas SSH, HTTP e HTTPS;
- autenticação SSH por chave;
- bloquear login SSH por senha e root apenas depois de validar uma segunda sessão com a chave;
- backups antes de alterar Nginx/Caddy existente;
- certificado TLS automático;
- reinício automático dos serviços;
- logs com rotação;
- health check;
- rollback documentado;
- não derrubar outros sites da VPS.

### 12.3 Variáveis previstas

```dotenv
NODE_ENV=production
PUBLIC_BASE_URL=https://mcp.fusesite.com.br
PORT=3000
LOG_LEVEL=info
DATABASE_URL=
SESSION_SECRET=
OAUTH_ISSUER_URL=
OAUTH_CLIENT_ID=
OAUTH_CLIENT_SECRET=
```

Não adicionar `OPENAI_API_KEY` ao fluxo principal do FUSE Criativos.

---

## 13. O que o Codex pode fazer

O Codex pode:

- criar o monorepo;
- escrever frontend, MCP, schemas e testes;
- criar Dockerfiles e Compose;
- configurar proxy em arquivos versionados;
- preparar scripts de deploy e rollback;
- gerar documentação;
- auditar compatibilidade da UI;
- executar testes locais;
- preparar GitHub Actions;
- validar o endpoint com ferramentas de inspeção;
- produzir checklist de publicação;
- organizar catálogos e prompts;
- corrigir problemas encontrados nos logs.

O Codex não deve automaticamente:

- comprar ou transferir domínio;
- alterar DNS sem autorização explícita e credenciais apropriadas;
- aceitar termos legais em seu nome;
- cadastrar dados comerciais falsos;
- publicar publicamente o plugin sem revisão;
- escolher sozinho um provedor de cobrança;
- desabilitar acesso SSH atual antes de comprovar o novo acesso;
- apagar configurações ou aplicações existentes da VPS;
- guardar senhas e tokens no Git.

---

## 14. O que precisa ser feito manualmente pelo proprietário

### 14.1 GitHub

1. Criar um repositório, sugestão: `fuse-mcp-platform`.
2. Definir inicialmente como privado.
3. Adicionar a chave SSH ou autenticar o GitHub no computador/VPS.
4. Copiar este arquivo para a raiz.
5. Abrir o repositório no VS Code.
6. Iniciar o Codex na pasta do projeto e fornecer o prompt da seção 17.
7. Revisar mudanças antes de commit e push.

### 14.2 DNS

No provedor DNS de `fusesite.com.br`, criar:

```text
Tipo: A
Nome/Host: mcp
Valor: IP público da VPS
TTL: automático ou 300
```

Se houver proxy/CDN, começar em modo compatível com conexões HTTP streaming. Caso ocorram erros no MCP, testar temporariamente sem o proxy para isolar o problema.

### 14.3 VPS

1. Confirmar que as portas 80 e 443 estão disponíveis.
2. Informar ao Codex se já existe Nginx, Apache, Caddy, Docker ou painel de hospedagem.
3. Fazer backup das configurações atuais.
4. Criar usuário de deploy em vez de operar diariamente como root.
5. Autorizar individualmente ações que afetem serviços existentes.
6. Testar o endpoint público e o certificado.

### 14.4 ChatGPT Work

Depois do deploy:

1. Abrir as configurações do ChatGPT.
2. Ativar o modo de desenvolvedor, se a política da conta/workspace permitir.
3. Abrir a área de Plugins.
4. Adicionar uma conexão MCP.
5. Nomear como `FUSE Criativos — Desenvolvimento`.
6. Informar `https://mcp.fusesite.com.br/criativos/mcp`.
7. Revisar as ferramentas detectadas.
8. Abrir uma nova conversa com a conexão habilitada.
9. Pedir: “Abra o estúdio visual FUSE Criativos”.
10. Confirmar que a UI realmente aparece e é clicável.
11. Atualizar a conexão depois de mudanças de metadata/UI.

A disponibilidade do modo de desenvolvedor pode depender da política do workspace. Para clientes, a distribuição definitiva dependerá da modalidade de publicação e revisão disponível na conta naquele momento.

### 14.5 Assets de marca e conceitos

O proprietário precisa fornecer ou aprovar:

- logo oficial e símbolo FUSE;
- variantes clara e escura;
- ícone quadrado do plugin;
- paleta e fontes licenciadas;
- miniaturas finais dos conceitos;
- textos legais;
- política de privacidade;
- termos comerciais;
- lista de primeiros usuários de teste.

### 14.6 Decisões comerciais futuras

- preço e planos;
- período de teste;
- limites por cliente;
- provedor de cobrança;
- política de cancelamento;
- suporte;
- regras de armazenamento e exclusão de arquivos;
- publicação privada por workspace ou submissão pública.

---

## 15. Critérios de aceite do MVP

O MVP só é considerado pronto quando:

- [ ] `https://mcp.fusesite.com.br/criativos/mcp` responde por HTTPS e Streamable HTTP.
- [ ] A conexão é reconhecida pelo ChatGPT em modo de desenvolvedor.
- [ ] `open_creative_studio` renderiza UI, não apenas texto.
- [ ] A interface funciona em desktop e em largura móvel razoável.
- [ ] Há pelo menos 12 conceitos com miniatura e detalhes.
- [ ] Há pacote genérico, perfumaria e supermercado/encarte.
- [ ] O usuário pode adicionar logo, produto e referências.
- [ ] O usuário pode cadastrar vários produtos e preços.
- [ ] O usuário pode selecionar múltiplos formatos.
- [ ] Validações impedem dados comerciais essenciais vazios.
- [ ] Os dados e IDs de imagens necessários chegam ao contexto do modelo.
- [ ] O botão final envia uma mensagem ao ChatGPT com briefing completo.
- [ ] Nenhuma chamada à API de imagens ocorre no servidor.
- [ ] Nenhuma `OPENAI_API_KEY` é necessária.
- [ ] O sistema não promete que uma imagem foi criada antes da resposta do ChatGPT.
- [ ] Existe fallback quando uploads ou fullscreen não forem suportados.
- [ ] Testes cobrem o vínculo entre ferramenta e recurso de UI.
- [ ] Logs não expõem imagens, prompts completos, tokens ou dados pessoais.
- [ ] Deploy, atualização e rollback estão documentados.
- [ ] A infraestrutura não interfere em outros serviços existentes.

---

## 16. Plano de implementação por fases

### Fase 0 — Auditoria

- inventariar VPS, portas, proxy, DNS, Docker e serviços existentes;
- confirmar versão do Node e ferramentas;
- registrar riscos;
- não alterar produção ainda.

### Fase 1 — Prova de renderização

- criar um MCP mínimo;
- criar `open_creative_studio`;
- vincular um recurso HTML simples;
- publicar em endpoint temporário ou definitivo;
- provar no ChatGPT que o card clicável renderiza;
- testar ponte UI, ferramenta e estado.

Essa fase deve ser concluída antes de construir o estúdio inteiro.

### Fase 2 — MVP do FUSE Criativos

- fluxo em etapas;
- catálogos;
- uploads;
- produtos e preços;
- formatos;
- validação;
- composição determinística do briefing;
- envio da mensagem final;
- testes e responsividade.

### Fase 3 — Produção privada

- domínio final;
- TLS;
- logs e health checks;
- autenticação inicial;
- backups e rollback;
- primeiros usuários.

### Fase 4 — Plataforma multi-plugin

- extrair pacotes compartilhados;
- adicionar FUSE Prospecta, Fuse DEV e FUSE Branding;
- gateway unificado;
- catálogo de plugins;
- autenticação e tenants compartilhados.

### Fase 5 — Comercialização

- planos e billing;
- painel de clientes;
- métricas;
- documentos legais;
- processo de publicação e revisão;
- suporte e operação.

---

## 17. Prompt mestre para executar no Codex

Copie do início ao fim deste bloco e use no Codex aberto na raiz do repositório:

```text
Você é o engenheiro principal responsável por construir a plataforma FUSE MCP.

Leia integralmente o arquivo FUSE_MCP_PLATAFORMA_PLANO_MESTRE.md antes de propor ou editar qualquer código. Trate-o como a fonte de verdade do produto. Leia também AGENTS.md e a documentação existente do repositório.

OBJETIVO

Construir a base extensível da plataforma de MCPs da FUSE e entregar primeiro o FUSE Criativos, um estúdio visual embarcado no ChatGPT Work. O domínio planejado é https://mcp.fusesite.com.br e o endpoint do primeiro produto será https://mcp.fusesite.com.br/criativos/mcp.

RESTRIÇÕES INEGOCIÁVEIS

1. Não usar OpenAI API nem OPENAI_API_KEY para gerar imagens.
2. Não implementar IA no backend para o fluxo principal.
3. A geração final é solicitada ao ChatGPT Work pela própria conversa.
4. O MCP organiza interface, arquivos, conceitos, validação e briefing.
5. Não usar comandos privados ou slash commands não documentados.
6. A ferramenta open_creative_studio deve renderizar uma UI real. Retornar apenas “o estúdio está aberto” é falha crítica.
7. Use o padrão MCP Apps atual e, quando necessário, extensões documentadas do ChatGPT detectadas por capacidade.
8. Vincule a ferramenta ao recurso de UI com o campo MCP padrão atual e mantenha compatibilidade documentada quando necessário.
9. Use ui/message para mensagem de continuação; use aliases window.openai apenas como compatibilidade ou para capacidades específicas do ChatGPT.
10. Para arquivos, use as capacidades documentadas do host e preserve imageIds válidos no estado estruturado.
11. Não invente dados, endpoints, schemas ou APIs da OpenAI. Consulte a documentação oficial atual quando necessário.
12. Não altere serviços da VPS antes de uma auditoria e de um plano revisável.
13. Não derrube aplicações existentes.
14. Não execute serviços de aplicação como root.
15. Não coloque credenciais no Git.

MÉTODO DE TRABALHO

1. Audite o repositório e informe o estado atual.
2. Se estiver vazio, crie o monorepo descrito no documento.
3. Produza um plano curto por fases e comece pela prova mínima de renderização.
4. Implemente e teste o menor MCP que renderiza um componente clicável no ChatGPT.
5. Crie um teste automatizado que confirme que open_creative_studio anuncia o resourceUri e que o recurso HTML pode ser lido.
6. Somente depois expanda para o fluxo completo do FUSE Criativos.
7. Faça commits pequenos e semanticamente claros, mas não publique nem faça push sem autorização.
8. Depois de cada marco, informe arquivos alterados, testes executados, resultado e próximo risco.

ARQUITETURA

- Node.js LTS e TypeScript estrito.
- React + Vite para UI embarcada.
- SDK MCP oficial compatível com Streamable HTTP.
- pnpm workspaces.
- Pacotes compartilhados para UI FUSE, schemas, MCP core, autenticação futura, config e observabilidade.
- Catálogos orientados a dados para conceitos, nichos e formatos.
- Docker Compose e reverse proxy versionados.
- Endpoint /health e logs estruturados.
- Caminhos separados por produto sob mcp.fusesite.com.br.
- Preparar a base para FUSE Prospecta, Fuse DEV, FUSE Branding e futuros produtos, mas implementar funcionalmente apenas FUSE Criativos no MVP.

EXPERIÊNCIA DO FUSE CRIATIVOS

Implemente o wizard visual descrito no documento: campanha, nicho, objetivo, conceito por miniaturas, marca, produtos/serviços, público/mensagem, referências, formatos, revisão e envio ao ChatGPT. Inclua pacotes genérico, perfumaria e supermercado/encarte. O usuário deve conseguir cadastrar vários produtos e selecionar vários formatos.

O botão final deve validar, atualizar o contexto do modelo, incluir IDs válidos de imagens e enviar ao ChatGPT uma mensagem profissional solicitando a primeira geração. Para vários formatos, conduza uma peça por vez e preserve consistência da campanha.

QUALIDADE

- Interface premium alinhada à FUSE, acessível e responsiva.
- Estados completos de loading, erro, vazio, sucesso e capacidade indisponível.
- Sem confirmações falsas.
- Testes unitários, integração MCP e interface.
- Schemas de entrada e saída explícitos.
- Sanitização e limites de arquivo.
- Nenhum segredo ou conteúdo sensível nos logs.
- README com setup local.
- Documentos de deploy, rollback e conexão ao ChatGPT.
- .env.example sem valores reais.

PRIMEIRA ENTREGA DESTA SESSÃO

Não tente construir tudo de uma vez. Nesta sessão:

1. Faça a auditoria.
2. Confirme a arquitetura usando documentação oficial atual.
3. Crie o monorepo base.
4. Implemente a prova mínima de open_creative_studio com UI real.
5. Escreva e execute os testes dessa prova.
6. Forneça os comandos exatos para executar localmente.
7. Pare antes de mexer na configuração de produção da VPS e apresente o plano de implantação para aprovação.

Comece lendo todo o documento e depois apresente o diagnóstico. Não me faça repetir requisitos que já estão documentados.
```

---

## 18. Comandos iniciais sugeridos

No computador, depois de criar/clonar o repositório:

```bash
cd fuse-mcp-platform
codex
```

Na VPS, para manter uma sessão resiliente:

```bash
tmux new -s fuse-mcp
cd /caminho/do/fuse-mcp-platform
codex
```

Para sair da sessão sem encerrá-la: `Ctrl+B`, depois `D`.

Para voltar:

```bash
tmux attach -t fuse-mcp
```

Use autenticação do Codex com a conta ChatGPT quando essa for a modalidade pretendida. Não compartilhe `~/.codex/auth.json`, pois ele contém credenciais de acesso.

---

## 19. Testes manuais essenciais

### Renderização

1. Pedir “Abra o estúdio visual FUSE Criativos”.
2. Confirmar que aparece uma interface, não só mensagem.
3. Clicar em conceitos e avançar etapas.
4. Fechar/reabrir e verificar restauração apropriada do estado daquela instância.

### Arquivos

1. Selecionar logo.
2. Selecionar foto do produto.
3. Selecionar duas referências.
4. Confirmar que previews e remoção funcionam.
5. Verificar se os IDs corretos ficam disponíveis ao modelo.

### Campanha de perfumaria

- novidade de perfume;
- conceito luxo editorial;
- uma embalagem real;
- feed 4:5 e story 9:16;
- logo e preço;
- garantir fidelidade do frasco e da marca.

### Encarte de supermercado

- pelo menos seis produtos;
- preço anterior e atual;
- datas da promoção;
- categorias;
- grid legível;
- nenhum produto ou preço inventado.

### Falhas

- arquivo grande;
- formato não suportado;
- preço vazio;
- nenhum conceito selecionado;
- recurso de upload indisponível;
- endpoint temporariamente offline;
- bridge da UI ausente fora do ChatGPT.

---

## 20. Referências oficiais a verificar durante a implementação

A documentação muda. O Codex deve verificar a versão atual antes de implementar:

- Construção de servidor MCP para plugins: <https://developers.openai.com/plugins/build/mcp-server>
- UI para servidor MCP: <https://developers.openai.com/plugins/build/chatgpt-ui>
- Conectar e testar plugin: <https://developers.openai.com/plugins/deploy/connect-chatgpt>
- Documentação do Codex: <https://learn.chatgpt.com/docs>

Pontos atuais que precisam continuar verdadeiros ou ser adaptados à documentação vigente:

- endpoint público por HTTPS;
- transporte Streamable HTTP, normalmente em `/mcp`;
- ferramenta ligada ao recurso de UI;
- comunicação pela ponte MCP Apps;
- extensões do ChatGPT detectadas por capacidade;
- testes em modo de desenvolvedor;
- atualização da conexão depois de mudanças de metadata ou UI.

---

## 21. Definição de sucesso

O sucesso não é o ChatGPT responder “o estúdio está aberto”. O sucesso é o cliente instalar/conectar o produto, abrir uma interface visual FUSE real, escolher um conceito por miniaturas, fornecer materiais e informações comerciais, revisar um briefing compreensível e iniciar no próprio ChatGPT Work uma geração de imagem profissional que preserve marca, produto, preços e direção de arte.

A plataforma deve permitir repetir esse padrão com os outros produtos FUSE usando o mesmo domínio, infraestrutura, identidade, autenticação e padrões de qualidade.

