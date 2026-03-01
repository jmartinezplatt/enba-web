import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import BookingSection from "@/components/BookingSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { OrganizationSchema } from "@/components/SchemaOrg";

const Index = () => {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
  }, []);
  return (
    <main>
      <SEOHead
        title="Espacio Náutico Buenos Aires | Travesías en Velero, Escuela Náutica, Broker y Servicios"
        description="Travesías en velero a Uruguay y el Delta. Escuela náutica oficial con cursos de timonel y patrón. Compra-venta de veleros y servicios náuticos. Puerto Norte, Palermo, Buenos Aires."
        path="/"
      />
      <OrganizationSchema />
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <BookingSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
