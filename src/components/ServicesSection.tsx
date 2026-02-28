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
import travesiaPuerto from "@/assets/travesia-puerto.jpg";
import travesiaNavegando from "@/assets/travesia-navegando.jpg";

const services = [
  {
    id: "travesias",
    icon: Compass,
    title: "Travesías & Paseos",
    description:
      "Navegá desde Buenos Aires a puertos de Uruguay y Brasil, Mar del Plata o los arroyos del Delta. Salidas diarias. Experiencia náutica completa a bordo.",
    images: [
      { src: travesiaVelero, position: "center" },
      { src: travesiaCrew, position: "center" },
      { src: travesiaSunset, position: "center" },
      { src: travesia04, position: "center 60%" },
      { src: travesia05, position: "center" },
      { src: travesiaDelta, position: "center 70%" },
      { src: travesiaPuerto, position: "center" },
      { src: travesiaNavegando, position: "center 40%" },
    ],
    features: ["8 veleros modernos totalmente equipados", "Travesías de 1 a 10 días según destino", "Mínimo 3 pasajeros por embarcación", "Incluye: patrón, combustible, desayunos y almuerzos en travesía, pernocte"],
  },
  {
    id: "escuela",
    icon: GraduationCap,
    title: "Escuela Oficial",
    description:
      "Convertite en Timonel o Patrón con cursos habilitados por Prefectura. Examen oficial. También ofrecemos clínicas de perfeccionamiento de 1 a 8 horas para tripulantes que quieran sumar experiencia.",
    images: [{ src: nauticalSchool, position: "center" }],
    features: ["Cursos de 3-4 meses con frecuencia semanal", "Instructores con +10 años de experiencia náutica", "Clínicas de perfeccionamiento y práctica intensiva", "Cupos limitados — solo 3 cursos por año"],
  },
  {
    id: "broker",
    icon: Ship,
    title: "Compra, Venta & Alquiler de Veleros",
    description:
      "¿Vendés tu velero? Te lo compramos con pago inmediato. ¿Querés comprar? Tenemos stock verificado listo para visitar y navegar. Y si tenés carnet náutico, podés alquilar por hora, por día, por semana o por mes.",
    images: [{ src: yachtBroker, position: "center" }],
    features: ["Tasación gratuita en menos de 24hs", "Transferencia y documentación incluidas", "Seguro incluido en todos los alquileres", "Garantía extendida en veleros vendidos"],
  },
  {
    id: "servicios",
    icon: Wrench,
    title: "Servicios Náuticos",
    description:
      "Mantenimiento integral para tu embarcación. Service de motores dentro y fuera de borda, jarcia, cabullería y reparaciones generales. Servicio a domicilio disponible. También gestionamos pintura, velas y winterización con talleres especializados.",
    images: [{ src: boatService, position: "center" }],
    features: ["Servicio en puerto o a domicilio", "Presupuestos en 24-48hs", "Red de talleres y proveedores especializados certificados", "Seguimiento post-service incluido"],
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
      <div className="w-full lg:w-1/2 overflow-hidden rounded-lg relative aspect-[3/2]">
        <AnimatePresence mode="sync">
          <motion.img
            key={currentImage}
            src={service.images[currentImage].src}
            alt={`${service.title} - ${currentImage + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: service.images[currentImage].position }}
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
              ? "Turismo Náutico"
              : service.id === "escuela"
              ? "Formación Náutica"
              : service.id === "broker"
              ? "Broker Náutico"
              : "Service & Mantenimiento Náutico"}
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
            {service.id === "travesias" ? (
  <Link
    to="/destinos"
    className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-md font-body text-sm font-semibold tracking-wide uppercase transition-all hover:opacity-90 mt-2"
  >
    Ver Destinos
  </Link>
        ) : (
  
    href="#booking"
    className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-md font-body text-sm font-semibold tracking-wide uppercase transition-all hover:opacity-90 mt-2"
  >
    Consultar
  </a>
)}
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
