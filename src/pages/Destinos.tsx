import { motion } from "framer-motion";
import { MapPin, Clock, Anchor, Check } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import coloniaImage from "../assets/colonia-sailing.jpg";

const destinations = [
  {
    id: "colonia",
    name: "Colonia del Sacramento",
    country: "Uruguay",
    flag: "🇺🇾",
    duration: "1-2 noches",
    distance: "50 km",
    image: coloniaImage,
    popular: true,
    description: "Cruzá el Río de la Plata hacia el encanto colonial de Colonia. Calles de piedra, faros históricos y atardeceres inolvidables.",
    includes: ["Navegación ida y vuelta", "Pernocte a bordo", "Desayunos y almuerzos", "Patrón certificado"],
    highlights: ["Ciudad Patrimonio de la Humanidad UNESCO", "Perfecto para fin de semana", "Puerto seguro y bien equipado"]
  },
  {
    id: "carmelo",
    name: "Carmelo",
    country: "Uruguay",
    flag: "🇺🇾",
    duration: "2 noches",
    distance: "180 km",
    image: coloniaImage,
    popular: false,
    description: "Navega hacia el corazón vitivinícola de Uruguay. Bodegas, playas tranquilas y la desembocadura del Río Uruguay.",
    includes: ["Navegación ida y vuelta", "2 noches a bordo", "Todas las comidas", "Patrón certificado"],
    highlights: ["Zona de bodegas premium", "Playas del Río Uruguay", "Menos turístico que Colonia"]
  },
  {
    id: "montevideo",
    name: "Montevideo",
    country: "Uruguay",
    flag: "🇺🇾",
    duration: "3-4 noches",
    distance: "200 km",
    image: coloniaImage,
    popular: false,
    description: "Navegá hacia la capital uruguaya. Ciudad Vieja, Rambla, gastronomía de primer nivel y una gran marina náutica.",
    includes: ["Navegación ida y vuelta", "3-4 noches a bordo", "Todas las comidas", "Patrón certificado"],
    highlights: ["Capital cosmopolita", "Excelente gastronomía", "Puerto de Buceo - marina completa"]
  },
  {
    id: "punta-del-este",
    name: "Punta del Este",
    country: "Uruguay",
    flag: "🇺🇾",
    duration: "4-5 noches",
    distance: "280 km",
    image: coloniaImage,
    popular: false,
    description: "El destino más glamoroso del Río de la Plata. Playas, puerto deportivo de lujo y vida nocturna de primer nivel.",
    includes: ["Navegación ida y vuelta", "4-5 noches a bordo", "Todas las comidas", "Patrón certificado"],
    highlights: ["Destino premium", "Puerto de Punta del Este", "Ideal para navegantes exigentes"]
  },
  {
    id: "piriapolis",
    name: "Piriápolis",
    country: "Uruguay",
    flag: "🇺🇾",
    duration: "3-4 noches",
    distance: "240 km",
    image: coloniaImage,
    popular: false,
    description: "El balneario más antiguo de Uruguay. Cerros, rambla histórica y aguas tranquilas ideales para fondear.",
    includes: ["Navegación ida y vuelta", "3-4 noches a bordo", "Todas las comidas", "Patrón certificado"],
    highlights: ["Perfecto para familias", "Fondeo protegido", "Menos masivo que Punta del Este"]
  },
  {
    id: "juan-lacaze",
    name: "Juan Lacaze",
    country: "Uruguay",
    flag: "🇺🇾",
    duration: "1-2 noches",
    distance: "120 km",
    image: coloniaImage,
    popular: false,
    description: "Pueblo tranquilo sobre el Río Uruguay. Ideal para navegantes que buscan autenticidad y calma.",
    includes: ["Navegación ida y vuelta", "1-2 noches a bordo", "Todas las comidas", "Patrón certificado"],
    highlights: ["Destino auténtico", "Menos concurrido", "Excelente para navegación relajada"]
  },
  {
    id: "riachuelo",
    name: "Riachuelo",
    country: "Uruguay",
    flag: "🇺🇾",
    duration: "2 noches",
    distance: "140 km",
    image: coloniaImage,
    popular: false,
    description: "Pueblo pescador con encanto rioplatense. Aguas calmas y experiencia náutica genuina.",
    includes: ["Navegación ida y vuelta", "2 noches a bordo", "Todas las comidas", "Patrón certificado"],
    highlights: ["Pueblo pescador auténtico", "Aguas tranquilas", "Perfecto para desconectar"]
  },
  {
    id: "martin-garcia",
    name: "Isla Martín García",
    country: "Argentina",
    flag: "🇦🇷",
    duration: "1 noche",
    distance: "45 km",
    image: coloniaImage,
    popular: true,
    description: "Reserva Natural e histórica isla argentina en medio del Río de la Plata. Naturaleza y patrimonio en un solo destino.",
    includes: ["Navegación ida y vuelta", "1 noche a bordo", "Todas las comidas", "Patrón certificado"],
    highlights: ["Reserva Natural protegida", "Historia argentina viva", "Navegación corta desde Buenos Aires"]
  },
  {
    id: "mar-del-plata",
    name: "Mar del Plata",
    country: "Argentina",
    flag: "🇦🇷",
    duration: "3-4 noches",
    distance: "380 km",
    image: coloniaImage,
    popular: false,
    description: "Navegá por la costa bonaerense hasta la perla del Atlántico. Desafío náutico y destino turístico de primer nivel.",
    includes: ["Navegación ida y vuelta", "3-4 noches a bordo", "Todas las comidas", "Patrón certificado"],
    highlights: ["Navegación oceánica", "Puerto deportivo completo", "Destino turístico consolidado"]
  },
  {
    id: "delta",
    name: "Islas y Arroyos del Delta",
    country: "Argentina",
    flag: "🇦🇷",
    duration: "1 noche",
    distance: "30-60 km",
    image: coloniaImage,
    popular: true,
    description: "Explorá los canales, arroyos e islas del Delta del Paraná. Naturaleza a 30 minutos de Buenos Aires.",
    includes: ["Navegación por canales del Delta", "1 noche a bordo", "Todas las comidas", "Patrón certificado"],
    highlights: ["Naturaleza a minutos de la ciudad", "Navegación fluvial protegida", "Ideal para principiantes"]
  }
];

