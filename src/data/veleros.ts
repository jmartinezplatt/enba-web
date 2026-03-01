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
    descripcionLarga: `Velero Mastracchio 24.5 modelo 2014 con orza izable y motor, listo para navegar. Es el resultado de muchos años de experiencia del diseñador Pablo Mastracchio, combinando lo mejor de la navegación de crucero sin dejar atrás las prestaciones de un barco de regata.

Cuenta con un interior de finas terminaciones y un gran espacio en donde su volumen se destaca frente a otros barcos del mismo tamaño. La quilla es izable: 1.40 m de calado en posición inferior y 0.50 m en posición superior, permitiendo llegar con el bote hasta la playa u orilla y subirlo a un tráiler.

Se arbola y desarbola en 20 minutos y se bota en 1 m de agua. Pernoctan cómodamente hasta 5 personas.`,
    especificaciones: [
      {
        titulo: "Datos Técnicos",
        items: [
          "Eslora: 7.25 m (24.5 pies)",
          "Manga: 2.66 m",
          "Calado máximo: 1.40 m (orza abajo)",
          "Calado mínimo: 0.50 m (orza arriba)",
          "Año: 2014",
          "Material: Fibra de vidrio (PRFV)",
          "Diseñador: Pablo Mastracchio",
          "Astillero: Astilleros del Sur",
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
          "Aparejo sloop 7/8",
          "Vela Mayor con dos manos de rizos",
          "Génoa con protección UV",
          "Enrollador de proa",
          "2 molinetes Antal",
        ],
      },
      {
        titulo: "Equipamiento de Cubierta",
        items: [
          "Media carpa",
          "Funda de timón",
          "Accesorio levanta orza en cabina (inox)",
          "Luces de navegación LED",
        ],
      },
      {
        titulo: "Interior y Confort",
        items: [
          "Capacidad para pernoctar: 5 personas",
          "Baño compartimentado con WC",
          "Bacha con monocomando",
          "Anafe",
          "Tanque de agua 60 litros",
          "Sistema de agua eléctrico",
          "Ventana de abrir en baño",
        ],
      },
      {
        titulo: "Electrónica e Instalación Eléctrica",
        items: [
          "Instalación eléctrica 12V",
          "Batería 12V",
          "Panel solar",
          "Radio VHF marina",
          "Compás de mamparo",
        ],
      },
      {
        titulo: "Seguridad y Fondeo",
        items: [
          "Elementos de seguridad exigidos por PNA (Río de la Plata Interior)",
          "Fondeo tipo Danforth",
          "Cadena y cabo de fondeo",
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
