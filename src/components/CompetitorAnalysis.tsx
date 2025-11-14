import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, TrendingUp } from "lucide-react";

const competitors = [
  { name: "iFood", url: "https://www.ifood.com.br", color: "bg-red-500" },
  { name: "Aiqfome", url: "https://www.aiqfome.com", color: "bg-orange-500" },
  { name: "Rappi", url: "https://www.rappi.com.br", color: "bg-orange-600" },
  { name: "Uber Eats", url: "https://www.ubereats.com/br", color: "bg-green-600" },
  { name: "99Food", url: "https://99food.com.br", color: "bg-yellow-500" },
];

export const CompetitorAnalysis = () => {
  return (
    <Card className="border-2 border-primary/20">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          <CardTitle>Análise Competitiva</CardTitle>
        </div>
        <CardDescription>
          Links para análise de mercado e benchmarking de funcionalidades
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {competitors.map(competitor => (
            <Button
              key={competitor.name}
              variant="outline"
              className="justify-between h-auto py-4"
              asChild
            >
              <a href={competitor.url} target="_blank" rel="noopener noreferrer">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${competitor.color}`} />
                  <span className="font-medium">{competitor.name}</span>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
              </a>
            </Button>
          ))}
        </div>
        <div className="mt-4 p-3 bg-muted rounded-lg">
          <p className="text-xs text-muted-foreground">
            <strong>Dica:</strong> Analise fluxos de usuário, features principais, e UX/UI para
            identificar melhores práticas e oportunidades de diferenciação.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
