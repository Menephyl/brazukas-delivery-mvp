import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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

interface PhaseCardProps {
  phase: Phase;
  progress: number;
  onTaskToggle: (phaseId: number, taskId: string) => void;
  className?: string;
}

export const PhaseCard = ({ phase, progress, onTaskToggle, className }: PhaseCardProps) => {
  const getProgressColor = (progress: number) => {
    if (progress === 0) return "text-muted-foreground";
    if (progress < 50) return "text-destructive";
    if (progress < 100) return "text-warning";
    return "text-success";
  };

  const getPhaseColor = (phaseId: number) => {
    switch (phaseId) {
      case 1: return "bg-primary/10 text-primary border-primary/20";
      case 2: return "bg-accent/10 text-accent border-accent/20";
      case 3: return "bg-warning/10 text-warning border-warning/20";
      case 4: return "bg-success/10 text-success border-success/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className={cn("transition-all hover:shadow-lg border-2", className)}>
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <Badge variant="outline" className={getPhaseColor(phase.id)}>
            Fase {phase.id}
          </Badge>
          <span className={`text-2xl font-bold ${getProgressColor(progress)}`}>
            {progress}%
          </span>
        </div>
        <CardTitle className="text-xl text-white">{phase.title}</CardTitle>
        <CardDescription className="text-base text-slate-400">{phase.description}</CardDescription>
        <Progress value={progress} className="mt-3 h-2" />
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {phase.tasks.map(task => (
            <div
              key={task.id}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
            >
              <Checkbox
                id={task.id}
                checked={task.completed}
                onCheckedChange={() => onTaskToggle(phase.id, task.id)}
                className="mt-0.5 border-white/20 data-[state=checked]:bg-emerald-500 data-[state=checked]:text-white"
              />
              <label
                htmlFor={task.id}
                className={`text-sm flex-1 cursor-pointer ${task.completed ? "line-through text-slate-500" : "text-slate-300"
                  }`}
              >
                {task.title}
              </label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
