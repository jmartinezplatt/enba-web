import type { Velero } from "@/types/velero";

import velero2 from "@/assets/velero-2.jpg";
import velero3 from "@/assets/velero-3.jpg";
import velero4 from "@/assets/velero-4.jpg";

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
    nombre: "Viento Sur",
    modelo: "Flicka 20",
    descripcionCorta:
      "Compacto y marinero. Ideal para iniciarse en la navegación a vela con cabina habitable para dos personas.",
    tamano: "6.1 m (20 pies)",
    tripulacion: 4,
    anio: 1990,
    estado: "Muy bueno",
    precio: "USD 12.500",
    imagenes: [velero2],
    descripcionLarga:
      "Velero compacto y robusto, ideal para navegación costera y travesías cortas. Cabina habitable para dos personas con equipamiento básico de confort. Motor fuera de borda 6 HP.",
    especificaciones: [
      {
        titulo: "Datos Técnicos",
        items: [
          "Eslora: 6.1 m (20 pies)",
          "Año: 1990",
          "Motor: Fuera de borda 6 HP",
          "Capacidad: 4 personas",
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
