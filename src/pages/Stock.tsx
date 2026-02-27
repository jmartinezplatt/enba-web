import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Ruler, Calendar, Anchor, Users } from "lucide-react";
import logoDark from "@/assets/ENBA-horizontal-oscuro.svg";
import velero1 from "@/assets/velero-1.jpg";
import velero2 from "@/assets/velero-2.jpg";
import velero3 from "@/assets/velero-3.jpg";
import velero4 from "@/assets/velero-4.jpg";

interface Velero {
  id: string;
  nombre: string;
  modelo: string;
  eslora: string;
  anio: number;
  capacidad: number;
  motor: string;
  precio: string;
  imagen: string;
  destacado?: boolean;
  estado: string;
  descripcion: string;
  imagePosition?: string;
}

const veleros: Velero[] = [
  {
    id: "1",
    nombre: "Fanático",
    modelo: "Catalina 27",
    eslora: "8.2m (27 pies)",
    anio: 1985,
    capacidad: 6,
    motor: "Fuera de borda 9.9 HP",
    precio: "USD 18.000",
    imagen: velero1,
    destacado: true,
    estado: "Excelente",
    descripcion: "Velero clásico ideal para navegación costera y travesías cortas. Equipado con velas nuevas y electrónica actualizada.",
    imagePosition: "center 70%",
  },
  {
    id: "2",
    nombre: "Viento Sur",
    modelo: "Flicka 20",
    eslora: "6.1m (20 pies)",
    anio: 1990,
    capacidad: 4,
    motor: "Fuera de borda 6 HP",
    precio: "USD 12.500",
    imagen: velero2,
    estado: "Muy bueno",
    descripcion: "Compacto y marinero. Ideal para iniciarse en la navegación a vela con cabina habitable para dos personas.",
  },
  {
    id: "3",
    nombre: "Marejada",
    modelo: "Hunter 33",
    eslora: "10m (33 pies)",
    anio: 2002,
    capacidad: 8,
    motor: "Intraborda Yanmar 27 HP",
    precio: "USD 35.000",
    imagen: velero3,
    estado: "Excelente",
    descripcion: "Espacioso crucero con cocina completa, baño y dos camarotes. Listo para travesías largas con total confort.",
  },
  {
    id: "4",
    nombre: "Brisa",
    modelo: "Grampian 26",
    eslora: "7.9m (26 pies)",
    anio: 1978,
    capacidad: 5,
    motor: "Fuera de borda 8 HP",
    precio: "USD 9.800",
    imagen: velero4,
    estado: "Bueno — navegando",
    descripcion: "Velero sólido y confiable, ideal para paseos en el Delta y Río de la Plata. Precio de oportunidad.",
  },
];

const VeleroCard = ({ velero, index }: { velero: Velero; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className={`group rounded-lg border border-border bg-card overflow-hidden shadow-nautical hover:shadow-nautical-hover transition-shadow duration-300 ${
      velero.destacado ? "ring-2 ring-accent" : ""
    }`}
  >
    <div className="relative h-56 overflow-hidden">
      <img
        src={velero.imagen}
        alt={`${velero.nombre} - ${velero.modelo}`}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        style={velero.imagePosition ? { objectPosition: velero.imagePosition } : undefined}
        loading="lazy"
      />
      {velero.destacado && (
        <span className="absolute top-3 right-3 bg-accent text-accent-foreground text-xs font-semibold font-body uppercase tracking-wider px-3 py-1 rounded-full">
          Destacado
        </span>
      )}
    </div>

    <div className="p-5 space-y-4">
      <div>
        <h3 className="font-heading text-2xl font-bold text-foreground uppercase tracking-wide">
          {velero.nombre}
        </h3>
        <p className="font-condensed text-sm text-muted-foreground tracking-wider uppercase">
          {velero.modelo}
        </p>
      </div>

      <p className="font-body text-sm text-muted-foreground leading-relaxed">
        {velero.descripcion}
      </p>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2 text-sm text-foreground/80">
          <Ruler className="w-4 h-4 text-accent" />
          <span className="font-body">{velero.eslora}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-foreground/80">
          <Calendar className="w-4 h-4 text-accent" />
          <span className="font-body">Año {velero.anio}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-foreground/80">
          <Users className="w-4 h-4 text-accent" />
          <span className="font-body">{velero.capacidad} personas</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-foreground/80">
          <Anchor className="w-4 h-4 text-accent" />
          <span className="font-body">{velero.estado}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-border">
        <span className="font-heading text-2xl font-bold text-accent">
          {velero.precio}
        </span>
        <a
          href={`https://wa.me/5491100000000?text=Hola! Me interesa el velero ${velero.nombre} (${velero.modelo})`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-body text-sm font-semibold tracking-wide uppercase transition-all hover:opacity-90"
        >
          Consultar
        </a>
      </div>
    </div>
  </motion.div>
);

const Stock = () => {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={logoDark} alt="Espacio Náutico BsAs" className="h-10 w-auto" />
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-6 text-center space-y-4">
          <p className="font-condensed text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Broker Náutico
          </p>
          <h1 className="font-heading text-5xl lg:text-6xl font-bold text-foreground uppercase tracking-wide">
            Veleros en Venta
          </h1>
          <p className="font-body text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Stock propio verificado. Todos los veleros cuentan con inspección completa y están listos para navegar.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {veleros.map((velero, index) => (
              <VeleroCard key={velero.id} velero={velero} index={index} />
            ))}
          </div>

          <div className="mt-16 text-center space-y-4">
            <p className="font-body text-muted-foreground">
              ¿Querés vender tu velero? Compramos directo — pago inmediato.
            </p>
            <a
              href="https://wa.me/5491100000000?text=Hola! Quiero vender mi velero"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-accent text-accent-foreground px-6 py-3 rounded-md font-body text-sm font-semibold tracking-wide uppercase transition-all hover:opacity-90"
            >
              Contactanos
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Stock;
