import { useState, useEffect } from "react";
import { ProjectHeader } from "@/components/ProjectHeader";
import { PhaseCard } from "@/components/PhaseCard";
import { CompetitorAnalysis } from "@/components/CompetitorAnalysis";
import { ScopeChangeNote } from "@/components/ScopeChangeNote";
import { HeaderMockup } from "@/components/HeaderMockup";
import { TrackingMockup } from "@/components/TrackingMockup";
import { DriverAppMockup } from "@/components/DriverAppMockup";
import { AlertCircle, Rocket } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface Phase {
  id: number;
  title: string;
  description: string;
  tasks: Task[];
}

const initialCommonPhases: Phase[] = [
  {
    id: 0,
    title: "Fase 0: Organização do Projeto",
    description: "Ambos",
    tasks: [
      { id: "0-1", title: "Criar monorepo (ou estrutura de pastas)", completed: true },
      { id: "0-2", title: "Definir arquitetura geral (front, backend, DB)", completed: true },
      { id: "0-3", title: "Criar README inicial", completed: true },
      { id: "0-4", title: "Criar board Kanban", completed: true },
      { id: "0-5", title: "Criar contratos de API (Types)", completed: true },
    ],
  },
];

const initialBackendPhases: Phase[] = [
  {
    id: 1,
    title: "Fase 1: Setup e Fundamentos",
    description: "Backend (Thálisson)",
    tasks: [
      { id: "b-1-1", title: "Inicializar projeto Node.js + TS", completed: true },
      { id: "b-1-2", title: "Criar arquitetura: src/modules/*", completed: true },
      { id: "b-1-3", title: "Configurar Express / Fastify", completed: true },
      { id: "b-1-4", title: "Criar Auth base (JWT + Refresh Token)", completed: true },
      { id: "b-1-5", title: "Criar .env + validação Zod", completed: true },
      { id: "b-1-6", title: "MySQL + Drizzle + PlanetScale", completed: false },
      { id: "b-1-7", title: "Conexão DB + migrations automáticas", completed: false },
      { id: "b-1-8", title: "Criar logger (Pino/Winston)", completed: false },
      { id: "b-1-9", title: "Middlewares globais (error, rate limit)", completed: false },
    ],
  },
  {
    id: 2,
    title: "Fase 2: Autenticação e Usuários",
    description: "Backend (Thálisson)",
    tasks: [
      { id: "b-2-1", title: "Registro / Login", completed: false },
      { id: "b-2-2", title: "Função 'login único' (SSO)", completed: false },
      { id: "b-2-3", title: "Recuperação de senha", completed: false },
      { id: "b-2-4", title: "Perfis (usuário, parceiro, etc)", completed: false },
      { id: "b-2-5", title: "Sessão persistente", completed: false },
    ],
  },
  {
    id: 3,
    title: "Fase 3: Módulo Delivery",
    description: "Backend (Thálisson)",
    tasks: [
      { id: "b-3-1", title: "Restaurantes (CRUD)", completed: false },
      { id: "b-3-2", title: "Cardápios + categorias", completed: false },
      { id: "b-3-3", title: "Itens + Horários", completed: false },
      { id: "b-3-4", title: "Filtros e busca", completed: false },
      { id: "b-3-5", title: "Carrinho (Lógica)", completed: false },
      { id: "b-3-6", title: "Pedido → Checkout → Status", completed: false },
      { id: "b-3-7", title: "Tracking simples", completed: false },
      { id: "b-3-8", title: "Job: abrir/fechar auto", completed: false },
    ],
  },
  {
    id: 4,
    title: "Fase 4: Módulo Banco",
    description: "Backend (Thálisson)",
    tasks: [
      { id: "b-4-1", title: "Criar contas (Real/Guarani/USD)", completed: false },
      { id: "b-4-2", title: "Saldo multi-moeda", completed: false },
      { id: "b-4-3", title: "PIX interno (mock)", completed: false },
      { id: "b-4-4", title: "Conversão/cotação", completed: false },
      { id: "b-4-5", title: "Fluxo KYC (mock integrado)", completed: false },
    ],
  },
  {
    id: 5,
    title: "Fase 5: Módulo Aluguéis",
    description: "Backend (Thálisson)",
    tasks: [
      { id: "b-5-1", title: "CRUD imóveis + Filtros", completed: false },
      { id: "b-5-2", title: "Reservas", completed: false },
      { id: "b-5-3", title: "Agendar visita", completed: false },
      { id: "b-5-4", title: "Chat simplificado", completed: false },
    ],
  },
  {
    id: 6,
    title: "Fase 6: Módulo Produtos / Loja",
    description: "Backend (Thálisson)",
    tasks: [
      { id: "b-6-1", title: "CRUD produtos + estoque", completed: false },
      { id: "b-6-2", title: "Carrinho unificado", completed: false },
      { id: "b-6-3", title: "Pedidos + tracking", completed: false },
      { id: "b-6-4", title: "Integração entre módulos", completed: false },
    ],
  },
  {
    id: 7,
    title: "Fase 7: Mapa da Colônia",
    description: "Backend (Thálisson)",
    tasks: [
      { id: "b-7-1", title: "Registro dos pontos (lojas, etc)", completed: false },
      { id: "b-7-2", title: "Filtros por categoria", completed: false },
      { id: "b-7-3", title: "Endpoint de lista + detalhes", completed: false },
    ],
  },
  {
    id: 8,
    title: "Fase 8: Utilidades",
    description: "Backend (Thálisson)",
    tasks: [
      { id: "b-8-1", title: "API “status da ponte”", completed: false },
      { id: "b-8-2", title: "Clima atual + Cache Redis", completed: false },
      { id: "b-8-3", title: "Câmbio BRL↔PYG↔USD com timestamp", completed: false },
    ],
  },
  {
    id: 9,
    title: "Fase 9: Blog",
    description: "Backend (Thálisson)",
    tasks: [
      { id: "b-9-1", title: "CRUD posts + slugs", completed: false },
      { id: "b-9-2", title: "Categorias + SEO", completed: false },
    ],
  },
  {
    id: 10,
    title: "Fase 10: Infraestrutura",
    description: "Backend (Thálisson)",
    tasks: [
      { id: "b-10-1", title: "Upload de imagens (S3/Cloudflare)", completed: false },
      { id: "b-10-2", title: "CI/CD GitHub Actions", completed: false },
      { id: "b-10-3", title: "Deploy na VPS / Docker", completed: false },
    ],
  },
];

