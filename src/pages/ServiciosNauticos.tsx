import { motion } from "framer-motion";
import { Wrench, Check, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { BreadcrumbSchema } from "@/components/SchemaOrg";
import boatService from "@/assets/boat-service.jpg";

const ServiciosNauticos = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Servicios Náuticos Buenos Aires | Mantenimiento y Reparación de Veleros"
        description="Servicio técnico náutico en Buenos Aires. Mantenimiento de motores fuera de borda, jarcia, cabullería, reparaciones generales y pintura. Presupuesto en 24hs. Servicio a domicilio."
        path="/servicios-nauticos"
      />
      <BreadcrumbSchema items={[
        { name: "Inicio", url: "/" },
        { name: "Servicios Náuticos", url: "/servicios-nauticos" },
      ]} />
      <Navbar />

      {/* Hero */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={boatService}
            alt="Servicio técnico de veleros — mantenimiento y reparación náutica"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-hero-overlay" />
        </div>
        <div className="relative z-10 container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <Wrench className="w-5 h-5 text-white/80" />
              <p className="font-condensed text-xs uppercase tracking-[0.3em] text-white/80 font-light drop-shadow-lg">
                Service & Mantenimiento
              </p>
            </div>
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-white leading-tight mb-6 uppercase tracking-wide drop-shadow-2xl">
              Servicios Náuticos
            </h1>
            <p className="font-body text-lg md:text-xl text-white max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
              Mantenimiento integral para tu embarcación. Service de motores, jarcia, cabullería, reparaciones y más. Servicio en puerto o a domicilio.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Motores */}
            <div className="bg-card border border-border rounded-lg p-8 space-y-4">
              <h2 className="font-heading text-2xl font-bold text-foreground uppercase tracking-wide">
                Service de Motores
              </h2>
              <p className="font-body text-base text-muted-foreground leading-relaxed">
                Service completo de motores fuera de borda y dentro de borda. Cambio de aceite, filtros, bujías, revisión de sistema de refrigeración, circuito de combustible y diagnóstico electrónico. Trabajamos con todas las marcas: Suzuki, Yamaha, Mercury, Honda, Tohatsu.
              </p>
              <ul className="space-y-2">
                {["Service menor y mayor", "Diagnóstico y reparación", "Cambio de impeller y ánodos", "Winterización de motores"].map((item) => (
                  <li key={item} className="flex items-start gap-2 font-body text-sm text-foreground/80">
                    <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Jarcia y Cabullería */}
            <div className="bg-card border border-border rounded-lg p-8 space-y-4">
              <h2 className="font-heading text-2xl font-bold text-foreground uppercase tracking-wide">
                Jarcia y Cabullería
              </h2>
              <p className="font-body text-base text-muted-foreground leading-relaxed">
                Revisión y reemplazo de jarcia firme y de labor. Cambio de cabos, drizas y escotas. Reparación de molinetes, stoppers, motones y herrajes. Trabajamos con proveedores certificados para garantizar calidad y seguridad.
              </p>
              <ul className="space-y-2">
                {["Revisión de jarcia firme", "Reemplazo de cabos y drizas", "Reparación de herrajes", "Presupuesto sin cargo"].map((item) => (
                  <li key={item} className="flex items-start gap-2 font-body text-sm text-foreground/80">
                    <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pintura y Carena */}
            <div className="bg-card border border-border rounded-lg p-8 space-y-4">
              <h2 className="font-heading text-2xl font-bold text-foreground uppercase tracking-wide">
                Pintura y Carena
              </h2>
              <p className="font-body text-base text-muted-foreground leading-relaxed">
                Gestionamos con talleres especializados la pintura de casco, antifouling, pulido de gelcoat y reparaciones de fibra de vidrio. Te acompañamos en todo el proceso con seguimiento completo hasta la entrega.
              </p>
            </div>

            {/* Reparaciones Generales */}
            <div className="bg-card border border-border rounded-lg p-8 space-y-4">
              <h2 className="font-heading text-2xl font-bold text-foreground uppercase tracking-wide">
                Reparaciones Generales
              </h2>
              <p className="font-body text-base text-muted-foreground leading-relaxed">
                Reparaciones eléctricas, de plomería, electrónica de navegación, tapicería y carpintería marina. Tenemos una red de proveedores y talleres especializados para resolver cualquier necesidad de tu embarcación.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Phone className="w-5 h-5 text-accent" />
              <h2 className="font-heading text-2xl font-bold text-foreground uppercase tracking-wide">
                Pedí tu presupuesto
              </h2>
            </div>
            <p className="font-body text-base text-muted-foreground max-w-lg mx-auto">
              Presupuesto sin cargo en 24-48hs. Servicio en puerto o a domicilio. Seguimiento post-service incluido.
            </p>
            <a
              href="https://wa.me/5491149915143?text=Hola! Necesito un presupuesto para servicio técnico de mi embarcación."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-accent text-accent-foreground px-8 py-4 rounded-md font-body font-semibold text-sm tracking-widest uppercase transition-all hover:opacity-90"
            >
              Solicitar Presupuesto
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServiciosNauticos;
