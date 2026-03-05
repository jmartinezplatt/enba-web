import type { Velero } from "@/types/velero";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Ruler, Calendar, Users, Anchor, Ship, MessageCircle } from "lucide-react";
import { openCrispChat } from "@/lib/crisp";

interface VeleroDetailModalProps {
  velero: Velero;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const VeleroDetailModal = ({
  velero,
  open,
  onOpenChange,
}: VeleroDetailModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading text-3xl font-bold text-foreground uppercase tracking-wide">
            {velero.nombre}
          </DialogTitle>
          <p className="font-condensed text-sm text-muted-foreground tracking-wider uppercase">
            {velero.modelo}
          </p>
        </DialogHeader>

        {/* Specs grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-b border-border">
          <div className="flex items-center gap-2 text-sm text-foreground/80">
            <Ruler className="w-4 h-4 text-accent shrink-0" />
            <span className="font-body">{velero.tamano}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-foreground/80">
            <Calendar className="w-4 h-4 text-accent shrink-0" />
            <span className="font-body">Año {velero.anio}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-foreground/80">
            <Users className="w-4 h-4 text-accent shrink-0" />
            <span className="font-body">{velero.tripulacion} personas</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-foreground/80">
            <Anchor className="w-4 h-4 text-accent shrink-0" />
            <span className="font-body">{velero.estado}</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 py-2">
          <Ship className="w-5 h-5 text-accent" />
          <span className="font-heading text-2xl font-bold text-accent">
            {velero.precio}
          </span>
        </div>

        {/* Long description */}
        <div className="py-4 border-b border-border">
          <h3 className="font-heading text-lg font-bold text-foreground uppercase tracking-wide mb-3">
            Descripción
          </h3>
          <p className="font-body text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
            {velero.descripcionLarga}
          </p>
        </div>

        {/* Spec sections */}
        {velero.especificaciones.length > 0 && (
          <div className="space-y-5 py-4">
            <h3 className="font-heading text-lg font-bold text-foreground uppercase tracking-wide">
              Especificaciones
            </h3>
            {velero.especificaciones.map((section) => (
              <div key={section.titulo}>
                <h4 className="font-condensed text-sm font-semibold text-accent uppercase tracking-wider mb-2">
                  {section.titulo}
                </h4>
                <ul className="space-y-1">
                  {section.items.map((item, i) => (
                    <li
                      key={i}
                      className="font-body text-sm text-muted-foreground flex items-start gap-2"
                    >
                      <span className="text-accent mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Chat CTA */}
        <div className="pt-4 border-t border-border">
          <button
            onClick={() => openCrispChat({
              page: `/veleros-en-venta/${velero.slug}`,
              velero: velero.nombre,
              modelo: velero.modelo,
            })}
            className="w-full flex items-center justify-center gap-2 bg-accent text-accent-foreground px-4 py-3 rounded-md font-body text-sm font-semibold tracking-wide uppercase transition-all hover:opacity-90"
          >
            <MessageCircle className="w-5 h-5" />
            Consultar
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VeleroDetailModal;
