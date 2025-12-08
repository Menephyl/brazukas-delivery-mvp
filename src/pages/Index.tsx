import { useState, useEffect } from "react";
import { ProjectHeader } from "@/components/ProjectHeader";
import { PhaseCard } from "@/components/PhaseCard";
import { CompetitorAnalysis } from "@/components/CompetitorAnalysis";
import { ScopeChangeNote } from "@/components/ScopeChangeNote";
import { HeaderMockup } from "@/components/HeaderMockup";
import { AlertCircle } from "lucide-react";

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

const initialPhases: Phase[] = [
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
  const [phases, setPhases] = useState<Phase[]>(() => {
    const saved = localStorage.getItem("brazukas-phases");
    return saved ? JSON.parse(saved) : initialPhases;
  });

  useEffect(() => {
    localStorage.setItem("brazukas-phases", JSON.stringify(phases));
  }, [phases]);

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

  const calculateProgress = (tasks: Task[]) => {
    if (tasks.length === 0) return 0;
    const completed = tasks.filter(t => t.completed).length;
    return Math.round((completed / tasks.length) * 100);
  };

  const totalMasterProgress = () => {
    const allTasks = [...commonPhases, ...backendPhases, ...frontendPhases].flatMap(p => p.tasks);
    return calculateProgress(allTasks);
  };

  return (
    <div className="min-h-screen bg-background">
      <ProjectHeader totalProgress={totalMasterProgress()} />

      <main className="container mx-auto px-4 py-8 space-y-8">
        <ScopeChangeNote />

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

        <CompetitorAnalysis />
      </main>
    </div>
  );
};

export default Index;
