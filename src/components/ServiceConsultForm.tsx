import { useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// EmailJS configuration — replace these with your real credentials
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY";

const HORARIOS = [
  { value: "8a11", label: "8 a 11 hs" },
  { value: "13a17", label: "13 a 17 hs" },
  { value: "18a21", label: "18 a 21 hs" },
];

const TIPOS_EMBARCACION = [
  { value: "velero", label: "Velero" },
  { value: "yate_motor", label: "Yate motor" },
  { value: "crucero", label: "Crucero" },
  { value: "otro", label: "Otro" },
];

const ESLORAS = [
  { value: "menos_19", label: "Menos de 19 pies" },
  { value: "19_a_26", label: "19 a 26 pies" },
  { value: "27_a_35", label: "27 a 35 pies" },
  { value: "mas_35", label: "Más de 35 pies" },
];

interface ServiceConsultFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ServiceConsultForm = ({ open, onOpenChange }: ServiceConsultFormProps) => {
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    celular: "",
    email: "",
    horario: "",
    tipoEmbarcacion: "",
    eslora: "",
    detalle: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const resetForm = () => {
    setFormData({
      nombre: "",
      celular: "",
      email: "",
      horario: "",
      tipoEmbarcacion: "",
      eslora: "",
      detalle: "",
    });
    setErrors({});
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.nombre.trim()) newErrors.nombre = "Campo obligatorio";
    if (!formData.celular.trim()) {
      newErrors.celular = "Campo obligatorio";
    } else if (!/^\d{3}\s9\s\d{8}$/.test(formData.celular.trim())) {
      newErrors.celular = "Formato: xxx 9 xxxxxxxx";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Campo obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Email inválido";
    }
    if (!formData.horario) newErrors.horario = "Campo obligatorio";
    if (!formData.tipoEmbarcacion) newErrors.tipoEmbarcacion = "Campo obligatorio";
    if (!formData.eslora) newErrors.eslora = "Campo obligatorio";
    if (!formData.detalle.trim()) {
      newErrors.detalle = "Campo obligatorio";
    } else if (formData.detalle.trim().length > 512) {
      newErrors.detalle = "Máximo 512 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getLabel = (value: string, options: { value: string; label: string }[]) =>
    options.find((o) => o.value === value)?.label || value;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSending(true);

    const templateParams = {
      to_email: "consultas@espacionautico.com.ar",
      subject: "CONSULTA SOBRE SERVICIOS NAUTICOS ENBA",
      nombre: formData.nombre,
      celular: formData.celular,
      email: formData.email,
      horario: getLabel(formData.horario, HORARIOS),
      tipo_embarcacion: getLabel(formData.tipoEmbarcacion, TIPOS_EMBARCACION),
      eslora: getLabel(formData.eslora, ESLORAS),
      detalle: formData.detalle,
      message: `
CONSULTA SOBRE SERVICIOS NAUTICOS ENBA

Nombre y apellidos: ${formData.nombre}
Celular/WhatsApp: ${formData.celular}
Email: ${formData.email}
Horario para contactarme: ${getLabel(formData.horario, HORARIOS)}
Tipo de embarcación: ${getLabel(formData.tipoEmbarcacion, TIPOS_EMBARCACION)}
Eslora: ${getLabel(formData.eslora, ESLORAS)}

Detalle del problema o servicio:
${formData.detalle}
      `.trim(),
    };

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY);
      toast.success("Consulta enviada correctamente. En 24hs hábiles le estaremos contestando.");
      resetForm();
      onOpenChange(false);
    } catch {
      toast.error("Error al enviar la consulta. Por favor intentá nuevamente o escribinos a consultas@espacionautico.com.ar");
    } finally {
      setSending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) resetForm(); onOpenChange(isOpen); }}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl uppercase tracking-wide text-center">
            Consulta — Servicios Náuticos
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground text-sm">
            Completá el formulario y nos pondremos en contacto.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          {/* Nombre */}
          <div className="space-y-1.5">
            <Label htmlFor="svc-nombre">Nombre y apellidos</Label>
            <Input
              id="svc-nombre"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              placeholder="Juan Pérez"
            />
            {errors.nombre && <p className="text-xs text-destructive">{errors.nombre}</p>}
          </div>

          {/* Celular */}
          <div className="space-y-1.5">
            <Label htmlFor="svc-celular">Celular / WhatsApp</Label>
            <Input
              id="svc-celular"
              value={formData.celular}
              onChange={(e) => setFormData({ ...formData, celular: e.target.value })}
              placeholder="011 9 12345678"
            />
            {errors.celular && <p className="text-xs text-destructive">{errors.celular}</p>}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <Label htmlFor="svc-email">Email</Label>
            <Input
              id="svc-email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="correo@ejemplo.com"
            />
            {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
          </div>

          {/* Horario */}
          <div className="space-y-1.5">
            <Label>Horario para contactarme</Label>
            <Select value={formData.horario} onValueChange={(v) => setFormData({ ...formData, horario: v })}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccioná una franja horaria" />
              </SelectTrigger>
              <SelectContent>
                {HORARIOS.map((h) => (
                  <SelectItem key={h.value} value={h.value}>{h.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.horario && <p className="text-xs text-destructive">{errors.horario}</p>}
          </div>

          {/* Tipo de embarcación */}
          <div className="space-y-1.5">
            <Label>Tipo de embarcación</Label>
            <Select value={formData.tipoEmbarcacion} onValueChange={(v) => setFormData({ ...formData, tipoEmbarcacion: v })}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccioná el tipo" />
              </SelectTrigger>
              <SelectContent>
                {TIPOS_EMBARCACION.map((t) => (
                  <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.tipoEmbarcacion && <p className="text-xs text-destructive">{errors.tipoEmbarcacion}</p>}
          </div>

          {/* Eslora */}
          <div className="space-y-1.5">
            <Label>Eslora</Label>
            <Select value={formData.eslora} onValueChange={(v) => setFormData({ ...formData, eslora: v })}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccioná la eslora" />
              </SelectTrigger>
              <SelectContent>
                {ESLORAS.map((e) => (
                  <SelectItem key={e.value} value={e.value}>{e.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.eslora && <p className="text-xs text-destructive">{errors.eslora}</p>}
          </div>

          {/* Detalle */}
          <div className="space-y-1.5">
            <Label htmlFor="svc-detalle">Detalle el problema o servicio por el que desea consultar</Label>
            <Textarea
              id="svc-detalle"
              value={formData.detalle}
              onChange={(e) => setFormData({ ...formData, detalle: e.target.value })}
              placeholder="Describí brevemente tu consulta..."
              maxLength={512}
              rows={4}
            />
            <div className="flex justify-between">
              {errors.detalle && <p className="text-xs text-destructive">{errors.detalle}</p>}
              <p className="text-xs text-muted-foreground ml-auto">{formData.detalle.length}/512</p>
            </div>
          </div>

          {/* Mensaje obligatorio */}
          <p className="text-xs text-muted-foreground text-center leading-relaxed border-t border-border pt-4">
            POR FAVOR COMPLETE TODOS LOS CAMPOS YA QUE SON NECESARIOS PARA DARLE LA RESPUESTA QUE CORRESPONDE Y MERECE, EN 24HS HÁBILES LES ESTAREMOS CONTESTANDO.
          </p>

          {/* Botón enviar */}
          <button
            type="submit"
            disabled={sending}
            className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-md font-body text-sm font-semibold tracking-wide uppercase transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sending ? "Enviando..." : "Enviar Consulta"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceConsultForm;
