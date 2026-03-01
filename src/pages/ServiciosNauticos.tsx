import { motion } from "framer-motion";
import { Wrench, Check, Phone, HelpCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { BreadcrumbSchema, FAQPageSchema, ServiceSchema } from "@/components/SchemaOrg";
import boatService from "@/assets/boat-service.jpg";

const serviciosFaqs = [
  {
    question: "¿Qué tipos de motores náuticos reparan en Buenos Aires?",
    answer: "Realizamos service completo de motores fuera de borda y dentro de borda (intraborda) de todas las marcas: Suzuki, Yamaha, Mercury, Honda, Tohatsu, Evinrude, Yanmar, Volvo Penta y más. Incluye cambio de aceite, filtros, bujías, impeller, ánodos, diagnóstico electrónico y reparaciones mayores. Trabajamos tanto con motores de 2 tiempos como de 4 tiempos."
  },
  {
    question: "¿Hacen servicio técnico náutico a domicilio en Buenos Aires?",
    answer: "Sí, ofrecemos servicio a domicilio en todas las marinas y clubes náuticos de Buenos Aires y zona norte. Podemos hacer el service en tu amarre o en nuestro taller en Puerto Norte Marina, Palermo. El servicio a domicilio tiene un costo adicional mínimo según la distancia."
  },
  {
    question: "¿Cuánto demora un presupuesto de reparación náutica?",
    answer: "Entregamos presupuesto sin cargo en 24 a 48 horas hábiles. Para services estándar (cambio de aceite, filtros, impeller) podemos presupuestar en el acto. Para reparaciones más complejas que requieran diagnóstico, coordinamos una visita al barco y entregamos el presupuesto detallado dentro de las 48hs."
  },
  {
    question: "¿Qué incluye un service completo de motor fuera de borda?",
    answer: "Un service completo incluye: cambio de aceite de cola, revisión y cambio de filtro de combustible, cambio de bujías, revisión de impeller de bomba de agua, revisión de ánodos anticorrosión, limpieza de carburador o inyectores, verificación del sistema eléctrico, prueba de funcionamiento y ajuste de ralentí. Dependiendo del motor y las horas de uso, pueden agregarse items adicionales."
  },
  {
    question: "¿Pueden gestionar la pintura de antifouling de mi velero?",
    answer: "Sí, gestionamos todo el proceso de pintura y carena con talleres especializados. Coordinamos la subida del barco, preparación del casco, aplicación de antifouling y bajada. Te acompañamos con seguimiento completo desde el presupuesto hasta la entrega. Trabajamos con las marcas de antifouling más reconocidas del mercado."
  },
  {
    question: "¿Hacen winterización de motores náuticos?",
    answer: "Sí, ofrecemos servicio de winterización para motores fuera de borda e intraborda. El proceso incluye estabilización del combustible, protección del sistema de refrigeración, cambio de aceite, lubricación de componentes, desconexión de baterías y cobertura del motor. Es un servicio fundamental para proteger tu motor durante los meses de invierno en Buenos Aires."
  },
];

const ServiciosNauticos = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Servicios Náuticos Buenos Aires | Mantenimiento, Reparación y Service de Veleros y Motores"
        description="Servicio técnico náutico completo en Buenos Aires. Service de motores fuera de borda e intraborda, jarcia, cabullería, pintura, antifouling y reparaciones generales. Presupuesto en 24hs. Servicio a domicilio en todas las marinas de Buenos Aires."
        path="/servicios-nauticos"
      />
      <ServiceSchema
        name="Servicios Náuticos — Mantenimiento y Reparación de Embarcaciones"
        description="Servicio técnico náutico completo en Buenos Aires. Mantenimiento de motores, jarcia, cabullería, pintura y reparaciones generales para veleros y lanchas."
        url="/servicios-nauticos"
      />
      <FAQPageSchema faqs={serviciosFaqs} />
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
            alt="Técnico realizando mantenimiento de motor fuera de borda en velero — servicio técnico náutico Buenos Aires"
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
                Service & Mantenimiento Náutico
              </p>
            </div>
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-white leading-tight mb-6 uppercase tracking-wide drop-shadow-2xl">
              Servicios Náuticos en Buenos Aires
            </h1>
            <p className="font-body text-lg md:text-xl text-white max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
              Mantenimiento integral para tu embarcación. Service de motores fuera de borda e intraborda, jarcia, cabullería, pintura, antifouling y reparaciones generales. Servicio en puerto o a domicilio.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro SEO content */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="font-heading text-3xl font-bold text-foreground uppercase tracking-wide mb-6">
            Servicio técnico náutico integral en Buenos Aires
          </h2>
          <div className="font-body text-base text-muted-foreground leading-relaxed space-y-4">
            <p>
              En Espacio Náutico Buenos Aires ofrecemos un servicio técnico náutico completo para veleros, lanchas y embarcaciones deportivas. Nuestro equipo de técnicos especializados trabaja desde Puerto Norte Marina, en Palermo, Buenos Aires, y también ofrece servicio a domicilio en todas las marinas y clubes náuticos de la Ciudad Autónoma de Buenos Aires y zona norte del Gran Buenos Aires.
            </p>
            <p>
              Sabemos que el mantenimiento regular de una embarcación es fundamental para garantizar la seguridad de la tripulación y prolongar la vida útil del barco. Por eso trabajamos con proveedores certificados y repuestos originales, asegurando la calidad de cada intervención. Desde un simple cambio de aceite hasta una reparación mayor de motor, cada trabajo se realiza con el mismo nivel de profesionalismo y atención al detalle.
            </p>
            <p>
              Atendemos tanto a propietarios particulares como a clubes náuticos y flotas comerciales. Nuestro compromiso es entregar presupuestos claros, sin sorpresas, y cumplir con los plazos acordados. El seguimiento post-service está incluido en todos nuestros trabajos.
            </p>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-8 lg:py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Motores */}
            <div className="bg-card border border-border rounded-lg p-8 space-y-4">
              <h2 className="font-heading text-2xl font-bold text-foreground uppercase tracking-wide">
                Service de Motores Náuticos
              </h2>
              <p className="font-body text-base text-muted-foreground leading-relaxed">
                Service completo de motores fuera de borda y dentro de borda. Cambio de aceite, filtros, bujías, revisión de sistema de refrigeración, circuito de combustible y diagnóstico electrónico. Trabajamos con todas las marcas del mercado argentino: Suzuki, Yamaha, Mercury, Honda, Tohatsu, Evinrude, Yanmar, Volvo Penta y más.
              </p>
              <h3 className="font-heading text-lg font-semibold text-foreground">Trabajos que realizamos</h3>
              <ul className="space-y-2">
                {["Service menor y mayor de motores fuera de borda", "Service de motores intraborda diésel y nafta", "Diagnóstico electrónico y reparación de fallas", "Cambio de impeller, ánodos y sistema de refrigeración", "Winterización y preparación para temporada"].map((item) => (
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
                Jarcia, Cabullería y Herrajes
              </h2>
              <p className="font-body text-base text-muted-foreground leading-relaxed">
                Revisión y reemplazo de jarcia firme y de labor. Cambio de cabos, drizas y escotas de todas las medidas y materiales. Reparación de molinetes, stoppers, motones y herrajes de cubierta. Trabajamos con proveedores certificados para garantizar calidad, seguridad y durabilidad.
              </p>
              <h3 className="font-heading text-lg font-semibold text-foreground">Incluye</h3>
              <ul className="space-y-2">
                {["Inspección visual y medición de jarcia firme", "Reemplazo de cabos, drizas y escotas", "Reparación y lubricación de herrajes de cubierta", "Cambio de terminales, tensores y guardacabos", "Presupuesto sin cargo"].map((item) => (
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
                Pintura, Antifouling y Carena
              </h2>
              <p className="font-body text-base text-muted-foreground leading-relaxed">
                Gestionamos con talleres especializados todo el proceso de pintura de casco, aplicación de antifouling, pulido de gelcoat y reparaciones de fibra de vidrio. Coordinamos la subida del barco, los trabajos y la bajada, con seguimiento completo hasta la entrega. La aplicación correcta de antifouling es fundamental para el rendimiento del velero y la protección del casco contra organismos marinos.
              </p>
            </div>

            {/* Reparaciones Generales */}
            <div className="bg-card border border-border rounded-lg p-8 space-y-4">
              <h2 className="font-heading text-2xl font-bold text-foreground uppercase tracking-wide">
                Reparaciones Generales de Embarcaciones
              </h2>
              <p className="font-body text-base text-muted-foreground leading-relaxed">
                Reparaciones eléctricas, de plomería náutica, electrónica de navegación, tapicería marina y carpintería naval. Contamos con una red de proveedores y talleres especializados para resolver cualquier necesidad de tu embarcación. Desde una reparación menor hasta una puesta a punto integral, coordinamos y supervisamos todo el trabajo.
              </p>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="flex items-center gap-3 mb-8">
              <HelpCircle className="w-6 h-6 text-accent" />
              <h2 className="font-heading text-3xl font-bold text-foreground uppercase tracking-wide">
                Preguntas Frecuentes sobre Servicios Náuticos
              </h2>
            </div>
            <div className="space-y-6">
              {serviciosFaqs.map((faq) => (
                <div key={faq.question} className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-3">
                    {faq.question}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Phone className="w-5 h-5 text-accent" />
              <h2 className="font-heading text-2xl font-bold text-foreground uppercase tracking-wide">
                Pedí tu presupuesto de servicio náutico
              </h2>
            </div>
            <p className="font-body text-base text-muted-foreground max-w-lg mx-auto">
              Presupuesto sin cargo en 24-48hs. Servicio en puerto o a domicilio en todas las marinas de Buenos Aires. Seguimiento post-service incluido en todos los trabajos.
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
