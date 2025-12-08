import { MapPin, Package, Navigation2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const DriverAppMockup = () => {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Navigation2 className="w-5 h-5 text-blue-500" />
                    App do Entregador
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Status Header */}
                <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                    <span className="text-green-700 font-medium text-sm">Online</span>
                    <Badge variant="outline" className="bg-background">GPS Ativo</Badge>
                </div>

                {/* Active Order */}
                <div className="border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-start">
                        <div>
                            <h4 className="font-semibold">Pedido #4829</h4>
                            <p className="text-sm text-muted-foreground">Restaurante do Zé</p>
                        </div>
                        <Badge>R$ 15,90</Badge>
                    </div>

                    <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                            <span>Rua das Flores, 123 - Centro</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <Package className="w-4 h-4 text-muted-foreground mt-0.5" />
                            <span>2x X-Bacon, 1x Cola</span>
                        </div>
                    </div>

                    <div className="pt-2 grid grid-cols-2 gap-2">
                        <Button variant="outline" size="sm">Recusar</Button>
                        <Button size="sm">Aceitar Corrida</Button>
                    </div>
                </div>

                {/* Location Simulation */}
                <div className="text-xs text-center text-muted-foreground">
                    <p>Localização atual: -23.5505, -46.6333</p>
                    <p>Atualizando em tempo real...</p>
                </div>
            </CardContent>
        </Card>
    );
};
