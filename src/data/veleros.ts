import type { Velero } from "@/types/velero";

import velero2 from "@/assets/velero-2.jpg";
import velero3 from "@/assets/velero-3.jpg";
import velero4 from "@/assets/velero-4.jpg";

// Placeholder: las 24 fotos del BELNA se importarán aquí cuando estén disponibles
import velero1 from "@/assets/velero-1.jpg";

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
    imagenes: [velero1],
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
