import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { BreadcrumbSchema } from "@/components/SchemaOrg";
import { Anchor } from "lucide-react";
import heroBroker from "@/assets/hero-broker.jpg";
import { veleros } from "@/data/veleros";
import VeleroCard from "@/components/stock/VeleroCard";

const Stock = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Veleros en Venta Buenos Aires | Broker Náutico — Espacio Náutico"
        description="Veleros usados en venta con inspección completa. BELNA, PICANTE y más. Stock propio verificado y listo para navegar. Compra-venta de veleros en Buenos Aires."
        path="/veleros-en-venta"
      />
      <BreadcrumbSchema items={[
        { name: "Inicio", url: "/" },
        { name: "Veleros en Venta", url: "/veleros-en-venta" },
      ]} />
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroBroker}
            alt="Veleros usados en venta en marina de Buenos Aires — broker náutico con stock verificado"
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
              Veleros en Venta en Buenos Aires
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
          <h2 className="font-heading text-3xl font-bold text-foreground uppercase tracking-wide mb-8">
            Stock de veleros usados verificados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {veleros.map((velero, index) => (
              <VeleroCard key={velero.id} velero={velero} index={index} />
            ))}
          </div>

          <div className="mt-16 text-center space-y-4">
            <h2 className="font-heading text-2xl font-bold text-foreground uppercase tracking-wide">
              ¿Querés vender tu velero?
            </h2>
            <p className="font-body text-muted-foreground">
              Compramos directo — pago inmediato. Tasación gratuita en 24hs.
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
