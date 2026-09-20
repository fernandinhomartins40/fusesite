import { SearchX, TrendingDown, UserX } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const problems = [
  {
    icon: SearchX,
    title: "Clientes não te encontram no Google",
    description: "Enquanto você não está online, seus clientes estão pesquisando no Google e encontrando a concorrência."
  },
  {
    icon: TrendingDown,
    title: "Perder vendas para a concorrência online",
    description: "Empresas sem presença digital perdem até 80% das oportunidades de novos clientes por dia."
  },
  {
    icon: UserX,
    title: "Parecer menos profissional que competitors",
    description: "Clientes associam a ausência de um site profissional com falta de credibilidade e confiança."
  }
];

const ProblemsSection = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Por que sua empresa <span className="text-destructive">PRECISA</span> de uma Landing Page?
          </h2>
          <p className="text-lg text-muted-foreground">
            O mundo mudou. Seus clientes estão online. E você?
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <Card 
              key={index} 
              className="group hover-lift border-destructive/20 bg-card hover:border-destructive/50 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-destructive/20 transition-colors">
                  <problem.icon className="w-8 h-8 text-destructive" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">
                  {problem.title}
                </h3>
                <p className="text-muted-foreground">
                  {problem.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemsSection;
