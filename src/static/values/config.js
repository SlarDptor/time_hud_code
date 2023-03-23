import projectData from "../../../package.json";
import {
  BREAKPOINTS as BPK,
  ACTIVITY_CATEGORIES as ACK,
  PERIOD_TYPES as PTK,
} from "./keys";

export const LOCAL_STORAGE_NAME = "timeHUDState";
export const STORED_VERSION_NAME = "timeHUDVersion";

export const VERSION = projectData.version;

export const BREAKPOINTS_WIDTHS = {
  [BPK.MONITOR]: 1500,
  [BPK.WIDE_LAPTOP]: 1280,
  [BPK.LAPTOP]: 1024,
  [BPK.HORIZONTAL_TABLET]: 768,
  [BPK.VERTICAL_TABLET]: 500,
  [BPK.PHONE]: 350,
  [BPK.SMALL_PHONE]: 0,
};

export const CATEGORIES_NAMES = {
  [ACK.TRABAJO]: "Trabajo",
  [ACK.PROY]: "Proy.",
  [ACK.ESCR]: "Escribir",
  [ACK.TD]: "T.D.",
  [ACK.RELAX]: "Relax",
  [ACK.HOO]: "Hoo",
  [ACK.VIDA]: "Vida",
};

export const ALTERNATE_DAYS = {
  [PTK.STANDARD]: {
    DNL: "Día No Laboral", //Día sin trabajo y proyectos mínimo.
    DDN: "Día De Natación", //Martes y Jueves.
  },
};

//CONSISTENCIA > INTENSIDAD
//De nada sirve aumentar la productividad si a las 2 semanas te termina quemando y tenes que descansar.
export const COUNTERS_PARAMS = {
  [PTK.STANDARD]: {
    [ACK.TRABAJO]: {
      // Incluye Kamai, armado de portfolio, investigación y búsqueda de trabajo.
      baseMax: "1:30",
      DNL: { change: "1:30", sign: "-" },
      DDN: { change: "0:30", sign: "-" },
    },
    [ACK.PROY]: {
      /* Cualquier cosa que sea para el progreso de algo personal: ejercicio, compras,
      salud, proyectos de cualquier tipo, investigación, trámites, cosas domésticas, etc... */
      baseMax: "2:15",
      DNL: { change: "1:00", sign: "-" },
      DDN: { change: "1:00", sign: "+" },
    },
    [ACK.ESCR]: {
      /* Escritura. Un caso separado de proyectos para poner meta mínima. */
      baseMax: "0:45",
      DNL: { change: "0:45", sign: "-" },
      DDN: { change: "0:15", sign: "-" },
    },
    [ACK.TD]: {
      // Sólo cosas diarias/frecuentes como cocinar y limpiar/ordenar. Si sobra, va a Proy.
      baseMax: "1:30",
    },
    [ACK.RELAX]: {
      // Entretenimiento y relajación.
      baseMax: "6:00",
      DNL: { change: "2:00", sign: "+" },
    },
    [ACK.HOO]: {
      /* Tiempo con Hoo, ya sea divertido o de apoyo.  */
      baseMax: "1:30",
      DNL: { change: "1:15", sign: "+" },
    },
    [ACK.VIDA]: {
      // Necesidades del ser humano: comidas, infusiones, baño, higiene, descanso y simplemente
      // que los cambios no son instantáneos.
      baseMax: "2:30",
    },
  },
};

export const PERIOD_TYPES_ENABLED = Object.keys(PTK).length > 1;

export const DAY_DURATION = "16:00";
