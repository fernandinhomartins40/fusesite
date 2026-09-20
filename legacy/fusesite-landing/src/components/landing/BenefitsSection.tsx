import { Search, Award, Clock, Users, Wallet, HeadphonesIcon } from "lucide-react";

const benefits = [
  {
    icon: Search,
    title: "Aparecer no Google",
    description: "SEO otimizado para você ser encontrado nas pesquisas."
  },
  {
    icon: Award,
    title: "Profissionalismo",
    description: "Transmita credibilidade e confiança para seus clientes."
  },
  {
    icon: Clock,
    title: "Disponível 24/7",
    description: "Sua empresa funcionando mesmo quando você está dormindo."
  },
  {
    icon: Users,
    title: "Geração de Leads",
    description: "Capture contatos de clientes interessados automaticamente."
  },
  {
    icon: Wallet,
    title: "Custo Acessível",
    description: "Investimento baixo com alto retorno para seu negócio."
  },
  {
    icon: HeadphonesIcon,
    title: "Suporte Contínuo",
    description: "Estamos sempre disponíveis para ajudar você."
  }
];

const BenefitsSection = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Benefícios de Ter Uma <span className="text-primary">Landing Page</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Muito mais do que um site, uma ferramenta de vendas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="group flex items-start gap-4 p-6 rounded-2xl bg-card hover-lift transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                <benefit.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
