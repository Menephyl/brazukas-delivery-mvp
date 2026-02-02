import { useState, useEffect } from "react";
import { PhaseCard } from "@/components/PhaseCard";
import { CompetitorAnalysis } from "@/components/CompetitorAnalysis";
import { ScopeChangeNote } from "@/components/ScopeChangeNote";
import { HeaderMockup } from "@/components/HeaderMockup";
import { TrackingMockup } from "@/components/TrackingMockup";
import { DriverAppMockup } from "@/components/DriverAppMockup";
import { AlertCircle, Rocket, Package } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProgressTracker } from "@/components/dashboard/ProgressTracker";
import { SystemHealthMonitor } from "@/components/dashboard/SystemHealthMonitor";
import { LogIntegracao } from "@/components/dashboard/LogIntegracao";

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
      { id: "g-1-2", title: "Definir Personas (Cliente, Entregador, Admin, Lojista)", completed: true },
      { id: "g-1-3", title: "Listar Features Chave (Login, Busca, Carrinho, Histórico, Notificações)", completed: true },
    ],
  },
  {
    id: 8,
    title: "Fase 8: Deploy e Lançamento",
    description: "Aguardando",
    status: "waiting",
    tasks: [
      { id: "g-8-1", title: "Configurar Ambientes (Dev/Staging/Prod)", completed: false },
      { id: "g-8-2", title: "Hospedagem Hostinger e Domínio", completed: false },
    ],
  },
  {
    id: 9,
    title: "Fase 9: Manutenção",
    description: "Pós-Lançamento",
    status: "waiting",
    tasks: [
      { id: "g-9-1", title: "Monitoramento e Analytics", completed: false },
      { id: "g-9-2", title: "Análise e melhorias para a versão 2 do projeto", completed: false },
      { id: "g-9-3", title: "SEO e Marketing", completed: false },
      { id: "g-9-4", title: "Extra: Rastreamento em Tempo Real (Futuro)", completed: false },
    ],
  },
];

const initialFrontendPhases: Phase[] = [
  {
    id: 2,
    title: "Fase 2: Design UI/UX",
    description: "Concluída (100%)",
    status: "done",
    tasks: [
      { id: "f-2-1", title: "Wireframes (Home, Carrinho, Login, Histórico, Mapa, Notificações)", completed: true },
      { id: "f-2-2", title: "Wireframes (Restaurantes, Detalhes, cupons)", completed: true },
      { id: "f-2-2", title: "Wireframes (Checkout, Pagamento, Entrega)", completed: true },
      { id: "f-2-2", title: "Identidade Visual e Acessibilidade", completed: true },
      { id: "f-2-3", title: "Protótipos Interativos (Wouter)", completed: true },
      { id: "f-2-4", title: "Refatoração com UI Kit Oficial", completed: false },
    ],
  },
  {
    id: 3,
    title: "Fase 3: Desenvolvimento Frontend",
    description: "Em Desenvolvimento (70%)",
    status: "in-progress",
    tasks: [
      { id: "f-3-1", title: "Responsividade de wireframes - Home (Busca, Categorias, Cards)", completed: true },
      { id: "f-3-2", title: "Responsividade de wireframes - Restaurantes (Listagem e Detalhes)", completed: true },
      { id: "f-3-3", title: "Responsividade de wireframes - Checkout, Pagamento, Entrega", completed: true },
      { id: "f-3-4", title: "Interface de Autenticação (Modais)", completed: true },
      { id: "f-3-5", title: "Responsividade de wireframes - Carrinho", completed: true },
      { id: "f-3-6", title: "Checkout e Confirmação de Pedido", completed: false },
    ],
  },
  {
    id: 6,
    title: "Fase 6-F: Delivery & Tracking (UI)",
    description: "Próximas Etapas",
    status: "pending",
    tasks: [
      { id: "f-6-1", title: "Rastreamento Padrão (Status manual pelo restaurante)", completed: false },
      { id: "f-6-2", title: "Push Notifications de Status", completed: false },
      { id: "f-6-3", title: "Página de Histórico do Cliente", completed: false },
    ],
  },
];

