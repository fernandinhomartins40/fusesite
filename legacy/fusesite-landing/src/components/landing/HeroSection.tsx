import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Gift, CheckCircle2, Zap } from "lucide-react";
import heroMockup from "@/assets/hero-mockup.png";
const HeroSection = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth"
    });
  };
  return <section className="min-h-screen pt-20 md:pt-28 pb-16 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left content */}
          <div className="space-y-8 text-center lg:text-left">
            <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2 text-sm font-medium inline-flex items-center gap-2">
              <Gift className="w-4 h-4" />
              Domínio Grátis por 1 Ano
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Sua Empresa Merece Estar no{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/80">
                Google
              </span>
              . Nós Colocamos Ela Lá.
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-xl">
              Site profissional por apenas{" "}
              <span className="text-foreground font-semibold">R$ 375</span> + Hospedagem por{" "}
              <span className="text-foreground font-semibold">R$ 27/mês</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="hero" size="xl" onClick={() => scrollToSection("precos")} className="group">
                Quero Meu Site Agora
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-6 justify-center lg:justify-start text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>Pronto em 7 dias</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>100% Responsivo</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>Suporte Incluído</span>
              </div>
            </div>
          </div>

          {/* Right content - Mockup */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="animate-float">
              <img alt="Exemplo de site responsivo em desktop, tablet e mobile" className="w-full max-w-2xl drop-shadow-2xl" src="/lovable-uploads/d5b967d5-5314-4aa7-b22b-c0457adf5ace.png" />
            </div>
            
            {/* Floating badges */}
            <div className="absolute -left-4 top-1/4 glass rounded-xl p-4 shadow-lg animate-float" style={{
            animationDelay: "0.5s"
          }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">SEO Otimizado</p>
                  <p className="text-xs text-muted-foreground">Apareça no Google</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -right-4 bottom-1/4 glass rounded-xl p-4 shadow-lg animate-float" style={{
            animationDelay: "1s"
          }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Super Rápido</p>
                  <p className="text-xs text-muted-foreground">Carrega em 2s</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;