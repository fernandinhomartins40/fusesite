import { Instagram } from "lucide-react";
import logoFuseSite from "@/assets/logo-fuse-site.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border/50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <img
                src={logoFuseSite}
                alt="Fuse Site"
                className="h-14 w-auto"
              />
            </div>
            <p className="text-muted-foreground max-w-sm">
              Transformamos negócios locais em sucesso digital. Landing pages profissionais que convertem visitantes em clientes.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="#precos" className="hover:text-primary transition-colors">
                  Preços
                </a>
              </li>
              <li>
                <a href="#exemplos" className="hover:text-primary transition-colors">
                  Portfólio
                </a>
              </li>
              <li>
                <a href="#processo" className="hover:text-primary transition-colors">
                  Como Funciona
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-primary transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contato</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a
                  href="https://wa.me/5542988781321"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  (42) 98878-1321
                </a>
              </li>
              <li>
                <a href="mailto:contato@fuse.com.br" className="hover:text-primary transition-colors">
                  contato@fuse.com.br
                </a>
              </li>
            </ul>
            
            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-4">
              <a
                href="https://www.instagram.com/fuse.site"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Instagram Fuse Site"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Fuse Agência. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
