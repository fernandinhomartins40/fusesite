import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Utensils, Stethoscope, Scissors, Wrench, ShoppingBag, Home } from "lucide-react";

const examples = [
  {
    icon: Utensils,
    name: "Sabor & Arte Restaurante",
    niche: "Restaurante",
    description: "Site para restaurante com cardápio digital e reservas online.",
    color: "from-orange-500 to-red-500"
  },
  {
    icon: Stethoscope,
    name: "Dra. Marina Cardoso",
    niche: "Clínica Médica",
    description: "Página profissional para clínica com agendamento de consultas.",
    color: "from-teal-500 to-cyan-500"
  },
  {
    icon: Scissors,
    name: "Studio Beleza & Estilo",
    niche: "Salão de Beleza",
    description: "Site moderno para salão com galeria de trabalhos e WhatsApp direto.",
    color: "from-pink-500 to-purple-500"
  },
  {
    icon: Wrench,
    name: "Auto Center Express",
    niche: "Oficina Mecânica",
    description: "Site para oficina com serviços e orçamentos online.",
    color: "from-blue-500 to-indigo-500"
  },
  {
    icon: ShoppingBag,
    name: "Moda Vista Boutique",
    niche: "Loja de Roupas",
    description: "Página elegante para loja com catálogo e link direto para compra.",
    color: "from-fuchsia-500 to-pink-500"
  },
  {
    icon: Home,
    name: "Construtora Horizonte",
    niche: "Arquitetura",
    description: "Site profissional para construtora com portfólio de projetos.",
    color: "from-emerald-500 to-teal-500"
  }
];

const ExamplesSection = () => {
  return (
    <section id="exemplos" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Exemplos de Sites que <span className="text-primary">Criamos</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Veja como diferentes negócios podem ter uma presença online profissional.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {examples.map((example, index) => (
            <Card 
              key={index} 
              className="group hover-lift overflow-hidden bg-card border-border/50"
            >
              {/* Preview mockup */}
              <div className={`h-40 bg-gradient-to-br ${example.color} relative overflow-hidden`}>
                <div className="absolute inset-4 bg-card/95 rounded-t-lg shadow-lg">
                  <div className="flex items-center gap-1.5 p-2 border-b border-border/50">
                    <div className="w-2 h-2 rounded-full bg-destructive/50" />
                    <div className="w-2 h-2 rounded-full bg-accent/50" />
                    <div className="w-2 h-2 rounded-full bg-primary/50" />
                  </div>
                  <div className="p-3 space-y-2">
                    <div className="h-2 bg-muted rounded w-3/4" />
                    <div className="h-2 bg-muted rounded w-1/2" />
                    <div className="flex gap-2 mt-3">
                      <div className="h-6 bg-primary/20 rounded flex-1" />
                      <div className="h-6 bg-accent/20 rounded flex-1" />
                    </div>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${example.color} flex items-center justify-center flex-shrink-0`}>
                    <example.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      {example.niche}
                    </span>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {example.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {example.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExamplesSection;
