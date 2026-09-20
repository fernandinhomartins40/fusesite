import { Button } from "@/components/ui/button";
import logoFuseSite from "@/assets/logo-fuse-site.png";

const Header = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center">
            <img
              src={logoFuseSite}
              alt="Fuse Site"
              className="h-12 md:h-14 w-auto"
            />
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection("precos")} 
              className="text-foreground/80 hover:text-primary transition-colors font-medium"
            >
              Preços
            </button>
            <button 
              onClick={() => scrollToSection("exemplos")} 
              className="text-foreground/80 hover:text-primary transition-colors font-medium"
            >
              Exemplos
            </button>
            <button 
              onClick={() => scrollToSection("processo")} 
              className="text-foreground/80 hover:text-primary transition-colors font-medium"
            >
              Como Funciona
            </button>
            <button 
              onClick={() => scrollToSection("faq")} 
              className="text-foreground/80 hover:text-primary transition-colors font-medium"
            >
              FAQ
            </button>
          </nav>

          <Button 
            variant="cta" 
            size="default"
            onClick={() => scrollToSection("precos")}
          >
            Começar Agora
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
