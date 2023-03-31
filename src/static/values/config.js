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
  [ACK.PERSONAL]: "Personal",
  [ACK.HISTORIAS]: "Historias",
  [ACK.RESEARCH]: "Research",
  [ACK.RELAX]: "Relax",
};

//prettier-ignore
export const CATEGORIES_DESCRIPTIONS = {
  [ACK.TRABAJO]: "Portfolio y búsqueda de trabajo.",
  [ACK.PERSONAL]: "Cuidado y responsabilidades personales: tareas domésticas, ejercicio, compras, ayudar a hoo, salud, trámites, etc...",
  [ACK.HISTORIAS]: "Escritura y progreso hacia la creación de historias.",
  [ACK.RESEARCH]: "Investigación tecnológica y progreso en ámbitos desconocidos.",
  [ACK.RELAX]: "Vida, relajación en general, proyectos divertidos, tiempo con hoo y entretenimiento. No olvides disfrutar todo en el día; el vicio siempre estará ahí.",
};

export const ALTERNATE_DAYS = {
  [PTK.STANDARD]: {
    DDN: "Día De Natación",
  },
};

//CONSISTENCIA > INTENSIDAD
//De nada sirve aumentar la productividad si a las 2 semanas te termina quemando y tenes que descansar.
export const COUNTERS_PARAMS = {
  [PTK.STANDARD]: {
    [ACK.TRABAJO]: {
      baseMax: "0:30",
    },
    [ACK.PERSONAL]: {
      baseMax: "3:00",
      DDN: { change: "1:30", sign: "+" },
    },
    [ACK.HISTORIAS]: {
      baseMax: "0:30",
    },
    [ACK.RESEARCH]: {
      baseMax: "0:15",
    },
    [ACK.RELAX]: {
      baseMax: "11:45",
      DDN: { change: "1:30", sign: "-" },
    },
  },
};

export const PERIOD_TYPES_ENABLED = Object.keys(PTK).length > 1;

export const DAY_DURATION = "16:00";
