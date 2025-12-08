import { useState, useEffect } from "react";
import { ProjectHeader } from "@/components/ProjectHeader";
import { PhaseCard } from "@/components/PhaseCard";
import { CompetitorAnalysis } from "@/components/CompetitorAnalysis";
import { ScopeChangeNote } from "@/components/ScopeChangeNote";
import { HeaderMockup } from "@/components/HeaderMockup";
import { TrackingMockup } from "@/components/TrackingMockup";
import { DriverAppMockup } from "@/components/DriverAppMockup";
import { AlertCircle, Target } from "lucide-react";
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

// MVP Rastreamento - Deadline 29/12
const trackingPhases: Phase[] = [
  {
    id: 1,
    title: "Passo 1: Banco de Dados",
    description: "Drizzle + Supabase",
    tasks: [
      { id: "t1-1", title: "Verificar/Criar tabela orders no Drizzle (id, restaurant_id, total, status, client_info, driver_id, driver_info, address)", completed: false },
      { id: "t1-2", title: "Verificar/Criar tabela order_items", completed: false },
      { id: "t1-3", title: "Criar tabela order_tracking (id, order_id, lat, lng, timestamp)", completed: false },
      { id: "t1-4", title: "Habilitar Realtime no Supabase para tabela orders", completed: false },
    ],
  },
  {
    id: 2,
    title: "Passo 2: Backend (tRPC)",
    description: "Migração de memória para Drizzle",
    tasks: [
      { id: "t2-1", title: "orders.create: INSERT real em orders + order_items", completed: false },
      { id: "t2-2", title: "orders.list / orders.get: SELECT do banco", completed: false },
      { id: "t2-3", title: "orders.updateStatus: UPDATE no banco", completed: false },
      { id: "t2-4", title: "Novo endpoint: updateLocation (ou via Supabase direto)", completed: false },
    ],
  },
  {
    id: 3,
    title: "Passo 3: App do Entregador",
    description: "DriverAppPage.tsx",
    tasks: [
      { id: "t3-1", title: "Proteger página (só motorista logado)", completed: false },
      { id: "t3-2", title: "Listar pedidos com status=ASSIGNED e driver_id=user.id", completed: false },
      { id: "t3-3", title: "Implementar navigator.geolocation.watchPosition", completed: false },
      { id: "t3-4", title: "Enviar updates para order_tracking ou campo location em orders", completed: false },
    ],
  },
  {
    id: 4,
    title: "Passo 4: Cliente (Tracking)",
    description: "OrderPage.tsx + Realtime",
    tasks: [
      { id: "t4-1", title: "Remover setInterval/polling atual", completed: false },
      { id: "t4-2", title: "Integrar supabase.channel('order-tracking') com postgres_changes", completed: false },
      { id: "t4-3", title: "Atualizar estado com payload.new (status + localização)", completed: false },
      { id: "t4-4", title: "Passar coordenadas em tempo real para TrackingMap.tsx", completed: false },
    ],
  },
];

// MVP Original - Deadline 30/12
const originalPhases: Phase[] = [
  {
    id: 1,
    title: "Fase 1: Fundação & Acesso",
    description: "Semanas 1-2",
    tasks: [
      { id: "1-1", title: "Schema users (com roles e passwordHash)", completed: false },
      { id: "1-2", title: "Schema merchants e drivers", completed: false },
      { id: "1-3", title: "Schema products e orders", completed: false },
      { id: "1-4", title: "Schema transactions (Log)", completed: false },
      { id: "1-5", title: "Rodar Migração Drizzle (DB pronto)", completed: false },
      { id: "1-6", title: "API: Cadastro (SignUp) Real (bcrypt)", completed: false },
      { id: "1-7", title: "API: Login (Login) Real (JWT)", completed: false },
      { id: "1-8", title: "API: Contexto tRPC (Middleware de Auth)", completed: false },
    ],
  },
  {
    id: 2,
    title: "Fase 2: Transação & Core",
    description: "Semanas 3-4",
    tasks: [
      { id: "2-1", title: "API: Criar Pedido (Drizzle INSERT real)", completed: false },
      { id: "2-2", title: "API: Gateway de Pagamento (Integração SDK)", completed: false },
      { id: "2-3", title: "API: Webhook de Pagamento (Confirmar 'pago')", completed: false },
      { id: "2-4", title: "API: Log de Transações (Registrar mudanças de status)", completed: false },
    ],
  },
  {
    id: 3,
    title: "Fase 3: Portais & Serviço",
    description: "Semanas 5-6",
    tasks: [
      { id: "3-1", title: "API: WebSockets (Socket.io) para status real-time", completed: false },
      { id: "3-2", title: "Front: Header com Login Lojista/Entregador", completed: false },
      { id: "3-3", title: "Front: Tela 'Painel do Lojista' (Ver/Aceitar Pedidos)", completed: false },
      { id: "3-4", title: "Front: Tela 'App do Entregador' (Ver/Aceitar Corridas)", completed: false },
    ],
  },
  {
    id: 4,
    title: "Fase 4: Lançamento & UI",
    description: "Final da Semana 6",
    tasks: [
      { id: "4-1", title: "Front: Integrar Checkout com API real", completed: false },
      { id: "4-2", title: "Infra: Deploy do Back-End (Railway/Render)", completed: false },
      { id: "4-3", title: "Infra: Deploy do Front-End (Vercel/Netlify)", completed: false },
      { id: "4-4", title: "Teste E2E: Fluxo de Pedido Completo (Cliente -> Loja -> Entregador)", completed: false },
    ],
  },
];

