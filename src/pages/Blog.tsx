import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, Clock, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { BreadcrumbSchema } from "@/components/SchemaOrg";
import { blogPosts } from "@/data/blog";

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Blog Náutico | Guías, Consejos y Novedades — Espacio Náutico Buenos Aires"
        description="Blog de navegación a vela: guías para obtener el carnet de timonel, destinos para navegar en el Río de la Plata, consejos de mantenimiento de veleros, seguridad náutica y más."
        path="/blog"
      />
      <BreadcrumbSchema items={[
        { name: "Inicio", url: "/" },
        { name: "Blog", url: "/blog" },
      ]} />
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <BookOpen className="w-5 h-5 text-accent" />
              <p className="font-condensed text-xs uppercase tracking-[0.3em] text-muted-foreground font-light">
                Blog Náutico
              </p>
            </div>
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-foreground leading-tight mb-6 uppercase tracking-wide">
              Guías y Consejos de Navegación
            </h1>
            <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Todo lo que necesitás saber sobre navegación a vela, cursos náuticos, mantenimiento de veleros y destinos en el Río de la Plata. Artículos escritos por navegantes con experiencia real.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-nautical-hover transition-all duration-300"
              >
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="bg-accent/15 text-accent px-2 py-0.5 rounded font-body text-xs font-medium">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span className="font-body text-xs">{post.readTime}</span>
                    </div>
                  </div>
                  <h2 className="font-heading text-xl font-bold text-foreground leading-tight">
                    {post.title}
                  </h2>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {post.excerpt}
                  </p>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-accent font-body text-sm font-semibold uppercase tracking-wide hover:gap-3 transition-all"
                  >
                    Leer artículo <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
