# Roadmap Master (Detalhado & Mensurável)

Este documento consolidado define o roadmap completo do projeto, integrando os requisitos do Notion, a Arquitetura de Pastas (Next.js App Router) e o MVP de Delivery.

## 🧱 FASE 0 — Organização e Arquitetura (Ambos)

### Objetivo: Base sólida para escalabilidade
- [x] **Estrutura de Monorepo/Pastas**
    - [x] Raiz definida: `/frontend`, `/backend`, `/docs`, `/infrastructure`.
    - [x] **Arquitetura de Pastas (Target)**: Adotar estrutura baseada em *Features/Modules* compatível com Next.js App Router:
        ```
        app/
          (auth)/       # Login, Signup, Forgot Password
          (customer)/   # Home, Store, Checkout, Orders
          (store)/      # Dashboard, Products, Settings
          (courier)/    # App do Entregador, Earnings
          (admin)/      # Backoffice general
        ```
- [x] **Documentação Inicial**
    - [x] `README.md` com setup guide.
    - [x] `ARCHITECTURE.md` definindo o padrão de rotas.
    - [x] Board Kanban configurado.
- [x] **Contratos de API**
    - [x] Tipagem TypeScript compartilhada (Zod Schemas) entre Front e Back.

---

# 🟩 BACK-END (Thálisson)

## FASE 1 — Setup e Fundamentos
- [x] **Inicialização**
    - [x] Node.js + TypeScript configurado (`tsconfig.json` rígido).
    - [x] Linter e Formatter (ESLint + Prettier).
- [x] **Arquitetura Modular**
    - [x] Estrutura `src/modules/{module_name}/{controller,service,schema}`.
- [x] **Core Framework**
    - [x] Express ou Fastify configurado com `app.ts` limpo.
    - [x] **Autenticação Base**:
        - [x] Implementar JWT (Access Token 15min).
        - [x] Implementar Refresh Token (7d, rotação no banco).
        - [x] Middleware `isAuthenticated`.
- [x] **Configuração e Segurança**
    - [x] Validação de Variáveis de Ambiente (`env.ts` com Zod).
- [ ] **Banco de Dados (Drizzle ORM)**
    - [ ] Configurar conexão (`server/db.ts`).
    - [ ] Criar Schemas base: `users`, `sessions`.
    - [ ] Migrations automáticas no startup ou via script CI.
- [ ] **Observabilidade**
    - [ ] Logger estruturado (Pino/Winston) com correlation-id.
    - [ ] Middlewares: `errorHandler` global, `rateLimit` (Redis/Memory), `cors`.

## FASE 2 — Autenticação e Usuários
- [ ] **Funcionalidades de Acesso**
    - [ ] Rota `POST /auth/register`: Criar usuário com hash (Argon2/Bcrypt).
    - [ ] Rota `POST /auth/login`: Retornar par de tokens.
    - [ ] **SSO (Single Sign-On)**: OAuth com Google/Facebook (opcional MVP).
    - [ ] **Recuperação de Senha**: Fluxo de token por email + reset password.
- [ ] **Gestão de Perfis**
    - [ ] Role-Based Access Control (RBAC): Middleware `hasRole(['ADMIN', 'STORE'])`.
    - [ ] Perfis distintos na mesma conta: Usuário pode ser `COURIER` e `CUSTOMER` simultaneamente.
    - [ ] Sessão persistente: Invalidar tokens ao trocar senha.

## FASE 3 — Módulo Delivery (MVP 29/12)
- [ ] **Restaurantes**
    - [ ] CRUD completo (`create`, `update` info, `upload` logo).
    - [ ] Gestão de status: Endpoint `POST /store/toggle-status` (Aberto/Fechado).
- [ ] **Cardápio**
    - [ ] Categorias (Bebidas, Lanches).
    - [ ] Itens: Preço, Descrição, Foto, Obrigatórios/Opcionais.
