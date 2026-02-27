import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero-sailing.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Velero navegando en el Río de la Plata al atardecer con Buenos Aires de fondo"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-hero-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-condensed text-xs md:text-sm uppercase tracking-[0.3em] text-ocean-light mb-6 font-light"
        >
          Espacio Náutico Buenos Aires · Puerto Norte
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground leading-tight mb-6 uppercase tracking-wide"
        >
          Navegá el<br />
          <span className="italic normal-case">Río de la Plata</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-body text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Travesías en velero por Argentina y por Uruguay, escapate al Delta. Escuela náutica para Timonel o Patron. Comprá-vendé tu barco con nosotros. Usa nuestros Servicios náuticos integrales y asegura tu tranquilidad.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#travesias"
            className="bg-accent text-accent-foreground px-8 py-4 rounded-md font-body font-semibold text-sm tracking-widest uppercase transition-all hover:opacity-90"
          >
            Ver Travesías
          </a>
          <a
            href="#contacto"
            className="border border-primary-foreground/30 text-primary-foreground px-8 py-4 rounded-md font-body font-semibold text-sm tracking-widest uppercase transition-all hover:bg-primary-foreground/10"
          >
            Contactanos
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6 text-primary-foreground/60" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
