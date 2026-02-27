import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Clock, Moon } from "lucide-react";
import coloniaImage from "@/assets/colonia-sailing.jpg";

const destinations = [
  { name: "Colonia del Sacramento", country: "Uruguay", duration: "1-2 noches", icon: "🇺🇾", popular: true },
  { name: "Carmelo", country: "Uruguay", duration: "2 noches", icon: "🇺🇾", popular: false },
  { name: "Montevideo", country: "Uruguay", duration: "3-4 noches", icon: "🇺🇾", popular: false },
  { name: "Punta del Este", country: "Uruguay", duration: "4-5 noches", icon: "🇺🇾", popular: false },
  { name: "Piriápolis", country: "Uruguay", duration: "3-4 noches", icon: "🇺🇾", popular: false },
  { name: "Juan Lacaze", country: "Uruguay", duration: "1-2 noches", icon: "🇺🇾", popular: false },
  { name: "Riachuelo", country: "Uruguay", duration: "2 noches", icon: "🇺🇾", popular: false },
  { name: "Isla Martín García", country: "Argentina", duration: "1 noche", icon: "🇦🇷", popular: true },
  { name: "Mar del Plata", country: "Argentina", duration: "3-4 noches", icon: "🇦🇷", popular: false },
  { name: "Islas y Arroyos del Delta", country: "Argentina", duration: "1 noche", icon: "🇦🇷", popular: true },
];

const DestinationsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="destinos" className="py-24 lg:py-32 bg-secondary/50">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="font-condensed text-xs uppercase tracking-[0.3em] text-accent font-light mb-4">
            Destinos
          </p>
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-4 uppercase tracking-wide">
            ¿A dónde querés navegar?
          </h2>
          <p className="font-body text-base text-muted-foreground max-w-xl mx-auto">
            Salimos desde Puerto Norte, Buenos Aires. Todos los destinos con precio diferencial según distancia y duración.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Destination image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="rounded-lg overflow-hidden"
          >
            <img
              src={coloniaImage}
              alt="Velero en Colonia del Sacramento, Uruguay"
              className="w-full h-[400px] object-cover"
              loading="lazy"
            />
            <div className="bg-card p-6 border border-border border-t-0 rounded-b-lg">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-accent" />
                <span className="font-body text-sm text-muted-foreground">Destino más solicitado</span>
              </div>
              <h3 className="font-heading text-2xl font-bold text-foreground uppercase tracking-wide">Colonia del Sacramento</h3>
              <p className="font-body text-sm text-muted-foreground mt-2">
                Cruzá el Río de la Plata en velero hasta el encanto colonial de Colonia. Navegación de ida y vuelta con pernocte opcional a bordo.
              </p>
            </div>
          </motion.div>

          {/* Destinations grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-3"
          >
            {destinations.map((dest) => (
              <a
                key={dest.name}
                href="#booking"
                className="flex items-center justify-between p-4 bg-card rounded-lg border border-border transition-all hover:shadow-nautical-hover hover:border-accent/30 group"
              >
                <div className="flex items-center gap-4">
                  <span className="text-xl">{dest.icon}</span>
                  <div>
                    <p className="font-body font-semibold text-foreground group-hover:text-accent transition-colors">
                      {dest.name}
                    </p>
                    <p className="font-body text-xs text-muted-foreground">{dest.country}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {dest.popular && (
                    <span className="text-[10px] uppercase tracking-wider font-body font-bold bg-accent/15 text-accent px-2 py-1 rounded">
                      Popular
                    </span>
                  )}
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Moon className="w-3.5 h-3.5" />
                    <span className="font-body text-xs">{dest.duration}</span>
                  </div>
                </div>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;
