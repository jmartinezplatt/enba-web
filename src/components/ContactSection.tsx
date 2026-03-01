import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Phone, Mail, Instagram, MessageCircle, Anchor } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contacto" className="snap-section py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="font-body text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-4">
            Contacto
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            Hablemos
          </h2>
          <p className="font-body text-base text-muted-foreground max-w-lg mx-auto">
            Estamos en Palermo, frente al Aeroparque Jorge Newberry. Marina en Puerto Norte.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {/* Location */}
          <div className="bg-card border border-border rounded-lg p-8 text-center shadow-nautical hover:shadow-nautical-hover transition-shadow">
            <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-5 h-5 text-accent" />
            </div>
            <h3 className="font-display text-lg font-bold text-foreground mb-2">Ubicación</h3>
            <p className="font-body text-sm text-muted-foreground">
              Puerto Norte Marina<br />
              Palermo, CABA<br />
              Frente al Aeroparque
            </p>
          </div>

          {/* Phone & WhatsApp */}
          <div className="bg-card border border-border rounded-lg p-8 text-center shadow-nautical hover:shadow-nautical-hover transition-shadow">
            <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center mx-auto mb-4">
              <Phone className="w-5 h-5 text-accent" />
            </div>
            <h3 className="font-display text-lg font-bold text-foreground mb-2">Teléfono</h3>
            <p className="font-body text-sm text-muted-foreground mb-3">
              +54 11 4991-5143
            </p>
            <a
              href="https://wa.me/5491149915143"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent/15 text-accent px-4 py-2 rounded-md font-body text-sm font-medium transition-colors hover:bg-accent/25"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </div>

          {/* Email & Social */}
          <div className="bg-card border border-border rounded-lg p-8 text-center shadow-nautical hover:shadow-nautical-hover transition-shadow">
            <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center mx-auto mb-4">
              <Mail className="w-5 h-5 text-accent" />
            </div>
            <h3 className="font-display text-lg font-bold text-foreground mb-2">Email & Redes</h3>
            <p className="font-body text-sm text-muted-foreground mb-3">
              consultas@espacionautico.com.ar
            </p>
            <a
              href="https://www.instagram.com/espacionauticoba"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent/15 text-accent px-4 py-2 rounded-md font-body text-sm font-medium transition-colors hover:bg-accent/25"
            >
              <Instagram className="w-4 h-4" />
              @espacionauticoba
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
