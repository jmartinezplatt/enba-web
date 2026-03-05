import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Ruler, Calendar, Anchor, Users, MessageCircle } from "lucide-react";
import type { Velero } from "@/types/velero";
import VeleroCarousel from "./VeleroCarousel";
import VeleroDetailModal from "./VeleroDetailModal";
import { openCrispChat } from "@/lib/crisp";

interface VeleroCardProps {
  velero: Velero;
  index: number;
}

const VeleroCard = ({ velero, index }: VeleroCardProps) => {
  const [detailOpen, setDetailOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className={`group rounded-lg border border-border bg-card overflow-hidden shadow-nautical hover:shadow-nautical-hover transition-shadow duration-300 ${
          velero.destacado ? "ring-2 ring-accent" : ""
        }`}
      >
        {/* Carousel / Image section */}
        <VeleroCarousel
          images={velero.imagenes}
          alt={`Velero ${velero.nombre} ${velero.modelo} en venta — ${velero.tamano}, año ${velero.anio}`}
          destacado={velero.destacado}
        />

        <div className="p-5 space-y-4">
          {/* Title + model */}
          <div>
            <h3 className="font-heading text-2xl font-bold text-foreground uppercase tracking-wide">
              {velero.nombre}
            </h3>
            <p className="font-condensed text-sm text-muted-foreground tracking-wider uppercase">
              {velero.modelo}
            </p>
          </div>

          {/* Short description */}
          <p className="font-body text-sm text-muted-foreground leading-relaxed">
            {velero.descripcionCorta}
          </p>

          {/* Specs grid with icons */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-sm text-foreground/80">
              <Ruler className="w-4 h-4 text-accent" />
              <span className="font-body">{velero.tamano}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-foreground/80">
              <Calendar className="w-4 h-4 text-accent" />
              <span className="font-body">Año {velero.anio}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-foreground/80">
              <Users className="w-4 h-4 text-accent" />
              <span className="font-body">{velero.tripulacion} personas</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-foreground/80">
              <Anchor className="w-4 h-4 text-accent" />
              <span className="font-body">{velero.estado}</span>
            </div>
          </div>

          {/* Price + Buttons */}
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <span className="font-heading text-2xl font-bold text-accent">
              {velero.precio}
            </span>

            <div className="flex items-center gap-2">
              {/* MÁS INFO link — SEO-friendly anchor to detail page */}
              <Link
                to={`/veleros-en-venta/${velero.slug}`}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-body text-sm font-semibold tracking-wide uppercase transition-all hover:opacity-90"
              >
                Más Info
              </Link>

              {/* Chat icon button */}
              <button
                onClick={() => openCrispChat({
                  page: `/veleros-en-venta/${velero.slug}`,
                  velero: velero.nombre,
                  modelo: velero.modelo,
                })}
                className="flex items-center justify-center w-10 h-10 bg-accent hover:opacity-90 text-accent-foreground rounded-md transition-colors"
                aria-label={`Consultar sobre ${velero.nombre}`}
              >
                <MessageCircle className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Detail modal */}
      <VeleroDetailModal
        velero={velero}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />
    </>
  );
};

export default VeleroCard;
