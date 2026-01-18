# Roadmap Master - Brazukas Delivery MVP

Status: Monorepo em desenvolvimento (Frontend & Backend).

## 🌍 GERAL (Planejamento & Releases)

- [x] **Fase 1: Planejamento e Requisitos** (✅ 100%)
  - [x] Definição de Escopo e Personas.
  - [x] Listagem de Features (MVP).
- [ ] **Fase 8: Deploy e Lançamento** (⚪ Aguardando)
  - [ ] Infraestrutura Docker (Front/Back/DB).
  - [ ] CI/CD Pipelines.
- [ ] **Fase 9: Manutenção** (⚪ Futuro)

---

## 🎨 FRONTEND (Yan)

**Stack**: React 19, Vite, Tailwind, Wouter.

- [x] **Fase 2: Design UI/UX** (✅ 95%)
  - [x] Wireframes e Protótipos Interativos.
- [ ] **Fase 3: Desenvolvimento Frontend** (🏗️ 70%)
  - [x] Home, Busca e Categorias.
  - [x] Listagem de Restaurantes e Detalhes (Produtos).
  - [x] Carrinho (Sidebar).
  - [x] UI de Autenticação (Modais).
  - [ ] **Checkout e Finalização**.
- [ ] **Fase 6-F: Delivery & Tracking (UI)** (⚪ Próximas Etapas)
  - [ ] Rastreamento em Tempo Real (Mapa Leaflet).
  - [ ] Notificações de Status do Pedido.
  - [ ] App do Entregador (Interface PWA).

---

## ⚙️ BACKEND (Thálisson)

**Stack**: Node.js, Express, PostgreSQL, Docker.

- [x] **Fase 4: Desenvolvimento Backend** (🟡 50%)
  - [x] Setup Monorepo (Docker/Express).
  - [x] Database Seeding (Lojas/Produtos).
  - [x] CRUD Lojas e Restaurantes.
  - [ ] **Autenticação JWT**.
  - [ ] **Sistema de Pedidos (Flow)**.
- [ ] **Fase 5: Banco de Dados** (🏗️ In-Progress)
  - [x] Modelagem Lojas e Produtos.
  - [ ] Tabelas de Usuários e Pedidos.
- [ ] **Fase 6-B: Delivery & Tracking (API)** (⚪ Aguardando)
  - [ ] Websockets para Tempo Real.
  - [ ] Integração de Geolocalização.
