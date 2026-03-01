import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Ruler, Calendar, Anchor, Users } from "lucide-react";
import type { Velero } from "@/types/velero";
import VeleroCarousel from "./VeleroCarousel";
import VeleroDetailModal from "./VeleroDetailModal";

interface VeleroCardProps {
  velero: Velero;
  index: number;
}

const VeleroCard = ({ velero, index }: VeleroCardProps) => {
  const [detailOpen, setDetailOpen] = useState(false);

  const whatsappUrl = `https://wa.me/5491149915143?text=${encodeURIComponent(
    `Hola! Me interesa el velero ${velero.nombre} (${velero.modelo})`
  )}`;

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

              {/* WhatsApp icon button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-md transition-colors"
                aria-label={`Consultar por WhatsApp sobre ${velero.nombre}`}
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
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