const initialFrontendPhases: Phase[] = [
  {
    id: 1,
    title: "Fase 1: Setup e Fundamentos",
    description: "Frontend (Yan)",
    tasks: [
      { id: "f-1-1", title: "Criar app Next.js (App Router)", completed: true },
      { id: "f-1-2", title: "Configurar TailwindCSS + shadcn/ui", completed: true },
      { id: "f-1-3", title: "Tema global + tokens de cor", completed: true },
      { id: "f-1-4", title: "Layout base (Header/Footer)", completed: false },
      { id: "f-1-5", title: "Autenticação via cookies", completed: false },
    ],
  },
  {
    id: 2,
    title: "Fase 2: Páginas Públicas",
    description: "Frontend (Yan)",
    tasks: [
      { id: "f-2-1", title: "Home (herói, módulos, métricas)", completed: false },
      { id: "f-2-2", title: "Sobre/Contato", completed: false },
      { id: "f-2-3", title: "Troca de idioma", completed: false },
      { id: "f-2-4", title: "Login / Cadastro / Recuperação", completed: false },
    ],
  },
  {
    id: 3,
    title: "Fase 3: Delivery",
    description: "Frontend (Yan)",
    tasks: [
      { id: "f-3-1", title: "Listagem de restaurantes + filtros", completed: false },
      { id: "f-3-2", title: "Página do restaurante", completed: false },
      { id: "f-3-3", title: "Carrinho lateral + Checkout", completed: false },
      { id: "f-3-4", title: "Rastreamento do pedido", completed: false },
    ],
  },
  {
    id: 4,
    title: "Fase 4: Banco",
    description: "Frontend (Yan)",
    tasks: [
      { id: "f-4-1", title: "Landing page modernas do banco", completed: false },
      { id: "f-4-2", title: "Simulador de crédito", completed: false },
      { id: "f-4-3", title: "Dashboard financeiro", completed: false },
      { id: "f-4-4", title: "Tela de câmbio + Cartão virtual", completed: false },
    ],
  },
  {
    id: 5,
    title: "Fase 5: Aluguéis",
    description: "Frontend (Yan)",
    tasks: [
      { id: "f-5-1", title: "Listagem de imóveis + filtros", completed: false },
      { id: "f-5-2", title: "Página do imóvel + Agendar visita", completed: false },
      { id: "f-5-3", title: "Upload de documentos", completed: false },
    ],
  },
  {
    id: 6,
    title: "Fase 6: Loja",
    description: "Frontend (Yan)",
    tasks: [
      { id: "f-6-1", title: "Grid de produtos + Filtro", completed: false },
      { id: "f-6-2", title: "Carrinho + Checkout", completed: false },
      { id: "f-6-3", title: "Painel do comprador", completed: false },
    ],
  },
  {
    id: 7,
    title: "Fase 7: Blog",
    description: "Frontend (Yan)",
    tasks: [
      { id: "f-7-1", title: "Página /blog", completed: false },
      { id: "f-7-2", title: "Página do artigo + Relacionados", completed: false },
    ],
  },
  {
    id: 8,
    title: "Fase 8: Mapa da Colônia",
    description: "Frontend (Yan)",
    tasks: [
      { id: "f-8-1", title: "Criar mapa (Leaflet)", completed: false },
      { id: "f-8-2", title: "Clusters + Tooltip", completed: false },
      { id: "f-8-3", title: "Click → página do módulo", completed: false },
    ],
  },
  {
    id: 9,
    title: "Fase 9: Utilidades em Tempo Real",
    description: "Frontend (Yan)",
    tasks: [
      { id: "f-9-1", title: "Tela da Ponte da Amizade", completed: false },
      { id: "f-9-2", title: "Tela do Câmbio com gráfico 7 dias", completed: false },
    ],
  },
];

