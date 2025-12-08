import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation, Clock, Phone } from "lucide-react";

export const TrackingMockup = () => {
  return (
    <Card className="border-2 border-success/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-success" />
          Mockup: Rastreamento em Tempo Real
        </CardTitle>
        <CardDescription>
          Wireframe da tela de tracking do cliente (OrderPage.tsx)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Mapa Mockup */}
        <div className="bg-muted/50 border-2 border-border rounded-lg p-4 h-48 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="grid grid-cols-8 gap-1 h-full p-2">
              {Array.from({ length: 64 }).map((_, i) => (
                <div key={i} className="bg-border/50 rounded-sm" />
              ))}
            </div>
          </div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full">
            <Navigation className="w-10 h-10 text-primary animate-pulse" />
            <p className="text-xs text-muted-foreground mt-2">TrackingMap.tsx</p>
            <Badge variant="outline" className="mt-2 bg-success/10 text-success text-xs">
              Supabase Realtime
            </Badge>
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-card border rounded-lg p-3 text-center">
            <Clock className="w-5 h-5 mx-auto text-warning" />
            <p className="text-xs mt-1 font-medium">12 min</p>
            <p className="text-xs text-muted-foreground">Previsão</p>
          </div>
          <div className="bg-card border rounded-lg p-3 text-center">
            <MapPin className="w-5 h-5 mx-auto text-primary" />
            <p className="text-xs mt-1 font-medium">1.2 km</p>
            <p className="text-xs text-muted-foreground">Distância</p>
          </div>
          <div className="bg-card border rounded-lg p-3 text-center">
            <Phone className="w-5 h-5 mx-auto text-accent" />
            <p className="text-xs mt-1 font-medium">Contato</p>
            <p className="text-xs text-muted-foreground">Entregador</p>
          </div>
        </div>

        {/* Status Timeline */}
        <div className="border rounded-lg p-3 space-y-2">
          <p className="text-sm font-medium">Status do Pedido</p>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-success" />
            <span className="text-success">Pedido confirmado</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-success" />
            <span className="text-success">Em preparo</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
            <span className="text-primary font-medium">Saiu para entrega</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-muted" />
            <span className="text-muted-foreground">Entregue</span>
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          Deadline: 29/12 • Integração com Supabase Realtime + geolocation API
        </p>
      </CardContent>
    </Card>
  );
};