const initialBackendPhases: Phase[] = [
  {
    id: 4,
    title: "Fase 4: Desenvolvimento Backend",
    description: "Em Progresso (50%)",
    status: "in-progress",
    tasks: [
      { id: "b-4-1", title: "Setup (GitHub, Docker, Express)", completed: true },
      { id: "b-4-2", title: "Database Seeding (Lojas e Produtos)", completed: true },
      { id: "b-4-3", title: "API CRUD Lojas/Restaurantes", completed: true },
      { id: "b-4-4", title: "Lógica de Autenticação JWT", completed: false },
      { id: "b-4-5", title: "Gestão de Pedidos (Order Flow)", completed: false },
    ],
  },
  {
    id: 5,
    title: "Fase 5: Banco de Dados",
    description: "Em Modelagem",
    status: "in-progress",
    tasks: [
      { id: "b-5-1", title: "Modelagem PostgreSQL (Lojas e Produtos)", completed: true },
      { id: "b-5-2", title: "Tabelas de Usuários e Perfis", completed: false },
      { id: "b-5-3", title: "Tabelas de Pedidos e Rastreamento", completed: false },
    ],
  },
  {
    id: 6,
    title: "Fase 6-B: Delivery & Tracking (API)",
    description: "Aguardando",
    status: "waiting",
    tasks: [
      { id: "b-6-1", title: "Websockets para Rastreamento Realtime", completed: false },
      { id: "b-6-2", title: "Integração Geolocalização (PostGIS/Distance)", completed: false },
      { id: "b-6-3", title: "Gateway de Pagamento (Mock/PIX)", completed: false },
    ],
  },
];

