import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Anchor } from "lucide-react";
import heroBroker from "@/assets/hero-broker.jpg";
import { veleros } from "@/data/veleros";
import VeleroCard from "@/components/stock/VeleroCard";

const Stock = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroBroker}
            alt="Marina con veleros"
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
              <Anchor className="w-5 h-5 text-white/80" />
              <p className="font-condensed text-xs uppercase tracking-[0.3em] text-white/80 font-light drop-shadow-lg">
                Broker Náutico
              </p>
            </div>
            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-6 uppercase tracking-wide drop-shadow-2xl">
              Veleros en Venta
            </h1>
            <p className="font-body text-lg md:text-xl text-white max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-lg">
              Stock propio verificado. Todos los veleros cuentan con inspección
              completa y están listos para navegar.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 lg:py-24">
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
              href="https://wa.me/5491149915143?text=Hola! Quiero vender mi velero"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-accent text-accent-foreground px-6 py-3 rounded-md font-body text-sm font-semibold tracking-wide uppercase transition-all hover:opacity-90"
            >
              Contactanos
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Stock;