const initialMvpPhases: Phase[] = [
  {
    id: 1,
    title: "Passo 1: Banco de Dados",
    description: "Drizzle + Supabase",
    tasks: [
      { id: "mvp-1-1", title: "Tabela orders (id, status, driver_id, location)", completed: false },
      { id: "mvp-1-2", title: "Tabela order_items e order_tracking", completed: false },
      { id: "mvp-1-3", title: "Habilitar Realtime no Supabase Dashboard", completed: false },
    ],
  },
  {
    id: 2,
    title: "Passo 2: Backend (Fase 3 Core)",
    description: "Migração tRPC & Lógica",
    tasks: [
      { id: "mvp-2-1", title: "Refatorar tRPC orders.create (usar Drizzle)", completed: false },
      { id: "mvp-2-2", title: "Endpoint updateStatus e updateLocation", completed: false },
      { id: "mvp-2-3", title: "Remover mocks em memória", completed: false },
    ],
  },
  {
    id: 3,
    title: "Passo 3: App do Entregador",
    description: "Funcionalidade Real",
    tasks: [
      { id: "mvp-3-1", title: "Login e Proteção de Rota (Driver)", completed: false },
      { id: "mvp-3-2", title: "Listar Pedidos 'ASSIGNED'", completed: false },
      { id: "mvp-3-3", title: "Capturar Geolocation (watchPosition)", completed: false },
      { id: "mvp-3-4", title: "Enviar updates para Supabase", completed: false },
    ],
  },
  {
    id: 4,
    title: "Passo 4: Cliente",
    description: "Integração Realtime",
    tasks: [
      { id: "mvp-4-1", title: "Substituir Polling por Supabase Channel", completed: false },
      { id: "mvp-4-2", title: "Atualizar TrackingMap via Socket", completed: false },
      { id: "mvp-4-3", title: "Feedback visual de status", completed: false },
    ],
  },
];