const DestinationCard = ({ destination }: { destination: typeof destinations[0] }) => {
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
          alt={`Navegación a ${destination.name}`}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
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
        {/* Header */}
        <div>
          <h3 className="font-heading text-2xl font-bold text-foreground uppercase tracking-wide mb-1">
            {destination.name}
          </h3>
          <p className="font-body text-sm text-muted-foreground">{destination.country}</p>
        </div>

        {/* Meta info */}
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

        {/* Description */}
        <p className="font-body text-sm text-foreground/80 leading-relaxed">
          {destination.description}
        </p>

        {/* Includes */}
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

        {/* Highlights */}
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

        {/* CTA */}
        <a
          href="#booking"
          className="block w-full bg-primary text-primary-foreground text-center px-6 py-3 rounded-md font-body text-sm font-semibold tracking-wide uppercase transition-all hover:opacity-90 mt-4"
        >
          Reservar Travesía
        </a>
      </div>
    </motion.div>
  );
};

const Destinos = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
    <section className="relative py-24 lg:py-32 overflow-hidden">
  {/* Background image */}
  <div className="absolute inset-0">
    <img
      src={coloniaImage}
      alt="Navegación náutica"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-hero-overlay" />
  </div>

  {/* Content */}
  <div className="relative z-10 container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <MapPin className="w-5 h-5 text-white/80" />
              <p className="font-condensed text-xs uppercase tracking-[0.3em] text-white/80 font-light">
                Destinos Náuticos
              </p>
            </div>
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-white mb-6 uppercase tracking-wide drop-shadow-2xl">
              ¿A dónde querés navegar?
            </h1>
            <p className="font-body text-lg text-white/90 leading-relaxed drop-shadow-lg">
              Salimos desde Puerto Norte, Buenos Aires. Todos los destinos con precio diferencial según distancia y duración. Consultá disponibilidad y reservá tu próxima travesía.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination) => (
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
            href="/#booking"
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
