import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

export const ScopeChangeNote = () => {
  return (
    <Alert variant="destructive" className="border-2">
      <AlertTriangle className="h-5 w-5" />
      <AlertDescription className="font-medium">
        <strong>Regra de Mudança de Escopo:</strong> Para manter o prazo e a qualidade, 
        toda alteração de escopo deve ser formalmente solicitada e aprovada neste painel. 
        Mudanças não documentadas podem comprometer a entrega de 30/12.
      </AlertDescription>
    </Alert>
  );
};
