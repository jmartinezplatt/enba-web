import { motion } from "framer-motion";
import { GraduationCap, Check, Clock, Users, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { CourseSchema, BreadcrumbSchema } from "@/components/SchemaOrg";
import nauticalSchool from "@/assets/nautical-school.jpg";

const EscuelaNautica = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Escuela Náutica Buenos Aires | Curso de Timonel y Patrón de Yate"
        description="Cursos náuticos oficiales habilitados por Prefectura Naval Argentina en Buenos Aires. Formación de timoneles y patrones con instructores certificados. Clínicas de perfeccionamiento. Cupos limitados."
        path="/escuela-nautica"
      />
      <CourseSchema />
      <BreadcrumbSchema items={[
        { name: "Inicio", url: "/" },
        { name: "Escuela Náutica", url: "/escuela-nautica" },
      ]} />
      <Navbar />

      {/* Hero */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={nauticalSchool}
            alt="Escuela náutica Buenos Aires — clase de navegación en velero"
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
              <GraduationCap className="w-5 h-5 text-white/80" />
              <p className="font-condensed text-xs uppercase tracking-[0.3em] text-white/80 font-light drop-shadow-lg">
                Formación Náutica Oficial
              </p>
            </div>
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-white leading-tight mb-6 uppercase tracking-wide drop-shadow-2xl">
              Escuela Náutica
            </h1>
            <p className="font-body text-lg md:text-xl text-white max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
              Convertite en Timonel o Patrón con cursos habilitados por Prefectura Naval Argentina. Instructores con más de 10 años de experiencia.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Courses */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Timonel */}
            <div className="bg-card border border-border rounded-lg p-8 space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <Award className="w-6 h-6 text-accent" />
                <h2 className="font-heading text-2xl font-bold text-foreground uppercase tracking-wide">
                  Curso de Timonel
                </h2>
              </div>
              <p className="font-body text-base text-muted-foreground leading-relaxed">
                El curso de Timonel te habilita para conducir embarcaciones deportivas a motor y vela de hasta 9 metros de eslora en aguas interiores y del Río de la Plata. Aprenderás navegación, maniobras, reglamentación, seguridad y meteorología náutica. Incluye clases teóricas y prácticas en velero con salida desde Puerto Norte.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 font-body text-sm text-foreground/80">
                  <Clock className="w-4 h-4 text-accent" /> Duración: 3-4 meses, frecuencia semanal
                </li>
                <li className="flex items-center gap-2 font-body text-sm text-foreground/80">
                  <Users className="w-4 h-4 text-accent" /> Cupos limitados por curso
                </li>
                <li className="flex items-center gap-2 font-body text-sm text-foreground/80">
                  <Award className="w-4 h-4 text-accent" /> Examen oficial ante Prefectura Naval
                </li>
              </ul>
            </div>

            {/* Patrón */}
            <div className="bg-card border border-border rounded-lg p-8 space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <Award className="w-6 h-6 text-accent" />
                <h2 className="font-heading text-2xl font-bold text-foreground uppercase tracking-wide">
                  Curso de Patrón de Yate
                </h2>
              </div>
              <p className="font-body text-base text-muted-foreground leading-relaxed">
                El curso de Patrón amplía la habilitación a embarcaciones deportivas de hasta 18 metros de eslora, incluyendo navegación costera y oceánica. Profundizá en navegación astronómica, meteorología avanzada, maniobras complejas y gestión de emergencias a bordo.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 font-body text-sm text-foreground/80">
                  <Clock className="w-4 h-4 text-accent" /> Duración: 4 meses, frecuencia semanal
                </li>
                <li className="flex items-center gap-2 font-body text-sm text-foreground/80">
                  <Check className="w-4 h-4 text-accent" /> Requisito: Carnet de Timonel vigente
                </li>
                <li className="flex items-center gap-2 font-body text-sm text-foreground/80">
                  <Award className="w-4 h-4 text-accent" /> Habilitación para navegación costera
                </li>
              </ul>
            </div>
          </div>

          {/* Clínicas */}
          <div className="bg-card border border-border rounded-lg p-8 mb-16">
            <h2 className="font-heading text-2xl font-bold text-foreground uppercase tracking-wide mb-4">
              Clínicas de Perfeccionamiento
            </h2>
            <p className="font-body text-base text-muted-foreground leading-relaxed mb-4">
              Para tripulantes que ya tienen experiencia y quieren sumar horas de navegación, ofrecemos clínicas de práctica intensiva de 1 a 8 horas. Practicá maniobras específicas, perfeccioná tu técnica de ceñida, mejoré la coordinación con tu tripulación o simplemente sumá millas.
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {["Maniobras de atraque y desatraque", "Navegación a vela en ceñida y popa", "Hombre al agua — procedimiento de emergencia", "Fondeo y amarre en diferentes condiciones", "Navegación nocturna", "Lectura de cartas náuticas y electrónica"].map((item) => (
                <li key={item} className="flex items-start gap-2 font-body text-sm text-foreground/80">
                  <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="text-center space-y-4">
            <h2 className="font-heading text-2xl font-bold text-foreground uppercase tracking-wide">
              Inscribite ahora
            </h2>
            <p className="font-body text-base text-muted-foreground max-w-lg mx-auto">
              Solo dictamos 3 cursos por año. Consultá las próximas fechas de inicio y asegurá tu lugar.
            </p>
            <a
              href="https://wa.me/5491149915143?text=Hola! Quiero información sobre los cursos de la escuela náutica."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-accent text-accent-foreground px-8 py-4 rounded-md font-body font-semibold text-sm tracking-widest uppercase transition-all hover:opacity-90"
            >
              Consultar Inscripción
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EscuelaNautica;
