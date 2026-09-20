import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap } from "lucide-react";

const CTASection = () => {
  const whatsappLink = "https://wa.me/5542988781321?text=Olá! Quero criar meu site profissional!";

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 gradient-dark" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-20 h-20 rounded-2xl gradient-accent flex items-center justify-center mx-auto mb-8 animate-pulse-slow">
            <Zap className="w-10 h-10 text-cta-foreground" />
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Não Fique Mais 1 Dia{" "}
            <span className="text-accent">Invisível</span> no Google
          </h2>
          
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Comece agora e esteja online em 7 dias. Milhares de clientes estão pesquisando por você neste momento.
          </p>

          <Button 
            variant="hero" 
            size="xl" 
            className="group mb-6"
            asChild
          >
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              Quero Meu Site
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>

          <div className="flex items-center justify-center gap-2 text-primary-foreground/70">
            <Shield className="w-5 h-5" />
            <span className="text-sm">Satisfação garantida ou seu dinheiro de volta</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
