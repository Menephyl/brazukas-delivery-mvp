# MVP de Rastreamento em Tempo Real (Deadline: 29/12)

Este MVP foca exclusivamente na **FASE 3 — Módulo Delivery**, especificamente:
- **Backend:** "Pedido → Checkout → Status" + "Tracking simples"
- **Frontend:** "Rastreamento do pedido" + "Histórico de pedidos"

## 1. O que já temos (Status Confirmado)
- **Frontend:** Autenticação Supabase completa (`AuthContext`, `Login`, `Register`).
- **UI Components:** `TrackingMap.tsx` e `RouteStats.tsx` (reutilizar).
- **Backend atual:** Mock em memória (`server/orders.ts`).
- **Referência:** `client/src/lib/api/orders.ts` (lógica de inserção pronta).

## 2. Roadmap Ágil para 29/12

### Passo 1: Banco de Dados (Drizzle + Supabase)
Garantir que as tabelas esperadas pelo código existente existam.
- [ ] **Tabela orders**: `id`, `restaurant_id`, `total`, `status`, `created_at`, `client_info`, `driver_id`, `driver_info`, `address`.
- [ ] **Tabela order_items**.
- [ ] **Realtime**: Habilitar no dashboard do Supabase para tabela `orders`.

### Passo 2: Backend (Migração tRPC)
Substituir a memória por Drizzle.
- [ ] **create**: Usar Drizzle para inserir em `orders` e `order_items`.
- [ ] **list/get**: Buscar do banco.
- [ ] **updateStatus**: Update no banco.
- [ ] **Novo endpoint**: `updateLocation`.

### Passo 3: App do Entregador (DriverAppPage.tsx)
Funcionalidade Real.
- [ ] **Autenticação**: Proteger página.
- [ ] **Listagem**: Pedidos com status 'ASSIGNED' e driver_id = user.id.
- [ ] **Localização**: `navigator.geolocation.watchPosition` -> `order_tracking` ou campo `location` em `orders`.

### Passo 4: Cliente (OrderPage.tsx)
Integração Realtime.
- [ ] **Substituir Polling**: Remover `setInterval`.
- [ ] **Integrar Supabase Channel**: Escutar updates da tabela `orders`.
- [ ] **Mapa**: Passar coordenadas em tempo real para `TrackingMap`.