const initialMvpPhases: Phase[] = [
  {
    id: 1,
    title: "Mockups e Protótipos",
    description: "Design e Wireframes",
    tasks: [
      { id: "mock-1", title: "Mockup do Header (Lojista/Entregador)", completed: true },
      { id: "mock-2", title: "Mockup de Rastreamento (Mapa)", completed: true },
      { id: "mock-3", title: "Mockup do App do Entregador", completed: true },
    ],
  },
  {
    id: 2,
    title: "Passo 1: Banco de Dados",
    description: "PostgreSQL + Docker",
    tasks: [
      { id: "mvp-1-1", title: "Tabela lojas (id, nome, status, local)", completed: true },
      { id: "mvp-1-2", title: "Tabela produtos e categorias", completed: true },
      { id: "mvp-1-3", title: "Setup Docker Compose DB", completed: true },
    ],
  },
  {
    id: 3,
    title: "Passo 2: Backend (Order Flow)",
    description: "Express & Logica",
    tasks: [
      { id: "mvp-2-1", title: "Endpoint de criação de pedido", completed: false },
      { id: "mvp-2-2", title: "Sistema de mudança de status (Wait -> Picking -> Shipping)", completed: false },
      { id: "mvp-2-3", title: "Integração Realtime (Socket.io)", completed: false },
    ],
  },
  {
    id: 4,
    title: " EXTRA! Passo 3: App do Entregador",
    description: "Funcionalidade Real",
    tasks: [
      { id: "mvp-3-1", title: "Interface de aceite de corrida", completed: false },
      { id: "mvp-3-2", title: "API de atualização de geolocalização", completed: false },
      { id: "mvp-3-3", title: "Finalização de pedido via app", completed: false },
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

  const handleToggleWithPassword = (setter: React.Dispatch<React.SetStateAction<Phase[]>>) =>
    (phaseId: number, taskId: string) => {
      const password = prompt("Digite a senha de administrador para alterar o status:");

      if (!password) return;

      if (password === "yan123") {
        alert("Olá Yan! Atualizando o progresso...");
      } else if (password === "thalisson123") {
        alert("Olá Thálisson! Atualizando o progresso...");
      } else {
        alert("Senha incorreta!");
        return;
      }

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
    <div className="min-h-screen bg-[#0c0c0c] text-slate-200">
      {/* Header Section */}
      <header className="border-b border-white/5 bg-[#111111]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
              <Package className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">Brazukas Engineering Center</h1>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <p className="text-xs text-emerald-500/80 font-mono font-medium">v1.0.0 // Phase 2: Refinement</p>
              </div>
            </div>
          </div>
          <SystemHealthMonitor />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* 1. Visão Geral (360) */}
        <ProgressTracker />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Roadmap & Tracks (2/3) */}
          <div className="lg:col-span-2 space-y-8">
            <Tabs defaultValue="frontend" className="w-full">
              <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
                <div className="overflow-x-auto w-full md:w-auto">
                  <TabsList className="bg-[#161616] border border-white/5 text-slate-400">
                    <TabsTrigger value="general" className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-500">Geral</TabsTrigger>
                    <TabsTrigger value="frontend" className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-500">Frontend</TabsTrigger>
                    <TabsTrigger value="backend" className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-500">Backend</TabsTrigger>
                    <TabsTrigger value="mvp-tracking" className="text-blue-400 data-[state=active]:text-blue-400 data-[state=active]:bg-blue-500/20">Backend Integration</TabsTrigger>
                  </TabsList>
                </div>
              </div>

              <TabsContent value="general" className="space-y-6 animate-in fade-in-50 duration-500">
                <h2 className="text-2xl font-bold tracking-tight text-white">Visão Geral Completa</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Combine all phases for the General View, sorted by ID */}
                  {[
                    ...generalPhases.map(p => ({ phase: p, setter: setGeneralPhases })),
                    ...frontendPhases.map(p => ({ phase: p, setter: setFrontendPhases })),
                    ...backendPhases.map(p => ({ phase: p, setter: setBackendPhases }))
                  ]
                    .sort((a, b) => a.phase.id - b.phase.id) // Sort by Phase ID
                    .map(({ phase, setter }) => (
                      <PhaseCard
                        key={phase.id}
                        phase={phase}
                        progress={calculateProgress(phase.tasks)}
                        onTaskToggle={handleToggleWithPassword(setter)}
                        className="bg-[#161616] border-white/5"
                      />
                    ))}
                </div>
                <ScopeChangeNote />
              </TabsContent>

              <TabsContent value="frontend" className="space-y-6 animate-in fade-in-50 duration-500">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold tracking-tight text-pink-500">Frontend Roadmap</h2>
                  <div className="text-sm text-slate-400">
                    Foco: <span className="font-semibold text-emerald-400">Fase 3 - Visual / Interação</span>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Show Phase 1 (from General) in Frontend as requested */}
                  {generalPhases.filter(p => p.id === 1).map(phase => (
                    <PhaseCard
                      key={phase.id}
                      phase={phase}
                      progress={calculateProgress(phase.tasks)}
                      onTaskToggle={handleToggleWithPassword(setGeneralPhases)}
                      className="bg-[#161616] border-white/5 opacity-80" // Slightly dimmed to show it's shared/foundational
                    />
                  ))}

                  {frontendPhases.map(phase => (
                    <PhaseCard
                      key={phase.id}
                      phase={phase}
                      progress={calculateProgress(phase.tasks)}
                      onTaskToggle={handleToggleWithPassword(setFrontendPhases)}
                      className="bg-[#161616] border-white/5"
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="backend" className="space-y-6 animate-in fade-in-50 duration-500">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold tracking-tight text-indigo-500">Backend Roadmap</h2>
                  <div className="text-sm text-slate-400">
                    Foco: <span className="font-semibold text-emerald-400">Fase 4 - API / Regras</span>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {backendPhases.map(phase => (
                    <PhaseCard
                      key={phase.id}
                      phase={phase}
                      progress={calculateProgress(phase.tasks)}
                      onTaskToggle={handleToggleWithPassword(setBackendPhases)}
                      className="bg-[#161616] border-white/5"
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="mvp-tracking" className="space-y-8 animate-in fade-in-50 duration-500">
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 flex items-start gap-4">
                  <div className="p-3 bg-blue-500/20 rounded-full">
                    <Rocket className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-white">Integração: Backend Core</h3>
                        <p className="text-sm text-slate-400 mt-1">
                          Status: Conectando Frontend ao API Gateway
                        </p>
                      </div>
                      <span className="text-2xl font-bold text-blue-400">{totalMvpProgress()}%</span>
                    </div>
                    <div className="mt-4 w-full bg-blue-900/40 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-blue-500 h-full transition-all duration-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                        style={{ width: `${totalMvpProgress()}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-white">Visão do Cliente (OrderPage)</h3>
                    <TrackingMockup />
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-white">Visão do Motorista (DriverApp)</h3>
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
                      onTaskToggle={handleToggleWithPassword(setMvpPhases)}
                      className="bg-[#161616] border-white/5"
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column: Live Logs & Info (1/3) */}
          <div className="space-y-6">
            <LogIntegracao />

            <div className="bg-[#161616] border border-white/5 rounded-xl p-6">
              <h3 className="text-sm font-medium text-white mb-4 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-500" />
                Deadlines Técnicos
              </h3>

              <div className="space-y-4">
                <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                  <p className="text-xs text-gray-400 mb-1">Próximo Milestone</p>
                  <p className="text-sm font-semibold text-white">Refatoração B2B (Fev/2026)</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                  <p className="text-xs text-gray-400 mb-1">Progresso Master (Global)</p>
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-bold text-white">{totalMasterProgress()}%</p>
                    <span className="text-xs text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded">+2% essa semana</span>
                  </div>
                </div>
              </div>
            </div>

            <CompetitorAnalysis className="bg-[#161616] border-white/5" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
