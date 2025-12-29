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
  status?: "done" | "in-progress" | "pending" | "waiting";
}

const initialGeneralPhases: Phase[] = [
  {
    id: 1,
    title: "Fase 1: Planejamento e Requisitos",
    description: "Concluída (100%)",
    status: "done",
    tasks: [
      { id: "g-1-1", title: "Definir Escopo: Funcionalidades Home/Restaurantes", completed: true },
      { id: "g-1-2", title: "Definir Personas (Cliente, Entregador, Admin)", completed: true },
      { id: "g-1-3", title: "Listar Features Chave (Login, Busca, Carrinho)", completed: true },
    ],
  },
  {
    id: 8,
    title: "Fase 8: Deploy e Lançamento",
    description: "Aguardando",
    status: "waiting",
    tasks: [
      { id: "g-8-1", title: "Configurar Ambientes (Dev/Staging/Prod)", completed: false },
      { id: "g-8-2", title: "Hospedagem (Vercel/Render) e Domínio", completed: false },
      { id: "g-8-3", title: "CI/CD Pipeline", completed: false },
    ],
  },
  {
    id: 9,
    title: "Fase 9: Manutenção",
    description: "Pós-Lançamento",
    status: "waiting",
    tasks: [
      { id: "g-9-1", title: "Monitoramento e Analytics", completed: false },
      { id: "g-9-2", title: "SEO e Marketing", completed: false },
    ],
  },
];

const initialFrontendPhases: Phase[] = [
  {
    id: 2,
    title: "Fase 2: Design UI/UX",
    description: "Concluída (90%)",
    status: "done",
    tasks: [
      { id: "f-2-1", title: "Wireframes (Home, Carrinho, Login)", completed: true },
      { id: "f-2-2", title: "Identidade Visual e Acessibilidade", completed: true },
      { id: "f-2-3", title: "Protótipos Interativos", completed: true },
    ],
  },
  {
    id: 3,
    title: "Fase 3: Desenvolvimento Frontend",
    description: "Foco Imediato",
    status: "pending",
    tasks: [
      { id: "f-3-1", title: "Home (Busca, Categorias, Cards)", completed: false },
      { id: "f-3-2", title: "Página Restaurantes (Detalhes, Produtos)", completed: false },
      { id: "f-3-3", title: "Carrinho, Checkout e Histórico", completed: false },
      { id: "f-3-4", title: "Autenticação (Login, Registro)", completed: false },
      { id: "f-3-5", title: "Responsividade e Interações", completed: false },
    ],
  },
  {
    id: 6,
    title: "Fase 6-F: Integrações UI",
    description: "Aguardando",
    status: "waiting",
    tasks: [
      { id: "f-6-1", title: "Mapas Interativos (Leaflet)", completed: false },
      { id: "f-6-2", title: "Feedback Visual de Pagamento", completed: false },
    ],
  },
  {
    id: 7,
    title: "Fase 7-F: Testes Frontend",
    description: "Aguardando",
    status: "waiting",
    tasks: [
      { id: "f-7-1", title: "Testes Manuais (Cross-Browser)", completed: false },
      { id: "f-7-2", title: "Performance (Lighthouse)", completed: false },
    ],
  },
];

