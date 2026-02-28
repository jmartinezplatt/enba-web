import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoDark from "@/assets/ENBA-horizontal-oscuro.svg";
import logoLight from "@/assets/ENBA-horizontal-claro.svg";

const navItems = [
  { label: "Travesías", href: "/#travesias" },
  { label: "Escuela", href: "/#escuela" },
  { label: "Broker", href: "/#broker" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Contacto", href: "/#contacto" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!isHome) {
      return; // Let the link navigate normally
    }
    
    e.preventDefault();
    const target = document.querySelector(href.replace('/', ''));
    if (!target) return;

    const mainEl = document.querySelector('main');
    const isMobileSnap = mainEl && window.innerWidth <= 768;

    if (isMobileSnap) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      const doScroll = () => {
        const top = target.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo({ top, behavior: "smooth" });
      };
      if (!scrolled) {
        window.scrollTo({ top: 51 });
        requestAnimationFrame(() => requestAnimationFrame(doScroll));
      } else {
        doScroll();
      }
    }
  }, [scrolled, isHome]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-card/95 backdrop-blur-md shadow-nautical border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <a
          href="/"
          className="flex items-center group"
        >
          <img src={scrolled ? logoLight : logoDark} alt="Espacio Náutico BsAs" className="h-10 w-auto" />
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`font-body text-sm font-medium tracking-wide uppercase transition-colors hover:text-accent ${
                scrolled ? "text-muted-foreground" : "text-primary-foreground/80"
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="/#booking"
            className="bg-accent text-accent-foreground px-5 py-2.5 rounded-md font-body text-sm font-semibold tracking-wide uppercase transition-all hover:opacity-90"
          >
            Reservar
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`md:hidden transition-colors ${
            scrolled ? "text-foreground" : "text-primary-foreground"
          }`}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card/98 backdrop-blur-md border-b border-border"
          >
            <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    setIsOpen(false);
                    handleNavClick(e, item.href);
                  }}
                  className="font-body text-base font-medium text-foreground hover:text-accent transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="/#booking"
                onClick={(e) => { setIsOpen(false); handleNavClick(e, "/#booking"); }}
                className="bg-accent text-accent-foreground px-5 py-2.5 rounded-md font-body text-sm font-semibold tracking-wide uppercase text-center transition-all hover:opacity-90 mt-2"
              >
                Reservar
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
