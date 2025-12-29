# Roadmap Backend (Brazukas Delivery)

Responsável: Thálisson
Foco: API, Banco de Dados, Regras de Negócio.

## Fase 1: Planejamento Técnico

- [x] **Arquitetura**: Definição de Monorepo, Docker e Stack (Node/Express).
- [x] **Modelagem de Dados Inicial** (Diagrama ER).

## Fase 4: Desenvolvimento Backend (🏗️ Foco)

- [x] **Setup**: Configuração do Server, TS, Linter, Docker.
- [ ] **API de Autenticação**:
  - [ ] Login (JWT).
  - [ ] Registro (Hash de Senha).
  - [ ] Middleware de Proteção.
- [ ] **API de Restaurantes/Produtos**:
  - [ ] CRUD Básico.
  - [ ] Upload de Imagens (Mock/S3).
- [ ] **API de Pedidos**:
  - [ ] Criação de Pedido.
  - [ ] Atualização de Status.

## Fase 5: Banco de Dados (⚪ Aguardando)

- [ ] **Migrations**: Drizzle ORM Setup.
- [ ] **Schemas**:
  - [ ] `users` (clientes, entregadores, admins).
  - [ ] `restaurants`, `products`, `categories`.
  - [ ] `orders`, `order_items`.
- [ ] **Seeds**: Dados iniciais para teste.

## Fase 6: Integrações Backend (⚪ Aguardando)

- [ ] **Pagamentos**: Integração PIX (QRCode).
- [ ] **Geolocalização**: Endpoint de atualização de coords.

## Fase 7: Testes Backend (⚪ Aguardando)

- [ ] Testes Unitários (Jest).
- [ ] Testes de Carga (K6).

## Fase 8: Deploy Backend (⚪ Aguardando)

- [ ] Dockerfile Multistage.
- [ ] Deploy em VPS/Render.
