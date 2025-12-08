# Arquitetura do Projeto (Target)

Esta estrutura define a organização de pastas desejada para o Frontend (Next.js App Router + src).

## Estrutura de Diretórios
```
brazukas-delivery/
├── app/                              # Next.js App Router
│   ├── (auth)/                       # Grupo de rotas: Autenticação
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   ├── forgot-password/page.tsx
│   │   └── layout.tsx
│   │
│   ├── (customer)/                   # Grupo de rotas: Cliente
│   │   ├── layout.tsx
│   │   ├── page.tsx                  # Home/Vitrine
│   │   ├── store/[id]/page.tsx       # Detalhes da loja
│   │   ├── checkout/page.tsx
│   │   ├── order/[id]/page.tsx       # Rastreamento de pedido
│   │   ├── history/page.tsx
│   │   └── profile/page.tsx
│   │
│   ├── (store)/                      # Grupo de rotas: Loja
│   │   ├── layout.tsx
│   │   ├── dashboard/page.tsx        # Dashboard da loja
│   │   ├── orders/page.tsx
│   │   ├── products/page.tsx
│   │   ├── analytics/page.tsx
│   │   └── settings/page.tsx
│   │
│   ├── (courier)/                    # Grupo de rotas: Entregador
│   │   ├── layout.tsx
│   │   ├── app/page.tsx              # App do entregador (PWA)
│   │   ├── earnings/page.tsx
│   │   └── profile/page.tsx
│   │
│   ├── (admin)/                      # Grupo de rotas: Admin
│   │   ├── layout.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── users/page.tsx
│   │   ├── stores/page.tsx
│   │   ├── orders/page.tsx
│   │   ├── analytics/page.tsx
│   │   └── settings/page.tsx
│   │
│   ├── api/                          # API Routes (tRPC)
│   │   └── trpc/[trpc]/route.ts      # tRPC handler
│   │
│   ├── layout.tsx                    # Root layout
│   └── page.tsx                      # Redirect ou landing
│
├── src/                              # Código-fonte principal (Components, Libs, etc)
```

> **Nota:** O projeto atual está em Vite (React SPA). Esta estrutura sugere uma migração para Next.js App Router ou uma adaptação da estrutura de pastas dentro de `src` para mimetizar essa organização.
