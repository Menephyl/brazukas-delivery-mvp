import { MapPin, Navigation, Clock, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export const TrackingMockup = () => {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Navigation className="w-5 h-5 text-primary" />
                    Acompanhamento em Tempo Real
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Map Placeholder */}
                <div className="bg-muted aspect-video rounded-lg flex items-center justify-center relative overflow-hidden border">
                    <div className="absolute inset-0 bg-[url('https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/15/9643/12321.png')] bg-cover opacity-50" />
                    <div className="relative flex flex-col items-center gap-2">
                        <MapPin className="w-8 h-8 text-primary animate-bounce" />
                        <span className="bg-background/80 px-2 py-1 rounded text-xs font-medium backdrop-blur">
                            Entregador próximo
                        </span>
                    </div>
                </div>

                {/* Status Steps */}
                <div className="space-y-4">
                    <div className="flex justify-between text-sm font-medium">
                        <span>Preparando</span>
                        <span className="text-primary">A caminho</span>
                        <span className="text-muted-foreground">Entregue</span>
                    </div>
                    <Progress value={66} className="h-2" />
                </div>

                {/* Driver Info */}
                <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="font-bold text-primary">CD</span>
                    </div>
                    <div className="flex-1">
                        <p className="font-medium">Carlos Driver</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            <span>Chega em 5 min</span>
                        </div>
                    </div>
                    <button className="p-2 hover:bg-background rounded-full transition-colors">
                        <Phone className="w-4 h-4" />
                    </button>
                </div>
            </CardContent>
        </Card>
    );
};
