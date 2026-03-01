import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { BreadcrumbSchema, BlogPostSchema, FAQPageSchema } from "@/components/SchemaOrg";
import { blogPosts } from "@/data/blog";
import NotFound from "./NotFound";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return <NotFound />;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={post.metaTitle}
        description={post.metaDescription}
        path={`/blog/${post.slug}`}
        type="article"
      />
      <BlogPostSchema
        title={post.title}
        description={post.metaDescription}
        slug={post.slug}
        datePublished={post.datePublished}
      />
      {post.faqs && <FAQPageSchema faqs={post.faqs} />}
      <BreadcrumbSchema items={[
        { name: "Inicio", url: "/" },
        { name: "Blog", url: "/blog" },
        { name: post.title, url: `/blog/${post.slug}` },
      ]} />
      <Navbar />

      {/* Header */}
      <section className="pt-24 pb-8 lg:pt-32 lg:pb-12 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors font-body text-sm mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al blog
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
              <span className="bg-accent/15 text-accent px-2 py-0.5 rounded font-body text-xs font-medium">
                {post.category}
              </span>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span className="font-body text-xs">{post.readTime} de lectura</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5" />
                <span className="font-body text-xs">{post.datePublished}</span>
              </div>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground leading-tight">
              {post.title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <article className="prose prose-lg max-w-none">
            {post.content.map((block, i) => {
              if (block.startsWith("## ")) {
                return (
                  <h2 key={i} className="font-heading text-2xl font-bold text-foreground uppercase tracking-wide mt-10 mb-4">
                    {block.replace("## ", "")}
                  </h2>
                );
              }
              if (block.startsWith("**") && block.includes(":**")) {
                const parts = block.split("\n");
                return (
                  <div key={i} className="my-4">
                    {parts.map((part, j) => {
                      if (part.startsWith("**")) {
                        const boldMatch = part.match(/^\*\*(.+?)\*\*(.*)/);
                        if (boldMatch) {
                          return (
                            <p key={j} className="font-body text-base text-muted-foreground leading-relaxed">
                              <strong className="text-foreground">{boldMatch[1]}</strong>{boldMatch[2]}
                            </p>
                          );
                        }
                      }
                      return (
                        <p key={j} className="font-body text-base text-muted-foreground leading-relaxed">
                          {part}
                        </p>
                      );
                    })}
                  </div>
                );
              }
              if (block.startsWith("- ") || block.startsWith("| ")) {
                const lines = block.split("\n").filter((l) => l.trim());
                if (block.startsWith("| ")) {
                  return (
                    <div key={i} className="my-6 overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr>
                            {lines[0].split("|").filter(Boolean).map((cell, ci) => (
                              <th key={ci} className="border border-border px-4 py-2 bg-muted font-heading text-sm font-semibold text-foreground text-left">
                                {cell.trim()}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {lines.slice(2).map((row, ri) => (
                            <tr key={ri}>
                              {row.split("|").filter(Boolean).map((cell, ci) => (
                                <td key={ci} className="border border-border px-4 py-2 font-body text-sm text-muted-foreground">
                                  {cell.trim()}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                }
                return (
                  <ul key={i} className="my-4 space-y-2">
                    {lines.map((line, li) => (
                      <li key={li} className="flex items-start gap-2 font-body text-base text-muted-foreground leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 flex-shrink-0" />
                        <span dangerouslySetInnerHTML={{ __html: line.replace(/^- /, "").replace(/\*\*(.+?)\*\*/g, "<strong class='text-foreground'>$1</strong>") }} />
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={i} className="font-body text-base text-muted-foreground leading-relaxed my-4"
                   dangerouslySetInnerHTML={{ __html: block.replace(/\*\*(.+?)\*\*/g, "<strong class='text-foreground'>$1</strong>") }}
                />
              );
            })}
          </article>

          {/* FAQ section if present */}
          {post.faqs && post.faqs.length > 0 && (
            <div className="mt-16 pt-8 border-t border-border">
              <h2 className="font-heading text-2xl font-bold text-foreground uppercase tracking-wide mb-6">
                Preguntas Frecuentes
              </h2>
              <div className="space-y-6">
                {post.faqs.map((faq) => (
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
          )}

          {/* CTA */}
          <div className="mt-16 bg-card border border-border rounded-lg p-8 text-center">
            <h2 className="font-heading text-2xl font-bold text-foreground uppercase tracking-wide mb-3">
              ¿Querés saber más?
            </h2>
            <p className="font-body text-base text-muted-foreground mb-6 max-w-lg mx-auto">
              Contactanos por WhatsApp para resolver cualquier duda. Estamos en Puerto Norte Marina, Palermo, Buenos Aires.
            </p>
            <a
              href="https://wa.me/5491149915143?text=Hola! Vi un artículo en su blog y quiero consultar."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-accent text-accent-foreground px-8 py-4 rounded-md font-body font-semibold text-sm tracking-widest uppercase transition-all hover:opacity-90"
            >
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPostPage;
