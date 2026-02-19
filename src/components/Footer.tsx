import { Anchor } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-navy text-primary-foreground/70 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Anchor className="w-5 h-5 text-accent" />
            <span className="font-display text-lg font-bold text-primary-foreground">
              Espacio Náutico Buenos Aires
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <a href="#travesias" className="font-body text-sm hover:text-accent transition-colors">Travesías</a>
            <a href="#escuela" className="font-body text-sm hover:text-accent transition-colors">Escuela</a>
            <a href="#broker" className="font-body text-sm hover:text-accent transition-colors">Broker</a>
            <a href="#servicios" className="font-body text-sm hover:text-accent transition-colors">Servicios</a>
            <a href="#contacto" className="font-body text-sm hover:text-accent transition-colors">Contacto</a>
          </div>

          <p className="font-body text-xs text-primary-foreground/40">
            © 2025 Espacio Náutico Buenos Aires. Palermo, Buenos Aires.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
