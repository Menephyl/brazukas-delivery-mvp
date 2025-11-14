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

  const totalProgress = () => {
    const allTasks = phases.flatMap(p => p.tasks);
    return calculateProgress(allTasks);
  };

  return (
    <div className="min-h-screen bg-background">
      <ProjectHeader totalProgress={totalProgress()} />
      
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