- [ ] **Fluxo de Pedido (Core)**
    - [ ] `POST /orders`: Receber itens, validar estoque/disponibilidade, calcular total.
    - [ ] **Checkout**: Integração Mock de pagamento (Status -> `PAID`).
    - [ ] **Máquina de Estados**: `PENDING` -> `CONFIRMED` -> `PREPARING` -> `READY` -> `ASSIGNED` -> `PICKED_UP` -> `DELIVERED`.
- [ ] **Rastreamento (Tracking)**
    - [ ] Tabela `order_tracking` com histórico de lat/lng.
    - [ ] Endpoint `PATCH /orders/:id/location`: Receber coordenadas do Entregador.
- [ ] **Jobs/Automação**
    - [ ] Cron: Fechar restaurantes automaticamente baseado no horário cadastrado.
    - [ ] Cron: Cancelar pedidos `PENDING` > 15min sem pagamento.

## FASE 4 — Módulo Banco
- [ ] **Carteira Digital**
    - [ ] Ledger: Tabela de transações imutável (Double-entry bookkeeping).
    - [ ] Suporte Multi-moeda: BRL, USD, PYG (Guarani).
- [ ] **Funcionalidades**
    - [ ] PIX Interno (Transferência P2P instantânea entre usuários).
    - [ ] Câmbio: Endpoint de cotação real-time e conversão de saldo.
    - [ ] KYC Simplificado: Upload de documento + verificação manual (status `VERIFIED`).

## FASE 5 — Módulo Aluguéis
- [ ] **Gestão de Imóveis**
    - [ ] CRUD com múltiplas fotos e geolocalização.
    - [ ] Filtros avançados no DB (Range de preço, número de quartos).
- [ ] **Reservas**
    - [ ] Bloqueio de datas no calendário.
    - [ ] Agendamento de visitas (integração com Google Calendar opcional).
    - [ ] Chat: Mensageria simples entre Locador e Interessado (WebSockets).

## FASE 6 — Módulo Produtos / Loja
- [ ] **E-commerce Genérico**
    - [ ] Controle de Estoque atômico (evitar venda duplicada).
    - [ ] Carrinho persistente no banco (Redis ou SQL).
    - [ ] Integração de Cashback: Compras geram saldo no Módulo Banco.

## FASE 7 — Aapa da Colônia
- [ ] **Pontos de Interesse (POI)**
    - [ ] GeoJSON storage (PostGIS ou apenas lat/lng).
    - [ ] Filtros espaciais: "Buscar num raio de 5km".
    - [ ] Detalhes ricos: Horários, Avaliações, Link para módulo de delivery/loja.

## FASE 8 — Utilidades Públicas
- [ ] **Ponte da Amizade**
    - [ ] Crawler/Scraper para status da fila (ou dados da PRF/Câmeras).
    - [ ] Fallback: Status manual reportado por usuários ("Waze da ponte").
- [ ] **Financeiro & Clima**
    - [ ] Câmbio oficial vs Paralelo (Scraper de casas de câmbio locais).
    - [ ] Clima: Integração OpenWeatherMap com cache Redis (TTL 1h).

## FASE 9 — Blog
- [ ] **CMS Headless**
    - [ ] Posts com suporte a Markdown/Rich Text.
    - [ ] SEO Automático: Gerar slugs únicos, metatags OpenGraph.

## FASE 10 — Infraestrutura & DevOps
- [ ] **Storage**
    - [ ] Upload de imagens para S3 (AWS/R2/MinIO) + CDN (Cloudflare).
- [ ] **CI/CD**
    - [ ] GitHub Actions: Lint -> Test -> Build -> Docker Push.
- [ ] **Deploy**
    - [ ] Dockerfile otimizado (Multi-stage build).
    - [ ] VPS setup (Coolify, CapRover ou manual com Docker Compose).
- [ ] **Monitoramento**
    - [ ] Logs centralizados.
    - [ ] Uptime monitoring (BetterStack/UptimeRobot).

---

# 🟦 FRONT-END (Yan)

