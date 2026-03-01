import { motion } from "framer-motion";
import { GraduationCap, Check, Clock, Users, Award, HelpCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { CourseSchema, BreadcrumbSchema, FAQPageSchema } from "@/components/SchemaOrg";
import nauticalSchool from "@/assets/nautical-school.jpg";

const escuelaFaqs = [
  {
    question: "¿Qué requisitos necesito para hacer el curso de timonel en Buenos Aires?",
    answer: "Para inscribirte al curso de timonel necesitás ser mayor de 18 años, tener DNI argentino o pasaporte vigente, y aprobar un apto médico básico. No se requiere experiencia previa en navegación. La escuela te guía en todo el proceso, incluyendo la preparación para el examen oficial ante Prefectura Naval Argentina."
  },
  {
    question: "¿Cuánto dura el curso de timonel y cuál es la modalidad?",
    answer: "El curso de timonel tiene una duración de 3 a 4 meses con clases semanales. Incluye módulos teóricos (navegación, reglamentación, seguridad, meteorología) y prácticas en velero con salida desde Puerto Norte, Palermo. Al finalizar rendís el examen oficial ante Prefectura Naval Argentina."
  },
  {
    question: "¿Qué diferencia hay entre el carnet de timonel y el de patrón de yate?",
    answer: "El carnet de timonel te habilita a conducir embarcaciones deportivas de hasta 9 metros de eslora en aguas interiores y del Río de la Plata. El carnet de patrón de yate amplía la habilitación a embarcaciones de hasta 18 metros de eslora e incluye navegación costera y oceánica. Para obtener el de patrón necesitás tener primero el de timonel vigente."
  },
  {
    question: "¿Cuánto cuesta el curso de timonel en Buenos Aires?",
    answer: "Contactanos por WhatsApp o email para conocer las tarifas actualizadas. El precio incluye material teórico, horas de práctica en velero, seguro y acompañamiento hasta el examen oficial. Ofrecemos facilidades de pago y descuentos para inscripciones grupales."
  },
  {
    question: "¿Dónde se realizan las prácticas de navegación?",
    answer: "Las prácticas de navegación se realizan en veleros de nuestra flota con salida desde Puerto Norte Marina, en Palermo, Buenos Aires, frente al Aeroparque Jorge Newberry. Navegamos en aguas del Río de la Plata interior, ofreciendo condiciones reales de navegación bajo la supervisión de instructores certificados."
  },
  {
    question: "¿Qué son las clínicas de perfeccionamiento náutico?",
    answer: "Las clínicas son sesiones de práctica intensiva de 1 a 8 horas para navegantes que ya tienen carnet y quieren sumar experiencia. Se trabajan maniobras específicas como atraque y desatraque, navegación en ceñida, hombre al agua, fondeo y navegación nocturna. Son ideales para ganar confianza y sumar horas de navegación."
  },
];

const EscuelaNautica = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Escuela Náutica Buenos Aires | Curso de Timonel y Patrón de Yate — Prefectura Naval"
        description="Escuela náutica oficial en Buenos Aires. Cursos de timonel y patrón de yate habilitados por Prefectura Naval Argentina. Clases teóricas y prácticas en velero. Instructores con +10 años. Puerto Norte, Palermo. Inscripción abierta."
        path="/escuela-nautica"
      />
      <CourseSchema />
      <FAQPageSchema faqs={escuelaFaqs} />
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
            alt="Clase de navegación en velero en el Río de la Plata — escuela náutica Buenos Aires con alumnos practicando maniobras"
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
              Escuela Náutica en Buenos Aires
            </h1>
            <p className="font-body text-lg md:text-xl text-white max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
              Convertite en Timonel o Patrón de Yate con cursos oficiales habilitados por Prefectura Naval Argentina. Instructores con más de 10 años de experiencia y prácticas en velero desde Puerto Norte, Palermo.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro SEO content */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="font-heading text-3xl font-bold text-foreground uppercase tracking-wide mb-6">
            Aprendé a navegar en velero en Buenos Aires
          </h2>
          <div className="font-body text-base text-muted-foreground leading-relaxed space-y-4">
            <p>
              Nuestra escuela náutica en Buenos Aires forma timoneles y patrones de yate desde Puerto Norte Marina, en el barrio de Palermo, frente al Aeroparque Jorge Newberry. Somos una de las escuelas náuticas más completas de la Ciudad Autónoma de Buenos Aires, con un programa de formación que combina clases teóricas rigurosas con prácticas reales en velero sobre aguas del Río de la Plata.
            </p>
            <p>
              Todos nuestros cursos están habilitados por Prefectura Naval Argentina (PNA), el organismo que regula y certifica la formación náutica en el país. Al finalizar el curso, rendís el examen oficial ante Prefectura y obtenés tu carnet de timonel o patrón de yate, habilitándote legalmente para conducir embarcaciones deportivas en aguas argentinas.
            </p>
            <p>
              Nuestros instructores son navegantes activos con más de 10 años de experiencia, muchos de ellos patrones de crucero y regata que navegan habitualmente el Río de la Plata, el Delta del Paraná y la costa atlántica argentina. Esta experiencia se traduce en una formación práctica y orientada a la realidad de la navegación local.
            </p>
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="py-8 lg:py-12">
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
                El curso de timonel te habilita para conducir embarcaciones deportivas a motor y vela de hasta 9 metros de eslora en aguas interiores y del Río de la Plata. Es el primer paso para cualquier persona que quiera navegar de forma autónoma y legal en Argentina.
              </p>
              <h3 className="font-heading text-lg font-semibold text-foreground mt-4">Programa de estudio</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                El programa cubre navegación teórica y práctica, reglamentación fluvial y marítima (REGINAVE), seguridad a bordo, señalización náutica, meteorología básica, maniobras de atraque y desatraque, fondeo, y procedimientos de emergencia incluyendo hombre al agua. Las prácticas se realizan en veleros de nuestra flota con salida desde Puerto Norte.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 font-body text-sm text-foreground/80">
                  <Clock className="w-4 h-4 text-accent" /> Duración: 3-4 meses, frecuencia semanal
                </li>
                <li className="flex items-center gap-2 font-body text-sm text-foreground/80">
                  <Users className="w-4 h-4 text-accent" /> Cupos limitados por curso (máximo 8 alumnos)
                </li>
                <li className="flex items-center gap-2 font-body text-sm text-foreground/80">
                  <Award className="w-4 h-4 text-accent" /> Examen oficial ante Prefectura Naval Argentina
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
                El curso de patrón de yate amplía la habilitación a embarcaciones deportivas de hasta 18 metros de eslora, incluyendo navegación costera y oceánica. Es el nivel avanzado para quienes quieren navegar a destinos más lejanos como Montevideo, Punta del Este o la costa atlántica.
              </p>
              <h3 className="font-heading text-lg font-semibold text-foreground mt-4">Contenidos avanzados</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                Profundizá en navegación astronómica y electrónica, meteorología avanzada, planificación de travesías, maniobras complejas con velas, gestión de emergencias a bordo, comunicaciones marítimas y primeros auxilios náuticos. Incluye prácticas de navegación costera con pernocte.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 font-body text-sm text-foreground/80">
                  <Clock className="w-4 h-4 text-accent" /> Duración: 4 meses, frecuencia semanal
                </li>
                <li className="flex items-center gap-2 font-body text-sm text-foreground/80">
                  <Check className="w-4 h-4 text-accent" /> Requisito: Carnet de Timonel vigente
                </li>
                <li className="flex items-center gap-2 font-body text-sm text-foreground/80">
                  <Award className="w-4 h-4 text-accent" /> Habilitación para navegación costera y oceánica
                </li>
              </ul>
            </div>
          </div>

          {/* Clínicas */}
          <div className="bg-card border border-border rounded-lg p-8 mb-16">
            <h2 className="font-heading text-2xl font-bold text-foreground uppercase tracking-wide mb-4">
              Clínicas de Perfeccionamiento Náutico
            </h2>
            <p className="font-body text-base text-muted-foreground leading-relaxed mb-4">
              Para tripulantes que ya tienen carnet y quieren sumar horas de navegación y perfeccionar su técnica, ofrecemos clínicas de práctica intensiva de 1 a 8 horas. Son sesiones personalizadas donde trabajamos maniobras específicas según tu nivel y tus objetivos como navegante.
            </p>
            <h3 className="font-heading text-lg font-semibold text-foreground mb-3">Maniobras que podés practicar</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {["Maniobras de atraque y desatraque en diferentes condiciones", "Navegación a vela en ceñida, través, largo y popa", "Procedimiento de hombre al agua — recuperación de MOB", "Fondeo y amarre en ríos y bahías protegidas", "Navegación nocturna con luces de navegación", "Lectura de cartas náuticas y uso de electrónica de navegación"].map((item) => (
                <li key={item} className="flex items-start gap-2 font-body text-sm text-foreground/80">
                  <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Why us */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="font-heading text-3xl font-bold text-foreground uppercase tracking-wide mb-6">
              Por qué elegir nuestra escuela náutica
            </h2>
            <div className="font-body text-base text-muted-foreground leading-relaxed space-y-4">
              <p>
                A diferencia de otras escuelas náuticas de Buenos Aires que solo ofrecen formación teórica en aula, en Espacio Náutico Buenos Aires la práctica en velero es parte central del programa desde el primer día. Navegamos en condiciones reales del Río de la Plata, con vientos, corrientes y mareas que te preparan para la navegación autónoma.
              </p>
              <p>
                Nuestra ubicación en Puerto Norte Marina, Palermo, nos permite salir a navegar en minutos. No perdemos tiempo en traslados — las prácticas comienzan y terminan en la marina, con acceso directo al Río de la Plata. La flota incluye veleros modernos y completamente equipados, con todos los elementos de seguridad exigidos por Prefectura Naval.
              </p>
              <p>
                Solo dictamos 3 cursos por año con cupos limitados a 8 alumnos por grupo. Esto garantiza una atención personalizada y muchas horas de timón para cada alumno. Nuestro índice de aprobación en el examen oficial de Prefectura supera el 95%.
              </p>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="flex items-center gap-3 mb-8">
              <HelpCircle className="w-6 h-6 text-accent" />
              <h2 className="font-heading text-3xl font-bold text-foreground uppercase tracking-wide">
                Preguntas Frecuentes sobre la Escuela Náutica
              </h2>
            </div>
            <div className="space-y-6">
              {escuelaFaqs.map((faq) => (
                <div key={faq.question} className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-3">
                    {faq.question}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center space-y-4">
            <h2 className="font-heading text-2xl font-bold text-foreground uppercase tracking-wide">
              Inscribite en la escuela náutica
            </h2>
            <p className="font-body text-base text-muted-foreground max-w-lg mx-auto">
              Solo dictamos 3 cursos por año. Consultá las próximas fechas de inicio y asegurá tu lugar en el próximo curso de timonel o patrón de yate.
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
