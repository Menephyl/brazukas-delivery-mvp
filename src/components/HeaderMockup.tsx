import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Store, Truck } from "lucide-react";

export const HeaderMockup = () => {
  return (
    <Card className="border-2 border-accent/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="w-5 h-5 text-accent" />
          Mockup do Header da Aplicação
        </CardTitle>
        <CardDescription>
          Wireframe do header final com botões de login para Lojistas e Entregadores
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-card border-2 border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg">Brazukas Delivery</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Store className="w-4 h-4" />
                <span className="hidden sm:inline">Área do Restaurante</span>
                <span className="sm:hidden">Lojista</span>
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Truck className="w-4 h-4" />
                <span className="hidden sm:inline">Área do Entregador</span>
                <span className="sm:hidden">Entregador</span>
              </Button>
            </div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-3 text-center">
          Este é um wireframe estático. A implementação real será desenvolvida na Fase 3.
        </p>
      </CardContent>
    </Card>
  );
};
