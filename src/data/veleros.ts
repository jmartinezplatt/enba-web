import type { Velero } from "@/types/velero";

import velero3 from "@/assets/velero-3.jpg";
import velero4 from "@/assets/velero-4.jpg";

// PICANTE – 16 fotos ordenadas: exteriores → cubierta/cockpit → detalle → interior → navegando
import picante01 from "@/assets/picante/IMG_0010.jpg";
import picante02 from "@/assets/picante/IMG_0022.jpg";
import picante03 from "@/assets/picante/IMG_9557.jpg";
import picante04 from "@/assets/picante/5D317C22-031E-47F1-99DB-7BA2891B8A16.jpg";
import picante05 from "@/assets/picante/00DA8424-F5A7-4880-8308-D2EF328A77E8.jpg";
import picante06 from "@/assets/picante/6A7E9D45-6E7A-40EA-AB35-4921A8E9020D.jpg";
import picante07 from "@/assets/picante/400F1144-3502-4C18-AF76-18260FB7DED1.jpg";
import picante08 from "@/assets/picante/D3C54E2B-B379-4DBE-948D-AA1AEB1457A1.jpg";
import picante09 from "@/assets/picante/IMG_9559.jpg";
import picante10 from "@/assets/picante/IMG_9560.jpg";
import picante11 from "@/assets/picante/99808AD6-F4A4-4DE6-8734-48304C139AA3.jpg";
import picante12 from "@/assets/picante/669B2AED-A03F-4A59-A7D7-1CF7488FDACA.jpg";
import picante13 from "@/assets/picante/IMG_0168.jpg";
import picante14 from "@/assets/picante/E13B4A6A-A9E6-46B4-B4A5-BF0BEC028AFB.jpg";
import picante15 from "@/assets/picante/2982D6E2-D8FF-4B9C-8B13-B46DD7EE8876.jpg";
import picante16 from "@/assets/picante/IMG_4441.jpg";

// BELNA – 25 fotos ordenadas: exteriores → cubierta → interior → baño → electrónica
import belna01 from "@/assets/belna/IMG_1021.jpg";
import belna02 from "@/assets/belna/IMG_0979.jpg";
import belna03 from "@/assets/belna/IMG_0982.jpg";
import belna04 from "@/assets/belna/IMG_0985.jpg";
import belna05 from "@/assets/belna/IMG_1037.jpg";
import belna06 from "@/assets/belna/IMG_0991.jpg";
import belna07 from "@/assets/belna/IMG_0976.jpg";
import belna08 from "@/assets/belna/IMG_0943.jpg";
import belna09 from "@/assets/belna/IMG_1033.jpg";
import belna10 from "@/assets/belna/IMG_0956.jpg";
import belna11 from "@/assets/belna/IMG_1046.jpg";
import belna12 from "@/assets/belna/IMG_1040.jpg";
import belna13 from "@/assets/belna/IMG_1041.jpg";
import belna14 from "@/assets/belna/IMG_0949.jpg";
import belna15 from "@/assets/belna/IMG_1038.jpg";
import belna16 from "@/assets/belna/IMG_1043.jpg";
import belna17 from "@/assets/belna/IMG_0968.jpg";
import belna18 from "@/assets/belna/IMG_1047.jpg";
import belna19 from "@/assets/belna/IMG_0903.jpg";
import belna20 from "@/assets/belna/IMG_1024.jpg";
import belna21 from "@/assets/belna/IMG_1054.jpg";
import belna22 from "@/assets/belna/IMG_0959.jpg";
import belna23 from "@/assets/belna/IMG_1052.jpg";
import belna24 from "@/assets/belna/IMG_0950.jpg";
import belna25 from "@/assets/belna/IMG_0953.jpg";

