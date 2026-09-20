import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap, ArrowRight } from "lucide-react";

const benefits = [
  "Design profissional e moderno",
  "100% Responsivo (mobile + desktop)",
  "Domínio grátis por 1 ano",
  "Hospedagem super rápida",
  "Otimizado para Google (SEO)",
  "Formulário de contato integrado",
  "Suporte técnico incluído",
  "Entrega em até 7 dias"
];

const PricingSection = () => {
  const whatsappLink = "https://wa.me/5542988781321?text=Olá! Quero criar meu site profissional!";

  return (
    <section id="precos" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 gradient-primary opacity-5 pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
            <Star className="w-3 h-3 mr-1" />
            Oferta Especial
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Investimento Que Cabe no Seu Bolso
          </h2>
          <p className="text-lg text-muted-foreground">
            O menor investimento com o maior retorno para seu negócio.
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <Card className="border-2 border-primary shadow-2xl relative overflow-hidden">
            {/* Popular badge */}
            <div className="absolute top-0 right-0 gradient-accent text-cta-foreground px-4 py-1 text-sm font-semibold rounded-bl-lg">
              Mais Popular
            </div>
            
            <CardHeader className="text-center pb-0 pt-8">
              <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Site Profissional</h3>
            </CardHeader>
            
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="flex items-baseline justify-center gap-2 mb-2">
                  <span className="text-5xl font-bold text-foreground">R$ 375</span>
                  <span className="text-muted-foreground">único</span>
                </div>
                <p className="text-muted-foreground">
                  + <span className="text-foreground font-semibold">R$ 27,00</span>/mês de hospedagem
                </p>
              </div>

              <div className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>

              <Button 
                variant="hero" 
                size="xl" 
                className="w-full group"
                asChild
              >
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  Começar Meu Projeto Agora
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>

              <p className="text-center text-sm text-muted-foreground mt-4">
                Satisfação garantida ou seu dinheiro de volta
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
