import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Compass, Ship, GraduationCap, Wrench } from "lucide-react";
import sailingDeck from "@/assets/sailing-deck.jpg";
import nauticalSchool from "@/assets/nautical-school.jpg";
import yachtBroker from "@/assets/yacht-broker.jpg";
import boatService from "@/assets/boat-service.jpg";

const services = [
  {
    id: "travesias",
    icon: Compass,
    title: "Travesías & Paseos",
    description:
      "Navegaciones desde Buenos Aires a Colonia del Sacramento, Carmelo, Montevideo, Punta del Este, Mar del Plata, Isla Martín García y el Delta. Mínimo una noche a bordo con todo el confort.",
    image: sailingDeck,
    features: ["Destinos nacionales e internacionales", "3 veleros modernos y equipados", "Opción de pernoctar a bordo", "Precios según destino y duración"],
  },
  {
    id: "escuela",
    icon: GraduationCap,
    title: "Escuela Náutica",
    description:
      "Cursos de Timonel y Patrón con preparación para examen oficial. Clínicas y entrenamientos de 1 a 5 horas para quienes ya tienen carnet habilitante.",
    image: nauticalSchool,
    features: ["Cursos de 3-4 meses, frecuencia semanal", "Preparación para examen oficial", "Clínicas de perfeccionamiento", "Cupos limitados — 3 cursos por año"],
  },
  {
    id: "broker",
    icon: Ship,
    title: "Compra & Venta de Veleros",
    description:
      "Compramos tu velero directamente — dinero en el acto. Vendemos con stock propio, veleros verificados y listos. También ofrecemos alquiler por hora, día o semana.",
    image: yachtBroker,
    features: ["Compra directa — pago inmediato", "Stock propio verificado", "Alquiler por hora, día o semana", "Inspección y check completo"],
  },
  {
    id: "servicios",
    icon: Wrench,
    title: "Servicios Náuticos",
    description:
      "Servicio integral para tu embarcación. Desde limpieza y mantenimiento de jarcia y cabullería hasta reparación y service de motores fuera de borda.",
    image: boatService,
    features: ["Limpieza y mantenimiento general", "Service de motores fuera de borda", "Jarcia y cabullería", "Reparaciones y diagnóstico"],
  },
];

const ServiceCard = ({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      id={service.id}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1 }}
      className={`flex flex-col ${
        isEven ? "lg:flex-row" : "lg:flex-row-reverse"
      } gap-8 lg:gap-16 items-center`}
    >
      {/* Image */}
      <div className="w-full lg:w-1/2 overflow-hidden rounded-lg">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-[300px] lg:h-[420px] object-cover transition-transform duration-700 hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="w-full lg:w-1/2 space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center">
            <service.icon className="w-5 h-5 text-accent" />
          </div>
          <p className="font-body text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold">
            {service.id === "travesias"
              ? "Navegación Tarifada"
              : service.id === "escuela"
              ? "Formación Náutica"
              : service.id === "broker"
              ? "Broker Náutico"
              : "Mantenimiento"}
          </p>
        </div>

        <h3 className="font-display text-3xl lg:text-4xl font-bold text-foreground">
          {service.title}
        </h3>

        <p className="font-body text-base text-muted-foreground leading-relaxed">
          {service.description}
        </p>

        <ul className="space-y-2.5">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
              <span className="font-body text-sm text-foreground/80">{feature}</span>
            </li>
          ))}
        </ul>

        <a
          href="#booking"
          className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-md font-body text-sm font-semibold tracking-wide uppercase transition-all hover:opacity-90 mt-2"
        >
          {service.id === "broker" ? "Ver Stock" : "Consultar"}
        </a>
      </div>
    </motion.div>
  );
};

const ServicesSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 space-y-24 lg:space-y-32">
        {services.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} />
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
