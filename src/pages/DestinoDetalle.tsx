import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Clock, Anchor, Check, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { TouristTripSchema, BreadcrumbSchema } from "@/components/SchemaOrg";
import { destinos } from "@/data/destinos";
import NotFound from "./NotFound";

const DestinoDetalle = () => {
  const { slug } = useParams<{ slug: string }>();
  const destino = destinos.find((d) => d.id === slug);

  if (!destino) return <NotFound />;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`Travesía en Velero a ${destino.name} | Espacio Náutico Buenos Aires`}
        description={`Navegá en velero desde Buenos Aires a ${destino.name}, ${destino.country}. ${destino.duration} de travesía. ${destino.description} Patrón certificado y comidas incluidas.`}
        path={`/travesias/${destino.id}`}
      />
      <TouristTripSchema
        name={destino.name}
        description={destino.description}
        duration={destino.duration}
        url={`/travesias/${destino.id}`}
      />
      <BreadcrumbSchema items={[
        { name: "Inicio", url: "/" },
        { name: "Travesías", url: "/travesias" },
        { name: destino.name, url: `/travesias/${destino.id}` },
      ]} />
      <Navbar />

      {/* Hero */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={destino.image}
            alt={`Travesía en velero a ${destino.name}`}
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
            <p className="font-condensed text-xs uppercase tracking-[0.3em] text-white/80 font-light drop-shadow-lg mb-6">
              {destino.flag} {destino.country}
            </p>
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-white leading-tight mb-6 uppercase tracking-wide drop-shadow-2xl">
              {destino.name}
            </h1>
            <p className="font-body text-lg md:text-xl text-white max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
              {destino.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6">
          <Link
            to="/travesias"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors font-body text-sm mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Ver todos los destinos
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main */}
            <div className="lg:col-span-2 space-y-8">
              {/* Meta */}
              <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-accent" />
                  <span className="font-body">{destino.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Anchor className="w-5 h-5 text-accent" />
                  <span className="font-body">{destino.distance}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-accent" />
                  <span className="font-body">Salida: Puerto Norte, Buenos Aires</span>
                </div>
              </div>

              {/* About */}
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground uppercase tracking-wide mb-4">
                  Sobre esta travesía
                </h2>
                <p className="font-body text-base text-muted-foreground leading-relaxed">
                  {destino.description} Navegamos desde Puerto Norte, en Palermo, Buenos Aires, con veleros completamente equipados y patrón certificado. La travesía incluye todas las comidas y pernocte a bordo. Ideal para quienes buscan una experiencia náutica única con total seguridad y confort.
                </p>
              </div>

              {/* Includes */}
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground uppercase tracking-wide mb-4">
                  Qué incluye
                </h2>
                <ul className="space-y-3">
                  {destino.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="font-body text-base text-foreground/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Highlights */}
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground uppercase tracking-wide mb-4">
                  Destacados
                </h2>
                <div className="flex flex-wrap gap-3">
                  {destino.highlights.map((h) => (
                    <span key={h} className="font-body text-sm bg-muted text-foreground/80 px-4 py-2 rounded-lg">
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar CTA */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-card border border-border rounded-lg p-6 space-y-4">
                <h3 className="font-heading text-xl font-bold text-foreground uppercase tracking-wide">
                  Reservá esta travesía
                </h3>
                <p className="font-body text-sm text-muted-foreground">
                  Consultá disponibilidad y precio para tu grupo. Respondemos en menos de 24hs.
                </p>
                <a
                  href={`https://wa.me/5491149915143?text=${encodeURIComponent(`Hola! Me interesa la travesía a ${destino.name}. Somos [cantidad] personas para [fecha tentativa].`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-accent text-accent-foreground px-4 py-3 rounded-md font-body text-sm font-semibold tracking-wide uppercase transition-all hover:opacity-90"
                >
                  Consultar Disponibilidad
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DestinoDetalle;
