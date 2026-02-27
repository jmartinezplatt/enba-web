import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Calendar, Users, Send } from "lucide-react";

type BookingType = "travesia" | "paseo" | "entrenamiento" | "curso";

const bookingTypes: { value: BookingType; label: string; description: string }[] = [
  { value: "travesia", label: "Travesía", description: "Navegación con pernocte a destinos nacionales o internacionales" },
  { value: "paseo", label: "Paseo", description: "Navegación de algunas horas por el Río de la Plata" },
  { value: "entrenamiento", label: "Entrenamiento", description: "Clínica de práctica y perfeccionamiento (1-5 hs)" },
  { value: "curso", label: "Curso Náutico", description: "Curso de Timonel o Patrón (3-4 meses)" },
];

const BookingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedType, setSelectedType] = useState<BookingType>("travesia");

  return (
    <section id="booking" className="py-24 lg:py-32 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="font-condensed text-xs uppercase tracking-[0.3em] text-muted-foreground font-light mb-4">
            Reservas
          </p>
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-4 uppercase tracking-wide">
            Reservá tu experiencia
          </h2>
          <p className="font-body text-base text-muted-foreground max-w-lg mx-auto">
            Seleccioná el tipo de actividad y completá el formulario. Nos ponemos en contacto para confirmar disponibilidad y precio.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          {/* Type selector */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {bookingTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setSelectedType(type.value)}
                className={`p-4 rounded-lg border text-left transition-all font-body ${
                  selectedType === type.value
                    ? "bg-primary/10 border-primary shadow-md"
                    : "bg-white border-border hover:border-primary/30 hover:shadow-sm"
                }`}
              >
                <p className="font-semibold text-sm text-foreground">{type.label}</p>
                <p className="text-xs text-muted-foreground mt-1 hidden md:block">{type.description}</p>
              </button>
            ))}
          </div>

          {/* Form */}
          <form
            className="bg-card backdrop-blur-sm rounded-lg p-8 border border-border space-y-5 shadow-sm"
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const data = Object.fromEntries(formData);
              const message = `Hola! Quiero consultar por: ${bookingTypes.find(t => t.value === selectedType)?.label}. Nombre: ${data.name}. Email: ${data.email}. Personas: ${data.people}. Fecha tentativa: ${data.date}. Mensaje: ${data.message || 'Sin mensaje adicional'}`;
              window.open(`https://wa.me/5491100000000?text=${encodeURIComponent(message)}`, '_blank');
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="font-body text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
                  Nombre completo
                </label>
                <input
                  name="name"
                  required
                  className="w-full bg-background border border-border rounded-md px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary transition-colors"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label className="font-body text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full bg-background border border-border rounded-md px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary transition-colors"
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label className="font-body text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
                  <Users className="w-3.5 h-3.5 inline mr-1" /> Personas
                </label>
                <input
                  name="people"
                  type="number"
                  min={1}
                  max={12}
                  defaultValue={2}
                  className="w-full bg-background border border-border rounded-md px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="font-body text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
                  <Calendar className="w-3.5 h-3.5 inline mr-1" /> Fecha tentativa
                </label>
                <input
                  name="date"
                  type="date"
                  className="w-full bg-background border border-border rounded-md px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="font-body text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
                Mensaje (opcional)
              </label>
              <textarea
                name="message"
                rows={3}
                className="w-full bg-background border border-border rounded-md px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary transition-colors resize-none"
                placeholder="Contanos qué te gustaría..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-4 rounded-md font-body font-semibold text-base tracking-wide uppercase flex items-center justify-center gap-2 transition-all hover:opacity-90 shadow-md hover:shadow-lg"
            >
              <Send className="w-4 h-4" />
              Enviar Consulta por WhatsApp
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default BookingSection;
