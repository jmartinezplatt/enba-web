import type { Velero } from "@/types/velero";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Ruler, Calendar, Users, Anchor, Ship } from "lucide-react";

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

        {/* WhatsApp CTA */}
        <div className="pt-4 border-t border-border">
          <a
            href={`https://wa.me/5491149915143?text=${encodeURIComponent(
              `Hola! Me interesa el velero ${velero.nombre} (${velero.modelo}). Vi la ficha en su web y quisiera más información.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-3 rounded-md font-body text-sm font-semibold tracking-wide uppercase transition-colors"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Consultar por WhatsApp
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VeleroDetailModal;
