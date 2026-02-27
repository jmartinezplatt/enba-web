import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Compass, Ship, GraduationCap, Wrench } from "lucide-react";
import travesiaSunset from "@/assets/travesia-sunset.jpg";
import travesiaCrew from "@/assets/travesia-crew.jpg";
import travesiaVelero from "@/assets/travesia-velero.jpg";
import travesia04 from "@/assets/travesia-04.jpg";
import travesia05 from "@/assets/travesia-05.jpg";
import travesiaDelta from "@/assets/travesia-delta.jpg";
import nauticalSchool from "@/assets/nautical-school.jpg";
import yachtBroker from "@/assets/yacht-broker.jpg";
import boatService from "@/assets/boat-service.jpg";

const services = [
  {
    id: "travesias",
    icon: Compass,
    title: "Travesías & Paseos",
    description:
      "Partiendo desde Buenos Aires navegá a tu destino soñado dentro de Argentina, Uruguay o Brasil. Planes de todo el dia, aventuras de una o varias noches. Confort, diversion y seguridad siempre a bordo.",
    images: [travesiaVelero, travesiaCrew, travesiaSunset, travesia04, travesia05, travesiaDelta],
    features: ["Destinos nacionales e internacionales (PDE, MDQ, DELTA y muchos mas..)", "Veleros modernos, con seguro y bien equipados", "Opción de pernoctar a bordo", "Precios según destino y duración"],
  },
  {
    id: "escuela",
    icon: GraduationCap,
    title: "Escuela Náutica",
    description:
      "Cursos habilitados de Timonel y Patrón con examen oficial en PNA y carnet incluidos. Clínicas y entrenamientos de 1 a 8 horas para quienes ya tienen carnet habilitante y quieran mejorar habilidades o sumar horas barco.",
    images: [nauticalSchool],
    features: ["Cursos de 3-4 meses, frecuencia semanal", "Preparación para examen oficial", "Clínicas de perfeccionamiento", "Cupos limitados"],
  },
  {
    id: "broker",
    icon: Ship,
    title: "Compra & Venta de Veleros",
    description:
      "Compramos tu velero directamente — dinero en el acto. Vendemos con stock propio, veleros verificados y listos. También ofrecemos alquiler por hora, día o semana.",
    images: [yachtBroker],
    features: ["Compra directa — pago inmediato", "Stock propio verificado", "Alquiler por hora, día o semana", "Inspección y check completo"],
  },
  {
    id: "servicios",
    icon: Wrench,
    title: "Servicios Náuticos",
    description:
      "Servicio integral para tu embarcación. Desde limpieza y mantenimiento de jarcia y cabullería hasta reparación y service de motores fuera de borda.",
    images: [boatService],
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
  const hasSlideshow = service.images.length > 1;
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    if (!hasSlideshow) return;
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % service.images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [hasSlideshow, service.images.length]);

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
      <div className="w-full lg:w-1/2 overflow-hidden rounded-lg relative aspect-[4/3]">
        <AnimatePresence mode="sync">
          <motion.img
            key={currentImage}
            src={service.images[currentImage]}
            alt={`${service.title} - ${currentImage + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            loading="lazy"
          />
        </AnimatePresence>
        {hasSlideshow && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {service.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentImage(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === currentImage ? "bg-white scale-125" : "bg-white/50"
                }`}
                aria-label={`Imagen ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="w-full lg:w-1/2 space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center">
            <service.icon className="w-5 h-5 text-accent" />
          </div>
          <p className="font-condensed text-xs uppercase tracking-[0.2em] text-muted-foreground font-light">
            {service.id === "travesias"
              ? "Navegación Tarifada"
              : service.id === "escuela"
              ? "Formación Náutica"
              : service.id === "broker"
              ? "Broker Náutico"
              : "Mantenimiento"}
          </p>
        </div>

        <h3 className="font-heading text-3xl lg:text-4xl font-bold text-foreground uppercase tracking-wide">
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

        {service.id === "broker" ? (
          <Link
            to="/stock"
            className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-md font-body text-sm font-semibold tracking-wide uppercase transition-all hover:opacity-90 mt-2"
          >
            Ver Stock
          </Link>
        ) : (
          <a
            href={service.id === "travesias" ? "#destinos" : "#booking"}
            className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-md font-body text-sm font-semibold tracking-wide uppercase transition-all hover:opacity-90 mt-2"
          >
            {service.id === "travesias" ? "Ver Destinos" : "Consultar"}
          </a>
        )}
      </div>
    </motion.div>
  );
};

const ServicesSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 space-y-24 lg:space-y-32">
        {services.map((service, index) => (
          <div key={service.id} className="snap-section">
            <ServiceCard service={service} index={index} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