export const veleros: Velero[] = [
  {
    id: "1",
    nombre: "BELNA",
    modelo: "MASTRACCHIO 24.5",
    descripcionCorta:
      "Velero moderno apto crucero pero ideal para quienes gustan de las regatas o le interese navegar en uno de los veleros más rápidos del Río de la Plata. Confortable y estilizado.",
    tamano: "7.25 m (24.5 pies)",
    tripulacion: 6,
    anio: 2014,
    estado: "Muy bueno",
    precio: "USD 23.500",
    imagenes: [
      belna01, belna02, belna03, belna04, belna05,
      belna06, belna07, belna08, belna09, belna10,
      belna11, belna12, belna13, belna14, belna15,
      belna16, belna17, belna18, belna19, belna20,
      belna21, belna22, belna23, belna24, belna25,
    ],
    destacado: true,
    descripcionLarga: `Velero Mastracchio 24.5 modelo 2014 con orza izable y motor, listo para navegar. Diseñado por Pablo Mastracchio (más de 200 barcos navegando en Chile, Brasil, Argentina, Europa y EEUU), es el resultado de muchos años de experiencia combinando lo mejor de la navegación de crucero sin dejar atrás las prestaciones de un barco de regata.

Velero de 7,20 m de eslora y modernas líneas tanto en cubierta como en el agua, concebido como un daysailer trailerable. Cuenta con quillote izable de 1,40 m de calado en posición inferior y 0,50 m en posición superior, permitiendo junto con el izado del timón, llegar con el bote hasta la orilla y subirlo a un tráiler. Se arbola y desarbola en 20 minutos y se bota en 1 metro de agua.

Interior de finas terminaciones con gran espacio donde su volumen se destaca frente a otros barcos del mismo tamaño. Pernoctan cómodamente 5 personas. Baño compartimentado, cama doble en proa, dinette con mesa en crujía.

Se ha buscado dar buena estabilidad, maniobrabilidad, facilidad de navegación y comodidad, con apéndices de excelente performance adaptados a fórmulas de medición ORC Int, IRC, PHRF y One Design.`,
    especificaciones: [
      {
        titulo: "Datos Técnicos",
        items: [
          "Eslora (LOA): 7.20 m (24.5 pies)",
          "Eslora de flotación (LWL): 6.68 m",
          "Manga: 2.66 m",
          "Calado máximo (orza abajo): 1.40 m",
          "Calado mínimo (orza arriba): 0.50 m",
          "Desplazamiento: 1.400 kg",
          "Lastre: 500 kg",
          "Superficie vélica: 28 m²",
          "Altura interior: 1.50 m",
          "Año: 2014",
          "Material: PRFV (Fibra de vidrio)",
          "Diseñador: Pablo Mastracchio",
          "Astillero: Astilleros del Sur",
        ],
      },
      {
        titulo: "Quilla y Timón",
        items: [
          "Quilla izable con pala y bulbo de hierro (lastre 500 kg)",
          "Malacate manual para izado de quilla",
          "Accesorio levanta-orza en cabina de acero inoxidable",
          "Timón de PRFV con sistema de izado en acero inoxidable 316",
          "Caña de carbono con extensión Spinlock",
        ],
      },
      {
        titulo: "Motorización",
        items: [
          "Motor fuera de borda",
          "Soporte de motor en popa",
          "Tanque de combustible 20 litros",
        ],
      },
      {
        titulo: "Velamen y Arboladura",
        items: [
          "Aparejo sloop 7/8 a tope, crucetas retrasadas 20°",
          "Mástil de aluminio pintado, rebatible",
          "Vela Mayor con dos manos de rizos",
          "Génoa con protección UV y enrollador",
          "2 molinetes Antal",
          "Vang rígido",
          "Lazy bag",
        ],
      },
      {
        titulo: "Cubierta y Estructura",
        items: [
          "Pulpito, candeleros y balcón en acero inoxidable 316",
          "Guardamancebos de acero inoxidable 4 mm",
          "Tres cornamusas de acero inoxidable",
          "Media carpa",
          "Funda de timón",
          "Luces de navegación LED",
          "Escotilla de pañol (PRFV) y acceso al salón",
        ],
      },
      {
        titulo: "Interior y Confort",
        items: [
          "Cama doble en proa + dinette convertible (5 personas)",
          "Colchones de goma espuma de alta densidad",
          "Baño compartimentado con WC, ventana de abrir",
          "Bacha con monocomando y bomba eléctrica presurizada",
          "Anafe",
          "Tanque de agua 60 litros con sistema eléctrico",
          "Mesa en crujía",
          "Iluminación LED interior",
          "Tambucho de ventilación en proa Lewmar",
        ],
      },
      {
        titulo: "Electrónica e Instalación Eléctrica",
        items: [
          "Instalación eléctrica 12V con batería",
          "Panel solar",
          "Cargador de baterías",
          "Radio VHF marina",
          "Compás de mamparo",
          "Bomba de achique automática en sentina",
        ],
      },
      {
        titulo: "Seguridad y Fondeo",
        items: [
          "Elementos de seguridad exigidos por PNA (Río de la Plata Interior y Lacustre)",
          "Ancla tipo Danforth 10 kg",
          "5 m de cadena + 21 m de cabo (mena 10 mm)",
          "Orinque de fondeo 20 m",
        ],
      },
    ],
  },
  {
    id: "2",
    nombre: "PICANTE",
    modelo: "BRAMADOR 24",
    descripcionCorta:
      "Velero deportivo y versátil de 24 pies diseñado por Gabriel Schroeder. Combina rendimiento bajo vela con confort a bordo, ideal para crucero en el Río de la Plata.",
    tamano: "7.10 m (24 pies)",
    tripulacion: 4,
    anio: 2013,
    estado: "Muy bueno",
    precio: "USD 29.900",
    imagenes: [
      picante01, picante02, picante03, picante04, picante05,
      picante06, picante07, picante08, picante09, picante10,
      picante11, picante12, picante13, picante14, picante15,
      picante16,
    ],
    descripcionLarga: `Bramador 24 modelo 2013, completamente equipado y listo para navegar. Diseñado por Gabriel Schroeder, es uno de los veleros de 24 pies más reconocidos del Río de la Plata: combina un casco marinero en PRFV con líneas modernas, excelente estabilidad y un interior sorprendentemente amplio para su eslora.

Navega cómodamente a 6 nudos con vientos normales y alcanza más de 9 nudos con viento fuerte, manteniendo control y seguridad incluso en condiciones exigentes. Su calado de 1.40 m le otorga gran estabilidad y performance ceñida.

El interior aprovecha al máximo cada centímetro gracias al diseño "facetado" característico de Schroeder: camarote doble en popa, dinette convertible con mesa en crujía, baño compartimentado con inodoro marino, bacha con monocomando y sistema de agua presurizado con tanque de 75 litros. Cocina equipada con garrafa de gas licuado de 5 kg. Altura interior de 1.63 m, iluminación y equipo de audio X-View DA-1000 (AM/FM, MP3, USB) con dos parlantes.

El aparejo es un sloop fraccionado 9/10 con arboladura de Duroal, crucetas retrasadas marca Z Spars y botavara de aluminio de la misma marca. Cuenta con vang rígido Bohn Racing, jarcia de acero inoxidable de 6 mm, dos patines de 1000 mm, stoppers Rutgerson RG750, molinetes Sea Winch Nº 23 y herrajes en acero inoxidable.

El juego de velas Hood incluye mayor de dos rizos Dacron full-batten (15 m²), Génoa III al 110 % de enrollar (14 m²), asimétrico de nylon 0.75 oz (48 m²) y foque con rizos transformable en tormentín de Dacron (7 m²).

Motorización: Suzuki 6 HP 4 tiempos (29 kg, arranque manual, 138 cc) con hélice de tres palas de duroaluminio. Bidón de combustible.

Sistema eléctrico de 12 V con batería de ciclo profundo y cargador inteligente.

Electrónica de navegación Raymarine: VHF RAY49, bidata digital con ecosonda y corredera ST40, piloto automático ST1000 y compás de mamparo Plastimo Contest 101. Antena de tope tipo látigo.

Protección y lonas: media carpa, cubre tambucho, cubre mayor y cubre UV de Génoa, todo de primera.

Seguridad completa: 2 salvavidas reglamentarios, 2 autoinflables con arnés, 1 circular con baliza de posición lumínica automática, 2 andariveles, 4 líneas de vida, 4 arneses, 2 matafuegos (1 ABC 1 kg + 1 HCFC123 2.5 kg), 2 bengalas, espejo de señales, campana, bocina manual, botiquín, prismáticos 2×50, bomba de achique eléctrica Rule 500 GAL/H automática, achicador plástico y achique manual tipo inflador.

Fondeo: 2 anclas Danforth — principal de 8 kg con cadena de 8 mm × 20 m y cabo de 14 mm × 20 m; secundaria de 6 kg con cadena de 6 mm × 10 m y cabo de 14 mm × 10 m. Balón de fondeo incluido.`,
    especificaciones: [
      {
        titulo: "Datos Técnicos",
        items: [
          "Eslora (LOA): 7.10 m (24 pies)",
          "Manga: 2.72 m",
          "Calado: 1.40 m",
          "Puntal: 1.27 m",
          "Desplazamiento: 1.600 kg",
          "Material: PRFV (Fibra de vidrio)",
          "Año: 2013",
          "Diseñador: Gabriel Schroeder",
          "Capacidad: 4 personas",
        ],
      },
      {
        titulo: "Velamen (Hood)",
        items: [
          "Mayor de dos rizos, Dacron full-batten — 15 m²",
          "Génoa III al 110 % de enrollar — 14 m²",
          "Asimétrico de nylon 0.75 oz — 48 m²",
          "Foque con rizos transformable en tormentín, Dacron — 7 m²",
        ],
      },
      {
        titulo: "Arboladura y Aparejo",
        items: [
          "Sloop fraccionado 9/10 de Duroal, crucetas retrasadas — Z Spars",
          "Botavara de aluminio Z Spars",
          "Vang rígido Bohn Racing",
          "Jarcia de acero inoxidable 6 mm",
          "2 patines de 1000 mm",
          "2×3 Stoppers Rutgerson RG750",
          "2 molinetes Sea Winch Nº 23",
          "Motones y herrajes en acero inoxidable",
        ],
      },
      {
        titulo: "Motorización",
        items: [
          "Motor fuera de borda Suzuki 6 HP, 4 tiempos",
          "Arranque manual, 1 cilindro, 138 cc, 29 kg",
          "Hélice de tres palas de duroaluminio",
          "Bidón de combustible",
        ],
      },
      {
        titulo: "Electrónica de Navegación",
        items: [
          "VHF Raymarine RAY49",
          "Bidata digital ecosonda y corredera Raymarine ST40",
          "Piloto automático Raymarine ST1000",
          "Compás de mamparo Plastimo Contest 101",
          "Antena de tope tipo látigo",
        ],
      },
      {
        titulo: "Sistema Eléctrico",
        items: [
          "Circuito 12 V",
          "Batería de ciclo profundo",
          "Cargador inteligente",
        ],
      },
      {
        titulo: "Interior y Confort",
        items: [
          "Camarote doble en popa",
          "Dinette convertible con mesa en crujía",
          "Baño compartimentado con inodoro marino",
          "Bacha con monocomando y bomba de agua presurizada",
          "Tanque de agua de 75 litros",
          "Cocina con garrafa de gas licuado de 5 kg",
          "Altura interior: 1.63 m",
          "Equipo de audio X-View DA-1000 (AM/FM, MP3, USB)",
          "2 parlantes de interior",
        ],
      },
      {
        titulo: "Lonas y Protección",
        items: [
          "Media carpa",
          "Cubre tambucho",
          "Cubre mayor",
          "Cubre UV de Génoa",
        ],
      },
      {
        titulo: "Seguridad",
        items: [
          "2 salvavidas reglamentarios",
          "2 salvavidas autoinflables con arnés",
          "1 salvavidas circular con baliza de posición lumínica automática",
          "2 andariveles y 4 líneas de vida",
          "4 arneses",
          "2 matafuegos (1 ABC 1 kg + 1 HCFC123 2.5 kg)",
          "2 bengalas reglamentarias",
          "Espejo de señales, campana y bocina manual",
          "Prismáticos 2×50",
          "Botiquín reglamentario",
          "Bomba de achique eléctrica Rule 500 GAL/H (automática)",
          "Achicador plástico y achique manual tipo inflador",
        ],
      },
      {
        titulo: "Fondeo",
        items: [
          "Ancla Danforth 8 kg — cadena 8 mm × 20 m + cabo 14 mm × 20 m",
          "Ancla Danforth 6 kg — cadena 6 mm × 10 m + cabo 14 mm × 10 m",
          "Balón de fondeo",
        ],
      },
    ],
  },
  {
    id: "3",
    nombre: "Marejada",
    modelo: "Hunter 33",
    descripcionCorta:
      "Espacioso crucero con cocina completa, baño y dos camarotes. Listo para travesías largas con total confort.",
    tamano: "10 m (33 pies)",
    tripulacion: 8,
    anio: 2002,
    estado: "Excelente",
    precio: "USD 35.000",
    imagenes: [velero3],
    descripcionLarga:
      "Crucero espacioso con cocina completa, baño cerrado y dos camarotes. Motor intraborda Yanmar 27 HP. Equipado para travesías largas con total confort y seguridad.",
    especificaciones: [
      {
        titulo: "Datos Técnicos",
        items: [
          "Eslora: 10 m (33 pies)",
          "Año: 2002",
          "Motor: Intraborda Yanmar 27 HP",
          "Capacidad: 8 personas",
        ],
      },
    ],
  },
  {
    id: "4",
    nombre: "Brisa",
    modelo: "Grampian 26",
    descripcionCorta:
      "Velero sólido y confiable, ideal para paseos en el Delta y Río de la Plata. Precio de oportunidad.",
    tamano: "7.9 m (26 pies)",
    tripulacion: 5,
    anio: 1978,
    estado: "Bueno — navegando",
    precio: "USD 9.800",
    imagenes: [velero4],
    descripcionLarga:
      "Velero sólido y confiable de construcción canadiense. Ideal para paseos en el Delta y Río de la Plata. Motor fuera de borda 8 HP. Precio de oportunidad.",
    especificaciones: [
      {
        titulo: "Datos Técnicos",
        items: [
          "Eslora: 7.9 m (26 pies)",
          "Año: 1978",
          "Motor: Fuera de borda 8 HP",
          "Capacidad: 5 personas",
        ],
      },
    ],
  },
];
