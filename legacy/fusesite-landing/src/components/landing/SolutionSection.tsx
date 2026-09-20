import { Globe, Search, TrendingUp, Sparkles } from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "Presença Digital 24/7",
    description: "Sua empresa disponível para clientes a qualquer hora, todos os dias."
  },
  {
    icon: Search,
    title: "Apareça no Google",
    description: "Otimização SEO para que clientes te encontrem nas pesquisas."
  },
  {
    icon: TrendingUp,
    title: "Investimento, Não Custo",
    description: "Cada real investido retorna em forma de novos clientes e vendas."
  },
  {
    icon: Sparkles,
    title: "Credibilidade Instantânea",
    description: "Profissionalismo que gera confiança e fecha mais negócios."
  }
];

const SolutionSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Estar Online <span className="text-primary">Nunca Foi Tão Fácil</span> e Acessível
          </h2>
          <p className="text-lg text-muted-foreground">
            Com a Fuse, você tem uma landing page profissional em dias, não meses.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group text-center p-6 rounded-2xl hover:bg-card transition-all duration-300 hover-lift"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
