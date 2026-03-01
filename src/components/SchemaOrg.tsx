import { Helmet } from "react-helmet-async";

const BASE_URL = "https://www.espacionautico.com.ar";

export const OrganizationSchema = () => (
  <Helmet>
    <script type="application/ld+json">{JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Espacio Náutico Buenos Aires",
      "url": BASE_URL,
      "logo": `${BASE_URL}/ENBA-favicon-192x192.png`,
      "image": `${BASE_URL}/ENBA-favicon-192x192.png`,
      "description": "Travesías en velero, escuela náutica oficial, compra-venta de veleros y servicios náuticos en Buenos Aires.",
      "telephone": "+5491149915143",
      "email": "consultas@espacionautico.com.ar",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Puerto Norte Marina",
        "addressLocality": "Palermo",
        "addressRegion": "CABA",
        "addressCountry": "AR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -34.5614,
        "longitude": -58.4178
      },
      "openingHours": "Mo-Su 09:00-18:00",
      "priceRange": "$$",
      "sameAs": [
        "https://www.instagram.com/espacionauticoba"
      ]
    })}</script>
  </Helmet>
);

export const BreadcrumbSchema = ({ items }: { items: { name: string; url: string }[] }) => (
  <Helmet>
    <script type="application/ld+json">{JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items.map((item, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "name": item.name,
        "item": `${BASE_URL}${item.url}`
      }))
    })}</script>
  </Helmet>
);

export const ProductSchema = ({ name, model, price, description, image, url, condition, year }: {
  name: string; model: string; price: string; description: string;
  image: string; url: string; condition: string; year: number;
}) => (
  <Helmet>
    <script type="application/ld+json">{JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      "name": `${name} - ${model}`,
      "description": description,
      "image": image.startsWith("http") ? image : `${BASE_URL}${image}`,
      "url": `${BASE_URL}${url}`,
      "brand": { "@type": "Brand", "name": model },
      "offers": {
        "@type": "Offer",
        "price": price.replace(/[^0-9.]/g, ""),
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/UsedCondition",
        "seller": { "@type": "Organization", "name": "Espacio Náutico Buenos Aires" }
      },
      "additionalProperty": [
        { "@type": "PropertyValue", "name": "Año", "value": year },
        { "@type": "PropertyValue", "name": "Estado", "value": condition }
      ]
    })}</script>
  </Helmet>
);

export const CourseSchema = () => (
  <Helmet>
    <script type="application/ld+json">{JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "Curso de Timonel y Patrón de Yate",
      "description": "Cursos náuticos oficiales habilitados por Prefectura Naval Argentina. Formación de timoneles y patrones con instructores certificados.",
      "provider": {
        "@type": "Organization",
        "name": "Espacio Náutico Buenos Aires",
        "url": BASE_URL
      },
      "educationalLevel": "Beginner to Intermediate",
      "availableLanguage": "es",
      "locationCreated": {
        "@type": "Place",
        "name": "Puerto Norte Marina, Palermo, Buenos Aires"
      }
    })}</script>
  </Helmet>
);

export const TouristTripSchema = ({ name, description, duration, url }: {
  name: string; description: string; duration: string; url: string;
}) => (
  <Helmet>
    <script type="application/ld+json">{JSON.stringify({
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      "name": `Travesía en velero a ${name}`,
      "description": description,
      "touristType": "Nautical tourism",
      "url": `${BASE_URL}${url}`,
      "itinerary": {
        "@type": "ItemList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Salida desde Puerto Norte, Buenos Aires" },
          { "@type": "ListItem", "position": 2, "name": `Navegación a ${name}` },
          { "@type": "ListItem", "position": 3, "name": `Estadía ${duration}` }
        ]
      },
      "provider": { "@type": "Organization", "name": "Espacio Náutico Buenos Aires" }
    })}</script>
  </Helmet>
);
