export interface Destino {
  id: string;
  name: string;
  country: string;
  flag: string;
  duration: string;
  distance: string;
  image: string;
  popular: boolean;
  description: string;
  includes: string[];
  highlights: string[];
}

import coloniaImage from "@/assets/colonia-sailing.jpg";
import deltaImage from "@/assets/delta-destinos.jpg";
import mardelplataImage from "@/assets/mardelplata-destinos.jpg";
import martingarciaImage from "@/assets/martingarcia-destinos.jpg";
import riachueloImage from "@/assets/riachuelo-destinos.jpg";
import juanlacazeImage from "@/assets/juanlacaze-destinos.jpg";
import piriapolisImage from "@/assets/piriapolis-destinos.jpg";
import puntadelesteImage from "@/assets/puntadeleste-destinos.jpg";
import montevideoImage from "@/assets/montevideo-destinos.jpg";
import carmeloImage from "@/assets/carmelo-destinos.jpg";

export const destinos: Destino[] = [
  {
    id: "colonia",
    name: "Colonia del Sacramento",
    country: "Uruguay",
    flag: "\u{1F1FA}\u{1F1FE}",
    duration: "1-2 noches",
    distance: "50 km",
    image: coloniaImage,
    popular: true,
    description: "Cruzá el Río de la Plata hacia el encanto colonial de Colonia. Calles de piedra, faros históricos y atardeceres inolvidables.",
    includes: ["Navegación ida y vuelta", "Pernocte a bordo", "Desayunos y almuerzos", "Patrón certificado"],
    highlights: ["Ciudad Patrimonio de la Humanidad UNESCO", "Perfecto para fin de semana", "Puerto seguro y bien equipado"]
  },
  {
    id: "carmelo",
    name: "Carmelo",
    country: "Uruguay",
    flag: "\u{1F1FA}\u{1F1FE}",
    duration: "2 noches",
    distance: "180 km",
    image: carmeloImage,
    popular: false,
    description: "Navega hacia el corazón vitivinícola de Uruguay. Bodegas, playas tranquilas y la desembocadura del Río Uruguay.",
    includes: ["Navegación ida y vuelta", "2 noches a bordo", "Todas las comidas", "Patrón certificado"],
    highlights: ["Zona de bodegas premium", "Playas del Río Uruguay", "Menos turístico que Colonia"]
  },
  {
    id: "montevideo",
    name: "Montevideo",
    country: "Uruguay",
    flag: "\u{1F1FA}\u{1F1FE}",
    duration: "3-4 noches",
    distance: "200 km",
    image: montevideoImage,
    popular: false,
    description: "Navegá hacia la capital uruguaya. Ciudad Vieja, Rambla, gastronomía de primer nivel y una gran marina náutica.",
    includes: ["Navegación ida y vuelta", "3-4 noches a bordo", "Todas las comidas", "Patrón certificado"],
    highlights: ["Capital cosmopolita", "Excelente gastronomía", "Puerto de Buceo - marina completa"]
  },
  {
    id: "punta-del-este",
    name: "Punta del Este",
    country: "Uruguay",
    flag: "\u{1F1FA}\u{1F1FE}",
    duration: "4-5 noches",
    distance: "280 km",
    image: puntadelesteImage,
    popular: false,
    description: "El destino más glamoroso del Río de la Plata. Playas, puerto deportivo de lujo y vida nocturna de primer nivel.",
    includes: ["Navegación ida y vuelta", "4-5 noches a bordo", "Todas las comidas", "Patrón certificado"],
    highlights: ["Destino premium", "Puerto de Punta del Este", "Ideal para navegantes exigentes"]
  },
  {
    id: "piriapolis",
    name: "Piriápolis",
    country: "Uruguay",
    flag: "\u{1F1FA}\u{1F1FE}",
    duration: "3-4 noches",
    distance: "240 km",
    image: piriapolisImage,
    popular: false,
    description: "El balneario más antiguo de Uruguay. Cerros, rambla histórica y aguas tranquilas ideales para fondear.",
    includes: ["Navegación ida y vuelta", "3-4 noches a bordo", "Todas las comidas", "Patrón certificado"],
    highlights: ["Perfecto para familias", "Fondeo protegido", "Menos masivo que Punta del Este"]
  },
  {
    id: "juan-lacaze",
    name: "Juan Lacaze",
    country: "Uruguay",
    flag: "\u{1F1FA}\u{1F1FE}",
    duration: "1-2 noches",
    distance: "120 km",
    image: juanlacazeImage,
    popular: false,
    description: "Pueblo tranquilo sobre el Río Uruguay. Ideal para navegantes que buscan autenticidad y calma.",
    includes: ["Navegación ida y vuelta", "1-2 noches a bordo", "Todas las comidas", "Patrón certificado"],
    highlights: ["Destino auténtico", "Menos concurrido", "Excelente para navegación relajada"]
  },
  {
    id: "riachuelo",
    name: "Riachuelo",
    country: "Uruguay",
    flag: "\u{1F1FA}\u{1F1FE}",
    duration: "2 noches",
    distance: "140 km",
    image: riachueloImage,
    popular: false,
    description: "Pueblo pescador con encanto rioplatense. Aguas calmas y experiencia náutica genuina.",
    includes: ["Navegación ida y vuelta", "2 noches a bordo", "Todas las comidas", "Patrón certificado"],
    highlights: ["Pueblo pescador auténtico", "Aguas tranquilas", "Perfecto para desconectar"]
  },
  {
    id: "martin-garcia",
    name: "Isla Martín García",
    country: "Argentina",
    flag: "\u{1F1E6}\u{1F1F7}",
    duration: "1 noche",
    distance: "45 km",
    image: martingarciaImage,
    popular: true,
    description: "Reserva Natural e histórica isla argentina en medio del Río de la Plata. Naturaleza y patrimonio en un solo destino.",
    includes: ["Navegación ida y vuelta", "1 noche a bordo", "Todas las comidas", "Patrón certificado"],
    highlights: ["Reserva Natural protegida", "Historia argentina viva", "Navegación corta desde Buenos Aires"]
  },
  {
    id: "mar-del-plata",
    name: "Mar del Plata",
    country: "Argentina",
    flag: "\u{1F1E6}\u{1F1F7}",
    duration: "3-4 noches",
    distance: "380 km",
    image: mardelplataImage,
    popular: false,
    description: "Navegá por la costa bonaerense hasta la perla del Atlántico. Desafío náutico y destino turístico de primer nivel.",
    includes: ["Navegación ida y vuelta", "3-4 noches a bordo", "Todas las comidas", "Patrón certificado"],
    highlights: ["Navegación oceánica", "Puerto deportivo completo", "Destino turístico consolidado"]
  },
  {
    id: "delta",
    name: "Islas y Arroyos del Delta",
    country: "Argentina",
    flag: "\u{1F1E6}\u{1F1F7}",
    duration: "1 noche",
    distance: "30-60 km",
    image: deltaImage,
    popular: true,
    description: "Explorá los canales, arroyos e islas del Delta del Paraná. Naturaleza a 30 minutos de Buenos Aires.",
    includes: ["Navegación por canales del Delta", "1 noche a bordo", "Todas las comidas", "Patrón certificado"],
    highlights: ["Naturaleza a minutos de la ciudad", "Navegación fluvial protegida", "Ideal para principiantes"]
  }
];
