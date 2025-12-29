# Roadmap Master (Estrutura Separada)

Roadmap organizado por área de responsabilidade (Geral, Backend, Frontend).

## 🌍 GERAL (Planejamento & Releases)

Tarefas compartilhadas ou de gerenciamento.

### Fase 1: Planejamento e Requisitos (✅ 100%)

- [x] **Definição de Escopo**:
  - [x] Funcionalidades da Home (Categorias, Destaques).
  - [x] Funcionalidades de Restaurantes (Busca, Filtros).
  - [x] Globais (Dark mode, Carrinho).
- [x] **Personas**: Definição de stories para Cliente, Entregador, Admin.

### Fase 8: Deploy e Lançamento (⚪ Aguardando)

- [ ] **Infraestrutura**: Configurar ambientes Dev/Staging/Prod.
- [ ] **Hospedagem**: Vercel (Front) e Render/VPS (Back).
- [ ] **CI/CD**: Pipelines de automação.

### Fase 9: Manutenção (⚪ Futuro)

- [ ] Monitoramento, SEO e Analytics.

---

## 🎨 FRONTEND (Yan)

Foco: Interface, UX, Integração Client-side.

### Fase 2: Design UI/UX (✅ 90%)

- [x] **Wireframes & Protótipos**: Mobile-first, Temática Brazukas.
- [x] **Acessibilidade**: Contraste e leitores de tela.

### Fase 3: Desenvolvimento Frontend (🏗️ Foco Imediato)

- [ ] **Páginas Visuais**:
  - [ ] Home completa (Busca, Categorias, Cards).
  - [ ] Detalhes do Restaurante e Produtos.
  - [ ] Carrinho e Checkout Visual.
  - [ ] Telas de Auth (Login/Register).
- [ ] **Lógica Client-Side**:
  - [ ] Gerenciamento de Estado (Carrinho).
  - [ ] Validação de Formulários.
  - [ ] Integração com APIs.

### Fase 6-F: Integrações Frontend (⚪ Aguardando)

- [ ] **Mapas**: Exibição de mapa interativo (Leaflet).
- [ ] **Notificações**: Toasts e tratamento de mensagens realtime.

### Fase 7-F: Testes Frontend (⚪ Aguardando)

- [ ] Testes Manuais (Cross-browser).
- [ ] Testes de Componentes (Jest/Vitest).

---

## ⚙️ BACKEND (Thálisson)

Foco: API, Dados, Regras de Negócio.

### Fase 4: Desenvolvimento Backend (🟡 40%)

- [x] **Setup**: GitHub, Docker, Linter.
- [ ] **APIs Core**:
  - [ ] Autenticação (JWT, Session).
  - [ ] CRUD Produtos/Restaurantes.
  - [ ] Pedidos (Status flow).
- [ ] **Regras de Negócio**: Frete, Estoque.

### Fase 5: Banco de Dados (⚪ Aguardando)

- [ ] **Modelagem**: Schemas (Users, Orders, Products, Tracking).
- [ ] **Migrations e Queries Otimizadas**.

### Fase 6-B: Integrações Backend (⚪ Aguardando)

- [ ] **Pagamentos**: Gateway PIX/Cartão.
- [ ] **Geolocalização**: Cálculos de distância e Rota.
- [ ] **Mensageria**: Email/SMS.

### Fase 7-B: Testes Backend (⚪ Aguardando)

- [ ] Testes Unitários e Integração de API.