const Index = () => {
  const [trackingTasks, setTrackingTasks] = useState<Phase[]>(() => {
    const saved = localStorage.getItem("brazukas-tracking");
    return saved ? JSON.parse(saved) : trackingPhases;
  });

  const [phases, setPhases] = useState<Phase[]>(() => {
    const saved = localStorage.getItem("brazukas-phases");
    return saved ? JSON.parse(saved) : originalPhases;
  });

  useEffect(() => {
    localStorage.setItem("brazukas-phases", JSON.stringify(phases));
  }, [phases]);

  useEffect(() => {
    localStorage.setItem("brazukas-tracking", JSON.stringify(trackingTasks));
  }, [trackingTasks]);

  const handleTaskToggle = (phaseId: number, taskId: string) => {
    setPhases(prevPhases =>
      prevPhases.map(phase =>
        phase.id === phaseId
          ? {
              ...phase,
              tasks: phase.tasks.map(task =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
              ),
            }
          : phase
      )
    );
  };

  const handleTrackingTaskToggle = (phaseId: number, taskId: string) => {
    setTrackingTasks(prevPhases =>
      prevPhases.map(phase =>
        phase.id === phaseId
          ? {
              ...phase,
              tasks: phase.tasks.map(task =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
              ),
            }
          : phase
      )
    );
  };

  const calculateProgress = (tasks: Task[]) => {
    if (tasks.length === 0) return 0;
    const completed = tasks.filter(t => t.completed).length;
    return Math.round((completed / tasks.length) * 100);
  };

  const totalProgress = () => {
    const allTasks = phases.flatMap(p => p.tasks);
    return calculateProgress(allTasks);
  };

  const trackingProgress = () => {
    const allTasks = trackingTasks.flatMap(p => p.tasks);
    return calculateProgress(allTasks);
  };

  return (
    <div className="min-h-screen bg-background">
      <ProjectHeader totalProgress={totalProgress()} />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        <ScopeChangeNote />
        
        <Tabs defaultValue="tracking" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="tracking" className="gap-2">
              <Target className="w-4 h-4" />
              MVP Rastreamento (29/12)
            </TabsTrigger>
            <TabsTrigger value="original">
              MVP Completo (30/12)
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tracking" className="space-y-6 mt-6">
            {/* Deadline Alert - Tracking */}
            <div className="bg-success/10 border border-success/20 rounded-lg p-4 flex items-start gap-3">
              <Target className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  MVP Rastreamento: <span className="font-bold text-success">29 de Dezembro</span>
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Fase 3 do Roadmap Master: Tracking em tempo real. Progresso: {trackingProgress()}%
                </p>
              </div>
            </div>

            {/* Mockups */}
            <div className="grid md:grid-cols-2 gap-6">
              <TrackingMockup />
              <DriverAppMockup />
            </div>

            {/* Tasks */}
            <div className="grid md:grid-cols-2 gap-6">
              {trackingTasks.map(phase => (
                <PhaseCard
                  key={phase.id}
                  phase={phase}
                  progress={calculateProgress(phase.tasks)}
                  onTaskToggle={handleTrackingTaskToggle}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="original" className="space-y-6 mt-6">
            {/* Deadline Alert - Original */}
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  Prazo de Entrega: <span className="font-bold">30 de Dezembro de 2025</span>
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  MVP completo em 6 semanas. Progresso total: {totalProgress()}%
                </p>
              </div>
            </div>

            <HeaderMockup />

            <div className="grid md:grid-cols-2 gap-6">
              {phases.map(phase => (
                <PhaseCard
                  key={phase.id}
                  phase={phase}
                  progress={calculateProgress(phase.tasks)}
                  onTaskToggle={handleTaskToggle}
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