const initialBackendPhases: Phase[] = [
  {
    id: 4,
    title: "Fase 4: Desenvolvimento Backend",
    description: "Em Progresso (40%)",
    status: "in-progress",
    tasks: [
      { id: "b-4-1", title: "Setup (GitHub, Docker, Linter)", completed: true },
      { id: "b-4-2", title: "API Autenticação (JWT)", completed: false },
      { id: "b-4-3", title: "API Produtos e Restaurantes (CRUD)", completed: false },
      { id: "b-4-4", title: "Lógica de Frete e Estoque", completed: false },
      { id: "b-4-5", title: "Segurança e Proteção de Rotas", completed: false },
    ],
  },
  {
    id: 5,
    title: "Fase 5: Banco de Dados",
    description: "Aguardando",
    status: "waiting",
    tasks: [
      { id: "b-5-1", title: "Modelagem (Users, Products, Orders)", completed: false },
      { id: "b-5-2", title: "Consultas e Migrations", completed: false },
      { id: "b-5-3", title: "Backup e Escalabilidade", completed: false },
    ],
  },
  {
    id: 6,
    title: "Fase 6-B: Integrações API",
    description: "Aguardando",
    status: "waiting",
    tasks: [
      { id: "b-6-1", title: "Gateway de Pagamento (PIX)", completed: false },
      { id: "b-6-2", title: "Serviço de Geolocalização", completed: false },
      { id: "b-6-3", title: "Serviço de Notificações (Email)", completed: false },
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
  const [generalPhases, setGeneralPhases] = useState<Phase[]>(() => {
    const saved = localStorage.getItem("brazukas-phases-general");
    return saved ? JSON.parse(saved) : initialGeneralPhases;
  });

  const [frontendPhases, setFrontendPhases] = useState<Phase[]>(() => {
    const saved = localStorage.getItem("brazukas-phases-frontend");
    return saved ? JSON.parse(saved) : initialFrontendPhases;
  });

  const [backendPhases, setBackendPhases] = useState<Phase[]>(() => {
    const saved = localStorage.getItem("brazukas-phases-backend");
    return saved ? JSON.parse(saved) : initialBackendPhases;
  });

  const [mvpPhases, setMvpPhases] = useState<Phase[]>(() => {
    const saved = localStorage.getItem("brazukas-mvp-phases");
    return saved ? JSON.parse(saved) : initialMvpPhases;
  });

  useEffect(() => localStorage.setItem("brazukas-phases-general", JSON.stringify(generalPhases)), [generalPhases]);
  useEffect(() => localStorage.setItem("brazukas-phases-frontend", JSON.stringify(frontendPhases)), [frontendPhases]);
  useEffect(() => localStorage.setItem("brazukas-phases-backend", JSON.stringify(backendPhases)), [backendPhases]);
  useEffect(() => localStorage.setItem("brazukas-mvp-phases", JSON.stringify(mvpPhases)), [mvpPhases]);

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
    const allTasks = [...generalPhases, ...frontendPhases, ...backendPhases].flatMap(p => p.tasks);
    return calculateProgress(allTasks);
  };

  const totalMvpProgress = () => calculateProgress(mvpPhases.flatMap(p => p.tasks));

  return (
    <div className="min-h-screen bg-background">
      <ProjectHeader totalProgress={totalMasterProgress()} />

      <main className="container mx-auto px-4 py-8 space-y-8">
        <Tabs defaultValue="frontend" className="w-full">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
            <div className="overflow-x-auto w-full md:w-auto">
              <TabsList>
                <TabsTrigger value="general">Geral</TabsTrigger>
                <TabsTrigger value="frontend">Frontend</TabsTrigger>
                <TabsTrigger value="backend">Backend</TabsTrigger>
                <TabsTrigger value="mvp-tracking" className="text-blue-600 data-[state=active]:text-blue-700">Sprint MVP (29/12)</TabsTrigger>
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

          <TabsContent value="general" className="space-y-6 animate-in fade-in-50 duration-500">
            <h2 className="text-2xl font-bold tracking-tight">Planejamento & Deploy</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {generalPhases.map(phase => (
                <PhaseCard
                  key={phase.id}
                  phase={phase}
                  progress={calculateProgress(phase.tasks)}
                  onTaskToggle={createToggleHandler(setGeneralPhases)}
                />
              ))}
            </div>
            <ScopeChangeNote />
          </TabsContent>

          <TabsContent value="frontend" className="space-y-6 animate-in fade-in-50 duration-500">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight text-pink-600">Frontend Roadmap</h2>
              <div className="text-sm text-muted-foreground">
                Foco: <span className="font-semibold text-primary">Fase 3 - Visual / Interação</span>
              </div>
            </div>
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

          <TabsContent value="backend" className="space-y-6 animate-in fade-in-50 duration-500">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight text-indigo-600">Backend Roadmap</h2>
              <div className="text-sm text-muted-foreground">
                Foco: <span className="font-semibold text-primary">Fase 4 - API / Regras</span>
              </div>
            </div>
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

          <TabsContent value="mvp-tracking" className="space-y-8 animate-in fade-in-50 duration-500">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 flex items-start gap-3">
              <Rocket className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  Sprint MVP: Rastreamento em Tempo Real
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Deadline Imediato: 29/12 | Foco na Fase 3 do Master
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
