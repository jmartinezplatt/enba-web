import { Link } from "react-router-dom";
import logoClaro from "@/assets/ENBA-horizontal-claro.svg";

const Footer = () => {
  return (
    <footer className="snap-section-auto bg-navy text-primary-foreground/70 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-3">
            <img src={logoClaro} alt="Espacio Náutico Buenos Aires" className="h-8" />
          </Link>

          <nav className="flex flex-wrap justify-center gap-6">
            <Link to="/travesias" className="font-body text-sm hover:text-accent transition-colors">Travesías</Link>
            <Link to="/escuela-nautica" className="font-body text-sm hover:text-accent transition-colors">Escuela</Link>
            <Link to="/veleros-en-venta" className="font-body text-sm hover:text-accent transition-colors">Broker</Link>
            <Link to="/servicios-nauticos" className="font-body text-sm hover:text-accent transition-colors">Servicios</Link>
            <Link to="/contacto" className="font-body text-sm hover:text-accent transition-colors">Contacto</Link>
          </nav>

          <p className="font-body text-xs text-primary-foreground/40">
            © 2025 Espacio Náutico Buenos Aires. Palermo, Buenos Aires.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
