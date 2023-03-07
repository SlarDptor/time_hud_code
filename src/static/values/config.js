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
  [ACK.EJ]: "Ejerc.",
  [ACK.TD]: "T.D.",
  [ACK.VICIO]: "Vicio",
  [ACK.HOO]: "Hoo",
  [ACK.PAJA]: "Paja",
  [ACK.VIDA]: "Vida",
};

export const ALTERNATE_DAYS = {
  [PTK.STANDARD]: {
    DTR: "Día Tranqui", //Día laboral reducido. 5 por semana.
    DNL: "Día No Laboral", //Día sin trabajo y proyectos mínimo. Consume 2 DTR. No aplicable en DDE ni DTR.
    DDE: "Día De Ejercicio", //Lunes, miércoles y viernes.
  },
};

//CONSISTENCIA > INTENSIDAD
//De nada sirve aumentar la productividad si a las 2 semanas te termina quemando y tenes que descansar.
export const COUNTERS_PARAMS = {
  [PTK.STANDARD]: {
    [ACK.TRABAJO]: {
      // Incluye Kamai, armado de portfolio, investigación y búsqueda de trabajo.
      baseMax: "2:00",
      DTR: { change: "1:00", sign: "-" },
      DNL: { change: "2:00", sign: "-" },
    },
    [ACK.PROY]: {
      /* Cualquier cosa que sea para el progreso de algo personal: compras grandes,
      salud, proyectos de cualquier tipo, trámites, etc... */
      baseMax: "3:00",
      DTR: { change: "1:00", sign: "-" },
      DNL: { change: "2:00", sign: "-" },
      DDE: { change: "2:00", sign: "-" },
    },
    [ACK.EJ]: {
      // Natación los días de ejercicio. Si sobra, va a Proy.
      baseMax: "0:00",
      DDE: { change: "3:30", sign: "+" },
    },
    [ACK.TD]: {
      // Sólo cosas diarias/frecuentes como cocinar y limpiar/ordenar. Si sobra, va a Proy.
      baseMax: "2:00",
      DDE: { change: "1:00", sign: "-" },
    },
    [ACK.VICIO]: {
      // Sólo entretenimiento no sexual.
      baseMax: "3:30",
      DTR: { change: "1:00", sign: "+" },
      DNL: { change: "2:00", sign: "+" },
      DDE: { change: "0:30", sign: "-" },
    },
    [ACK.HOO]: {
      /* Mayormente tiempo con Hoo, ya sea divertido o de apoyo. Pero también incluye 
      conversación casual con los viejos o cualquier persona que no sean los chá. */
      baseMax: "1:15",
      DTR: { change: "0:30", sign: "+" },
      DNL: { change: "1:00", sign: "+" },
    },
    [ACK.PAJA]: {
      // Entretenimiento sexual. Transferible a Vicio, pero no de regreso.
      baseMax: "1:15",
      DTR: { change: "0:30", sign: "+" },
      DNL: { change: "1:00", sign: "+" },
    },
    [ACK.VIDA]: {
      // Necesidades del ser humano: comidas, infusiones, baño, higiene, descanso y simplemente
      // que los cambios no son instantáneos.
      baseMax: "3:00",
    },
  },
};

export const PERIOD_TYPES_ENABLED = Object.keys(PTK).length > 1;

export const DAY_DURATION = "16:00";
