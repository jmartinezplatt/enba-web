import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Instagram, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { BreadcrumbSchema } from "@/components/SchemaOrg";

const Contacto = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Contacto | Espacio Náutico Buenos Aires — Puerto Norte, Palermo"
        description="Contactá a Espacio Náutico Buenos Aires. Puerto Norte Marina, Palermo, frente al Aeroparque. Teléfono, WhatsApp, email e Instagram. Atención personalizada."
        path="/contacto"
      />
      <BreadcrumbSchema items={[
        { name: "Inicio", url: "/" },
        { name: "Contacto", url: "/contacto" },
      ]} />
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-foreground leading-tight mb-6 uppercase tracking-wide">
              Contacto — Espacio Náutico Buenos Aires
            </h1>
            <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Estamos en Palermo, frente al Aeroparque Jorge Newberry. Marina en Puerto Norte. Respondemos en menos de 24hs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact cards */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {/* Location */}
            <div className="bg-card border border-border rounded-lg p-8 text-center shadow-nautical hover:shadow-nautical-hover transition-shadow">
              <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-5 h-5 text-accent" />
              </div>
              <h2 className="font-heading text-lg font-bold text-foreground mb-2">Ubicación</h2>
              <p className="font-body text-sm text-muted-foreground">
                Puerto Norte Marina<br />
                Palermo, CABA<br />
                Frente al Aeroparque
              </p>
            </div>

            {/* Phone */}
            <div className="bg-card border border-border rounded-lg p-8 text-center shadow-nautical hover:shadow-nautical-hover transition-shadow">
              <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center mx-auto mb-4">
                <Phone className="w-5 h-5 text-accent" />
              </div>
              <h2 className="font-heading text-lg font-bold text-foreground mb-2">Teléfono</h2>
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

            {/* Email */}
            <div className="bg-card border border-border rounded-lg p-8 text-center shadow-nautical hover:shadow-nautical-hover transition-shadow">
              <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-5 h-5 text-accent" />
              </div>
              <h2 className="font-heading text-lg font-bold text-foreground mb-2">Email</h2>
              <a
                href="mailto:consultas@espacionautico.com.ar"
                className="font-body text-sm text-accent hover:underline"
              >
                consultas@espacionautico.com.ar
              </a>
            </div>

            {/* Instagram */}
            <div className="bg-card border border-border rounded-lg p-8 text-center shadow-nautical hover:shadow-nautical-hover transition-shadow">
              <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center mx-auto mb-4">
                <Instagram className="w-5 h-5 text-accent" />
              </div>
              <h2 className="font-heading text-lg font-bold text-foreground mb-2">Instagram</h2>
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
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contacto;
