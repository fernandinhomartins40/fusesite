import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Quanto tempo leva para ficar pronto?",
    answer: "Em média, seu site fica pronto em 7 dias úteis após o envio de todas as informações necessárias. Para projetos mais simples, pode ficar pronto em até 5 dias."
  },
  {
    question: "Preciso ter conhecimento técnico?",
    answer: "Não! Nós cuidamos de toda a parte técnica. Você só precisa nos enviar as informações sobre seu negócio, textos e imagens que deseja usar. O resto é por nossa conta."
  },
  {
    question: "Posso cancelar quando quiser?",
    answer: "Sim, você pode cancelar a hospedagem a qualquer momento sem multa. O site que criamos é seu e você pode exportá-lo se preferir hospedar em outro lugar."
  },
  {
    question: "O domínio fica em meu nome?",
    answer: "Sim! O domínio é registrado em seu nome e você é o proprietário. Após o primeiro ano gratuito, a renovação anual fica por conta do cliente."
  },
  {
    question: "Vocês fazem alterações depois?",
    answer: "Sim! Pequenas alterações de texto e imagens estão incluídas no suporte. Para mudanças maiores de layout ou funcionalidades, fazemos um orçamento acessível."
  },
  {
    question: "Como funciona o pagamento?",
    answer: "O valor da criação (R$ 375) é pago antes do início do projeto. A hospedagem (R$ 27/mês) começa após a publicação da página. Aceitamos PIX, cartão e boleto."
  }
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Perguntas <span className="text-primary">Frequentes</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Tire suas dúvidas sobre nosso serviço.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card rounded-xl border border-border/50 px-6 overflow-hidden"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
