import { Progress } from "@/components/ui/progress";
import { Package } from "lucide-react";

interface ProjectHeaderProps {
  totalProgress: number;
}

export const ProjectHeader = ({ totalProgress }: ProjectHeaderProps) => {
  return (
    <header className="border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/95">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Brazukas Delivery MVP</h1>
              <p className="text-sm text-muted-foreground">Painel de Acompanhamento do Projeto</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Progresso Total</p>
              <p className="text-2xl font-bold text-primary">{totalProgress}%</p>
            </div>
          </div>
        </div>
        <Progress value={totalProgress} className="h-2" />
      </div>
    </header>
  );
};
