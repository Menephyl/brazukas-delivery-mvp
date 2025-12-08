import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Truck, MapPin, Package, CheckCircle, Navigation } from "lucide-react";

export const DriverAppMockup = () => {
  return (
    <Card className="border-2 border-warning/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Truck className="w-5 h-5 text-warning" />
          Mockup: App do Entregador
        </CardTitle>
        <CardDescription>
          Wireframe da tela DriverAppPage.tsx com geolocation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Header do App */}
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-warning flex items-center justify-center">
              <Truck className="w-4 h-4 text-warning-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium">João Silva</p>
              <p className="text-xs text-muted-foreground">Online • GPS ativo</p>
            </div>
          </div>
          <Badge className="bg-success text-success-foreground">Ativo</Badge>
        </div>

        {/* Pedido Atual */}
        <div className="border-2 border-primary/30 rounded-lg p-3 space-y-3">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="bg-primary/10 text-primary">
              Pedido Atual
            </Badge>
            <span className="text-xs text-muted-foreground">#12345</span>
          </div>

          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <Package className="w-4 h-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Pizzaria Bella</p>
                <p className="text-xs text-muted-foreground">Rua das Flores, 123</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium">Cliente: Maria</p>
                <p className="text-xs text-muted-foreground">Av. Central, 456</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button size="sm" variant="outline" className="gap-1">
              <Navigation className="w-3 h-3" />
              Navegar
            </Button>
            <Button size="sm" className="gap-1 bg-success hover:bg-success/90">
              <CheckCircle className="w-3 h-3" />
              Entregar
            </Button>
          </div>
        </div>

        {/* Lista de Entregas Pendentes */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Próximas Entregas</p>
          {[1, 2].map((i) => (
            <div key={i} className="border rounded-lg p-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-xs font-medium">Pedido #{12346 + i}</p>
                  <p className="text-xs text-muted-foreground">2.3 km</p>
                </div>
              </div>
              <Badge variant="outline" className="text-xs">Aguardando</Badge>
            </div>
          ))}
        </div>

        <p className="text-xs text-muted-foreground text-center">
          watchPosition API + Supabase UPDATE em order_tracking
        </p>
      </CardContent>
    </Card>
  );
};
