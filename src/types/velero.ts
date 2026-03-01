/**
 * Estructura de datos para fichas de stock de veleros.
 * Campos numerados según definición del negocio:
 *
 * 1. FOTOS        - Galería de imágenes
 * 2. NOMBRE       - Nombre del velero
 * 3. MODELO       - Modelo / marca
 * 4. DESCRIPCIÓN CORTA - Resumen breve para la tarjeta
 * 5. TAMAÑO       - Eslora en metros y pies
 * 6. TRIPULACIÓN  - Capacidad de personas
 * 7. AÑO          - Año de fabricación
 * 8. ESTADO       - Condición actual
 * 9. DESCRIPCIÓN LARGA - Detalle extenso con especificaciones
 */

/** Sección de especificaciones para la vista de detalle */
export interface VeleroSpecSection {
  titulo: string;
  items: string[];
}

export interface Velero {
  id: string;

  /** 1. FOTOS - Galería de imágenes (paths o URLs) */
  imagenes: string[];

  /** 2. NOMBRE */
  nombre: string;

  /** 3. MODELO */
  modelo: string;

  /** 4. DESCRIPCIÓN CORTA */
  descripcionCorta: string;

  /** 5. TAMAÑO - Eslora en metros y pies */
  tamano: string;

  /** 6. TRIPULACIÓN - Capacidad de personas */
  tripulacion: number;

  /** 7. AÑO */
  anio: number;

  /** 8. ESTADO */
  estado: string;

  /** 9. DESCRIPCIÓN LARGA - Texto extenso + especificaciones detalladas */
  descripcionLarga: string;

  /** Secciones de especificaciones para "MÁS INFO" */
  especificaciones: VeleroSpecSection[];

  /** Precio de venta */
  precio: string;

  /** Destacado en la lista */
  destacado?: boolean;
}
