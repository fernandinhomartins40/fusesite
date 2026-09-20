import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import ProblemsSection from "@/components/landing/ProblemsSection";
import SolutionSection from "@/components/landing/SolutionSection";
import PricingSection from "@/components/landing/PricingSection";
import ExamplesSection from "@/components/landing/ExamplesSection";
import ProcessSection from "@/components/landing/ProcessSection";
import BenefitsSection from "@/components/landing/BenefitsSection";
import FAQSection from "@/components/landing/FAQSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";
import WhatsAppButton from "@/components/landing/WhatsAppButton";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Fuse Agência | Landing Pages Profissionais por R$ 375</title>
        <meta 
          name="description" 
          content="Crie sua landing page profissional por apenas R$ 375. Design moderno, responsivo e otimizado para Google. Domínio grátis por 1 ano. Pronto em 7 dias!" 
        />
        <meta name="keywords" content="landing page, criação de site, presença digital, marketing digital, SEO" />
        <link rel="canonical" href="https://fuse.com.br" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <HeroSection />
          <ProblemsSection />
          <SolutionSection />
          <PricingSection />
          <ExamplesSection />
          <ProcessSection />
          <BenefitsSection />
          <FAQSection />
          <CTASection />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default Index;
