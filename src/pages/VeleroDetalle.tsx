import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Ruler, Calendar, Users, Anchor, Ship, ArrowLeft, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { ProductSchema, BreadcrumbSchema } from "@/components/SchemaOrg";
import { veleros } from "@/data/veleros";
import VeleroCarousel from "@/components/stock/VeleroCarousel";
import { openCrispChat } from "@/lib/crisp";
import NotFound from "./NotFound";

const VeleroDetalle = () => {
  const { slug } = useParams<{ slug: string }>();
  const velero = veleros.find((v) => v.slug === slug);

  if (!velero) return <NotFound />;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${velero.nombre} ${velero.modelo} en Venta | Espacio Náutico Buenos Aires`}
        description={`${velero.nombre} - ${velero.modelo} (${velero.anio}). ${velero.descripcionCorta} ${velero.precio}. Stock verificado, listo para navegar.`}
        path={`/veleros-en-venta/${velero.slug}`}
      />
      <ProductSchema
        name={velero.nombre}
        model={velero.modelo}
        price={velero.precio}
        description={velero.descripcionCorta}
        image={velero.imagenes[0] || ""}
        url={`/veleros-en-venta/${velero.slug}`}
        condition={velero.estado}
        year={velero.anio}
      />
      <BreadcrumbSchema items={[
        { name: "Inicio", url: "/" },
        { name: "Veleros en Venta", url: "/veleros-en-venta" },
        { name: `${velero.nombre} - ${velero.modelo}`, url: `/veleros-en-venta/${velero.slug}` },
      ]} />
      <Navbar />

      {/* Hero with carousel */}
      <section className="pt-20 pb-8 lg:pt-24">
        <div className="container mx-auto px-6">
          <Link
            to="/veleros-en-venta"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors font-body text-sm mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al stock
          </Link>

          <div className="rounded-lg overflow-hidden border border-border">
            <VeleroCarousel
              images={velero.imagenes}
              alt={`${velero.nombre} - ${velero.modelo}`}
              destacado={velero.destacado}
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-16 lg:pb-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground uppercase tracking-wide">
                  {velero.nombre}
                </h1>
                <p className="font-condensed text-lg text-muted-foreground tracking-wider uppercase mt-2">
                  {velero.modelo}
                </p>
              </motion.div>

              {/* Quick specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-border">
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

              {/* Description */}
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground uppercase tracking-wide mb-4">
                  Descripción
                </h2>
                <p className="font-body text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                  {velero.descripcionLarga}
                </p>
              </div>

              {/* Specifications */}
              {velero.especificaciones.length > 0 && (
                <div className="space-y-6">
                  <h2 className="font-heading text-2xl font-bold text-foreground uppercase tracking-wide">
                    Especificaciones Completas
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {velero.especificaciones.map((section) => (
                      <div key={section.titulo} className="bg-card border border-border rounded-lg p-5">
                        <h3 className="font-condensed text-sm font-semibold text-accent uppercase tracking-wider mb-3">
                          {section.titulo}
                        </h3>
                        <ul className="space-y-1.5">
                          {section.items.map((item, i) => (
                            <li key={i} className="font-body text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-accent mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-accent" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <Ship className="w-5 h-5 text-accent" />
                    <span className="font-heading text-3xl font-bold text-accent">
                      {velero.precio}
                    </span>
                  </div>
                  <p className="font-body text-sm text-muted-foreground">
                    {velero.descripcionCorta}
                  </p>
                  <button
                    onClick={() => openCrispChat({
                      page: `/veleros-en-venta/${velero.slug}`,
                      velero: velero.nombre,
                      modelo: velero.modelo,
                    })}
                    className="w-full flex items-center justify-center gap-2 bg-accent text-accent-foreground px-4 py-3 rounded-md font-body text-sm font-semibold tracking-wide uppercase transition-all hover:opacity-90"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Consultar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default VeleroDetalle;
