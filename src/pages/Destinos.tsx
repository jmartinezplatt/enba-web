import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Clock, Anchor, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { BreadcrumbSchema } from "@/components/SchemaOrg";
import heroDestinos from "@/assets/hero-destinos.jpg";
import { destinos } from "@/data/destinos";
import type { Destino } from "@/data/destinos";

const DestinationCard = ({ destination }: { destination: Destino }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-nautical-hover transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={destination.image}
          alt={`Travesía en velero a ${destination.name}`}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
        {destination.popular && (
          <div className="absolute top-4 right-4">
            <span className="bg-accent text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Popular
            </span>
          </div>
        )}
        <div className="absolute bottom-4 left-4">
          <span className="text-4xl">{destination.flag}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="font-heading text-2xl font-bold text-foreground uppercase tracking-wide mb-1">
            {destination.name}
          </h3>
          <p className="font-body text-sm text-muted-foreground">{destination.country}</p>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-accent" />
            <span>{destination.duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Anchor className="w-4 h-4 text-accent" />
            <span>{destination.distance}</span>
          </div>
        </div>

        <p className="font-body text-sm text-foreground/80 leading-relaxed">
          {destination.description}
        </p>

        <div className="space-y-2">
          <p className="font-body text-xs uppercase tracking-wider text-accent font-semibold">Incluye:</p>
          <ul className="space-y-1.5">
            {destination.includes.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <span className="font-body text-xs text-foreground/80">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-3 border-t border-border">
          <div className="flex flex-wrap gap-2">
            {destination.highlights.map((highlight) => (
              <span
                key={highlight}
                className="font-body text-xs bg-muted text-muted-foreground px-2 py-1 rounded"
              >
                {highlight}
              </span>
            ))}
          </div>
        </div>

        <Link
          to={`/travesias/${destination.id}`}
          className="block w-full bg-primary text-primary-foreground text-center px-6 py-3 rounded-md font-body text-sm font-semibold tracking-wide uppercase transition-all hover:opacity-90 mt-4"
        >
          Ver Travesía
        </Link>
      </div>
    </motion.div>
  );
};

const Destinos = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Travesías en Velero a Uruguay y Argentina | Espacio Náutico Buenos Aires"
        description="Navegá en velero a Colonia, Montevideo, Punta del Este, Delta del Paraná y más. Travesías con pernocte, patrón certificado y comidas incluidas. Salida desde Buenos Aires."
        path="/travesias"
      />
      <BreadcrumbSchema items={[
        { name: "Inicio", url: "/" },
        { name: "Travesías", url: "/travesias" },
      ]} />
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroDestinos}
            alt="Travesías en velero desde Buenos Aires"
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
              <MapPin className="w-5 h-5 text-white/80" />
              <p className="font-condensed text-xs uppercase tracking-[0.3em] text-white/80 font-light drop-shadow-lg">
                Destinos Náuticos
              </p>
            </div>
            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-6 uppercase tracking-wide drop-shadow-2xl">
              ¿A dónde querés navegar?
            </h1>
            <p className="font-body text-lg md:text-xl text-white max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-lg">
              Salimos desde la Ciudad Autónoma de Buenos Aires. Todos los destinos con precio diferencial según distancia y duración. Consultá disponibilidad y reservá tu próxima travesía.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinos.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-ocean text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-heading text-3xl md:text-5xl font-bold uppercase tracking-wide mb-4">
            ¿No encontrás tu destino ideal?
          </h2>
          <p className="font-body text-lg mb-8 max-w-2xl mx-auto">
            Armamos travesías personalizadas a medida. Contactanos y diseñamos la navegación perfecta para vos.
          </p>
          <a
            href="https://wa.me/5491149915143?text=Hola! Quiero consultar por una travesía personalizada."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-primary px-8 py-4 rounded-md font-body font-semibold text-sm tracking-widest uppercase transition-all hover:bg-white/90"
          >
            Consultar Travesía Personalizada
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Destinos;
