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

export const CATEGORIES_DESCRIPTIONS = {
  [ACK.TRABAJO]:
    "Kamai los martes, miércoles y 1/2 viernes. Portfolio y búsqueda de trabajo los lunes, jueves y 1/2 viernes.",
  [ACK.PERSONAL]:
    "Cuidado y responsabilidades personales: tareas domésticas, ejercicio, compras, ayudar a hoo, salud, trámites, etc...",
  [ACK.HISTORIAS]: "Escritura y progreso hacia la creación de historias.",
  [ACK.RESEARCH]: "Investigación tecnológica y actualización de herramientas.",
  [ACK.RELAX]:
    "Vida, relajación en general, tiempo con hoo y entretenimiento. No olvides disfrutar todo en el día; el vicio siempre estará ahí.",
};

export const ALTERNATE_DAYS = {
  [PTK.STANDARD]: {
    DNL: "Día No Laboral", //Día sin trabajo oficial pero sí enfocado en proyectos.
  },
};

//CONSISTENCIA > INTENSIDAD
//De nada sirve aumentar la productividad si a las 2 semanas te termina quemando y tenes que descansar.
export const COUNTERS_PARAMS = {
  [PTK.STANDARD]: {
    [ACK.TRABAJO]: {
      baseMax: "1:30",
      DNL: { change: "1:30", sign: "-" },
    },
    [ACK.PERSONAL]: {
      baseMax: "4:00",
    },
    [ACK.HISTORIAS]: {
      baseMax: "0:00",
      DNL: { change: "1:30", sign: "+" },
    },
    [ACK.RESEARCH]: {
      baseMax: "1:30",
    },
    [ACK.RELAX]: {
      baseMax: "9:00",
    },
  },
};

export const PERIOD_TYPES_ENABLED = Object.keys(PTK).length > 1;

export const DAY_DURATION = "16:00";
