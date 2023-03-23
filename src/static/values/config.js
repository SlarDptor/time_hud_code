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
  [ACK.RELAX]: "Relax",
};

export const ALTERNATE_DAYS = {
  [PTK.STANDARD]: {
    DNL: "Día No Laboral", //Día sin trabajo.
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
    },
    [ACK.PROY]: {
      /* Cualquier cosa que sea para el progreso de algo personal: ejercicio, compras, ayudar a hoo,
      salud, proyectos de cualquier tipo, investigación, trámites, cosas domésticas, etc... */
      baseMax: "5:30",
    },
    [ACK.ESCR]: {
      /* Escritura. Un caso separado de proyectos para poner meta mínima. */
      baseMax: "0:00",
      DNL: { change: "1:30", sign: "+" },
    },
    [ACK.RELAX]: {
      // Vida, entretenimiento, hoo y relajación.
      baseMax: "9:00",
    },
  },
};

export const PERIOD_TYPES_ENABLED = Object.keys(PTK).length > 1;

export const DAY_DURATION = "16:00";