const Index = () => {
  // Separate states for modular management
  const [commonPhases, setCommonPhases] = useState<Phase[]>(() => {
    const saved = localStorage.getItem("brazukas-common-phases");
    return saved ? JSON.parse(saved) : initialCommonPhases;
  });

  const [backendPhases, setBackendPhases] = useState<Phase[]>(() => {
    const saved = localStorage.getItem("brazukas-backend-phases");
    return saved ? JSON.parse(saved) : initialBackendPhases;
  });

  const [frontendPhases, setFrontendPhases] = useState<Phase[]>(() => {
    const saved = localStorage.getItem("brazukas-frontend-phases");
    return saved ? JSON.parse(saved) : initialFrontendPhases;
  });

  const [mvpPhases, setMvpPhases] = useState<Phase[]>(() => {
    const saved = localStorage.getItem("brazukas-mvp-phases");
    return saved ? JSON.parse(saved) : initialMvpPhases;
  });

  // Effects for persistence
  useEffect(() => localStorage.setItem("brazukas-common-phases", JSON.stringify(commonPhases)), [commonPhases]);
  useEffect(() => localStorage.setItem("brazukas-backend-phases", JSON.stringify(backendPhases)), [backendPhases]);
  useEffect(() => localStorage.setItem("brazukas-frontend-phases", JSON.stringify(frontendPhases)), [frontendPhases]);
  useEffect(() => localStorage.setItem("brazukas-mvp-phases", JSON.stringify(mvpPhases)), [mvpPhases]);

  // Unified toggle handler factory
  const createToggleHandler = (setter: React.Dispatch<React.SetStateAction<Phase[]>>) =>
    (phaseId: number, taskId: string) => {
      setter(prev =>
        prev.map(p =>
          p.id === phaseId
            ? { ...p, tasks: p.tasks.map(t => (t.id === taskId ? { ...t, completed: !t.completed } : t)) }
            : p
        )
      );
    };

  const calculateProgress = (tasks: Task[]) => {
    if (tasks.length === 0) return 0;
    const completed = tasks.filter(t => t.completed).length;
    return Math.round((completed / tasks.length) * 100);
  };

  const totalMasterProgress = () => {
    const allTasks = [...commonPhases, ...backendPhases, ...frontendPhases].flatMap(p => p.tasks);
    return calculateProgress(allTasks);
  };

  const totalMvpProgress = () => calculateProgress(mvpPhases.flatMap(p => p.tasks));

  return (
    <div className="min-h-screen bg-background">
      <ProjectHeader totalProgress={totalMasterProgress()} />

      <main className="container mx-auto px-4 py-8 space-y-8">
        <Tabs defaultValue="master-backend" className="w-full">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
            <div className="overflow-x-auto w-full md:w-auto">
              <TabsList>
                <TabsTrigger value="master-common">Geral</TabsTrigger>
                <TabsTrigger value="master-backend">Backend</TabsTrigger>
                <TabsTrigger value="master-frontend">Frontend</TabsTrigger>
                <TabsTrigger value="mvp-tracking" className="text-blue-600 data-[state=active]:text-blue-700">MVP (29/12)</TabsTrigger>
              </TabsList>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground whitespace-nowrap">
              <span className="flex h-2 w-2 rounded-full bg-green-500" />
              System Online
            </div>
          </div>

          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 flex items-start gap-3 mb-8">
            <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">
                Prazo de Entrega Final: <span className="font-bold">30 de Dezembro de 2025</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Progresso Master (Global): {totalMasterProgress()}%
              </p>
            </div>
          </div>

          <TabsContent value="master-common" className="space-y-6 animate-in fade-in-50 duration-500">
            <h2 className="text-2xl font-bold tracking-tight">Fase 0: Organização & Base</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {commonPhases.map(phase => (
                <PhaseCard
                  key={phase.id}
                  phase={phase}
                  progress={calculateProgress(phase.tasks)}
                  onTaskToggle={createToggleHandler(setCommonPhases)}
                />
              ))}
            </div>
            <ScopeChangeNote />
          </TabsContent>

          <TabsContent value="master-backend" className="space-y-6 animate-in fade-in-50 duration-500">
            <h2 className="text-2xl font-bold tracking-tight text-indigo-600">Back-End Roadmap (Thálisson)</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {backendPhases.map(phase => (
                <PhaseCard
                  key={phase.id}
                  phase={phase}
                  progress={calculateProgress(phase.tasks)}
                  onTaskToggle={createToggleHandler(setBackendPhases)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="master-frontend" className="space-y-6 animate-in fade-in-50 duration-500">
            <h2 className="text-2xl font-bold tracking-tight text-pink-600">Front-End Roadmap (Yan)</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {frontendPhases.map(phase => (
                <PhaseCard
                  key={phase.id}
                  phase={phase}
                  progress={calculateProgress(phase.tasks)}
                  onTaskToggle={createToggleHandler(setFrontendPhases)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="mvp-tracking" className="space-y-8 animate-in fade-in-50 duration-500">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 flex items-start gap-3">
              <Rocket className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  Sprint MVP: Rastreamento em Tempo Real
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Deadline Imadiato: 29/12 | Foco na Fase 3 do Master
                </p>
                <div className="mt-2 w-full bg-blue-200/20 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-blue-500 h-full transition-all duration-500"
                    style={{ width: `${totalMvpProgress()}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Visão do Cliente (OrderPage)</h3>
                <TrackingMockup />
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Visão do Motorista (DriverApp)</h3>
                <DriverAppMockup />
              </div>
            </div>

            <HeaderMockup />

            <div className="grid md:grid-cols-2 gap-6 pt-4">
              {mvpPhases.map(phase => (
                <PhaseCard
                  key={phase.id}
                  phase={phase}
                  progress={calculateProgress(phase.tasks)}
                  onTaskToggle={createToggleHandler(setMvpPhases)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <CompetitorAnalysis />
      </main>
    </div>
  );
};

export default Index;