## FASE 1 — Setup e Fundamentos
- [x] **Stack Inicial**
    - [x] Next.js (App Router) ou Vite (Migração planejada).
    - [x] TailwindCSS + `clsx` + `tailwind-merge`.
    - [x] Biblioteca de UI: **shadcn/ui** (Radix UI).
- [x] **Design System**
    - [x] Definição de tokens de cor (CSS Variables) para Dark/Light mode.
    - [ ] Layouts globais: Header responsivo, Footer, Sidebar para Dashboards.
- [ ] **Autenticação**
    - [ ] Contexto de Auth (Zustand/Context API).
    - [ ] Persistência segura (HttpOnly Cookies para Next.js ou Secure Storage).
    - [ ] i18n: Configuração base para Português/Espanhol (`next-intl`).

## FASE 2 — Páginas Públicas
- [ ] **Landing Page**
    - [ ] Hero Section com proposta de valor ("App da Colônia").
    - [ ] Cards de acesso rápido aos módulos (Delivery, Banco, Aluguéis).
- [ ] **Acesso**
    - [ ] Telas de Login/Registro com validação de formulário (React Hook Form + Zod).
    - [ ] Feedback visual de erros (Toasts/Alerts).

## FASE 3 — Módulo Delivery (MVP 29/12)
- [ ] **Experiência do Cliente**
    - [ ] Home Delivery: Listagem de restaurantes com filtros (Categoria, Preço, Aberto agora).
    - [ ] Página de Restaurante: Header com infos, Lista de Produtos, Modal de Detalhes.
    - [ ] **Carrinho Lateral (Drawer)**: Adicionar/Remover itens, Subtotal.
    - [ ] **Checkout**: Seleção de endereço, Forma de pagamento, Botão "Finalizar".
- [ ] **Experiência Pós-Compra**
    - [ ] **Rastreamento Real-Time**: Mapa (Leaflet/Mapbox) mostrando motoboy e destino.
    - [ ] Histórico de Pedidos: Lista com status, data e opção "Repetir Pedido".

## FASE 4 — Módulo Banco
- [ ] **Interface Fintech**
    - [ ] Design moderno, focado em mobile (Bottom Navigation).
    - [ ] Dashboard: Saldo ocultável, Extrato rolável infinito.
    - [ ] Ações Rápidas: PIX, Câmbio, Recarga.
- [ ] **Onboarding**
    - [ ] Fluxo de KYC visual: Barra de progresso, Camera capture para doc/selfie.

## FASE 5 — Módulo Aluguéis
- [ ] **Busca de Imóveis**
    - [ ] Mapa interativo com pins de preços.
    - [ ] Listagem em Grid/List.
    - [ ] Página de Detalhes: Galeria de fotos (Carousel), Infos, Mapa.
- [ ] **Interação**
    - [ ] Botão "Agendar Visita" (Datepicker).
    - [ ] Chat UI: Balões de mensagem, status de leitura.

## FASE 6 — Módulo Loja
- [ ] **Marketplace**
    - [ ] Grid de produtos com "Lazy load".
    - [ ] Filtros laterais (desktop) ou Bottom Sheet (mobile).
    - [ ] Minha Conta: Acompanhamento de entregas.

## FASE 7 — Blog
- [ ] **Conteúdo**
    - [ ] Layout tipográfico otimizado para leitura.
    - [ ] Componentes de "Posts Relacionados" e "Newsletter".

## FASE 8 — Mapa da Colônia
- [ ] **Exploração**
    - [ ] Mapa Fullscreen.
    - [ ] Clusters de marcadores para performance.
    - [ ] Tooltips interativos ao clicar num local.

## FASE 9 — Utilidades em Tempo Real
- [ ] **Widgets**
    - [ ] Ponte da Amizade: Gráfico de tempo de espera com código de cores (Verde/Amarelo/Vermelho).
    - [ ] Câmbio: Gráfico de linha (Recharts) mostrando variação 7 dias.
