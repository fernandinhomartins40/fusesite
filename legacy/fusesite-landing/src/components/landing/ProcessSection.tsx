import { MessageCircle, Palette, Rocket } from "lucide-react";

const steps = [
  {
    icon: MessageCircle,
    number: "01",
    title: "Você nos conta sobre seu negócio",
    description: "Uma conversa rápida pelo WhatsApp para entendermos sua empresa e objetivos."
  },
  {
    icon: Palette,
    number: "02",
    title: "Criamos seu site em 7 dias",
    description: "Nossa equipe desenvolve um site profissional e personalizado para você."
  },
  {
    icon: Rocket,
    number: "03",
    title: "Sua empresa online recebendo clientes",
    description: "Publicamos sua página e você começa a receber contatos imediatamente."
  }
];

const ProcessSection = () => {
  return (
    <section id="processo" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Simples em <span className="text-primary">3 Passos</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Sem complicação. Sem burocracia. Apenas resultados.
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2" />
          
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="relative text-center group"
              >
                {/* Step number background */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl font-bold text-primary/5 pointer-events-none">
                  {step.number}
                </div>
                
                {/* Icon */}
                <div className="relative z-10 w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <step.icon className="w-10 h-10 text-primary-foreground" />
                </div>
                
                {/* Step indicator */}
                <div className="w-8 h-8 rounded-full bg-card border-2 border-primary flex items-center justify-center mx-auto mb-4 font-bold text-primary text-sm">
                  {index + 1}
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
