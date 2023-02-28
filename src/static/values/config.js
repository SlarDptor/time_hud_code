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
  [ACK.KAMAI]: "Kamai",
  [ACK.PROY]: "Proy.",
  [ACK.EJ]: "Ejerc.",
  [ACK.TD]: "T.D.",
  [ACK.VICIO]: "Vicio",
  [ACK.HOO]: "Hoo",
  [ACK.PAJA]: "Paja",
  [ACK.VIDA]: "Vida",
};

export const ALTERNATE_DAYS = {
  [PTK.STANDARD]: {
    DTR: "Día Tranqui", //Día laboral reducido. 16 por mes.
    DNL: "Día No Laboral", //Día sin trabajo principal (Kamai por ahora). Consume 2 DTR
    DDN: "Día De Natación", //Por ahora, martes y jueves. Lleva más tiempo.
    DSE: "Día Sin Ejercicio", //Los sábados y domingos únicamente.
  },
};

//CONSISTENCIA > INTENSIDAD
export const COUNTERS_PARAMS = {
  [PTK.STANDARD]: {
    [ACK.KAMAI]: {
      // Incluye también trabajos restantes de Sana.
      baseMax: "4:00",
      DTR: { change: "2:00", sign: "-" },
      DNL: { change: "4:00", sign: "-" },
    },
    [ACK.PROY]: {
      /* Cualquier cosa que sea para el progreso de algo personal: compras grandes,
      salud, proyectos de programación, trámites, etc... */
      baseMax: "2:00",
      DDN: { change: "1:00", sign: "-" },
      DSE: { change: "1:00", sign: "+" },
    },
    [ACK.EJ]: {
      // Bicicleta por defecto, luego natación y descanso los findes. Si sobra, va a Proy.
      baseMax: "2:00",
      DDN: { change: "2:00", sign: "+" },
      DSE: { change: "2:00", sign: "-" },
    },
    [ACK.TD]: {
      // Sólo cosas diarias/frecuentes como cocinar y limpiar/ordenar. Si sobra, va a Proy.
      baseMax: "2:00",
      DDN: { change: "0:30", sign: "-" },
      DSE: { change: "0:30", sign: "+" },
    },
    [ACK.VICIO]: {
      // Sólo entretenimiento no sexual.
      baseMax: "2:00",
      DTR: { change: "1:00", sign: "+" },
      DNL: { change: "2:00", sign: "+" },
      DDN: { change: "0:15", sign: "-" },
      DSE: { change: "0:15", sign: "+" },
    },
    [ACK.HOO]: {
      /* Mayormente tiempo con Hoo, ya sea divertido o de apoyo. Pero también incluye 
      conversación casual con los viejos o cualquier persona que no sean los chá. */
      baseMax: "1:00",
      DTR: { change: "0:30", sign: "+" },
      DNL: { change: "1:00", sign: "+" },
    },
    [ACK.PAJA]: {
      // Entretenimiento sexual. Transferible a Vicio, pero no de regreso.
      baseMax: "0:45",
      DTR: { change: "0:30", sign: "+" },
      DNL: { change: "1:00", sign: "+" },
    },
    [ACK.VIDA]: {
      // Necesidades del ser humano: comidas, infusiones, baño, higiene y descanso.
      baseMax: "2:15",
      DDN: { change: "0:15", sign: "-" },
      DSE: { change: "0:15", sign: "+" },
    },
  },
};

export const PERIOD_TYPES_ENABLED = Object.keys(PTK).length > 1;

export const DAY_DURATION = "16:00";
