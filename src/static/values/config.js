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
  [ACK.SANA]: "Sana",
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
    DNL: "Día No Laboral",
    DSP: "Día Sin Proy.",
    DDN: "Día De Natación",
    DDD: "Día De Descanso",
  },
};

export const COUNTERS_PARAMS = {
  [PTK.STANDARD]: {
    [ACK.SANA]: {
      baseMax: "1:00",
      DNL: { change: "1:00", sign: "-" },
    },
    [ACK.KAMAI]: {
      baseMax: "3:00",
      DNL: { change: "3:00", sign: "-" },
      DDN: { change: "0:30", sign: "-" },
    },
    [ACK.PROY]: {
      baseMax: "2:00",
      DSP: { change: "2:00", sign: "-" },
      DDN: { change: "0:30", sign: "-" },
    },
    [ACK.EJ]: {
      baseMax: "2:00",
      DDN: { change: "2:00", sign: "+" },
      DDD: { change: "2:00", sign: "-" },
    },
    [ACK.TD]: {
      baseMax: "2:00",
    },
    [ACK.VICIO]: {
      baseMax: "1:50",
      DNL: { change: "2:00", sign: "+" },
      DSP: { change: "1:00", sign: "+" },
      DDN: { change: "0:10", sign: "-" },
      DDD: { change: "1:00", sign: "+" },
    },
    [ACK.HOO]: {
      baseMax: "0:50",
      DNL: { change: "1:00", sign: "+" },
      DSP: { change: "0:30", sign: "+" },
      DDN: { change: "0:10", sign: "-" },
      DDD: { change: "0:30", sign: "+" },
    },
    [ACK.PAJA]: {
      baseMax: "0:50",
      DNL: { change: "1:00", sign: "+" },
      DSP: { change: "0:30", sign: "+" },
      DDN: { change: "0:10", sign: "-" },
      DDD: { change: "0:30", sign: "+" },
    },
    [ACK.VIDA]: {
      baseMax: "2:30",
      DDN: { change: "0:30", sign: "-" },
    },
  },
};

export const PERIOD_TYPES_ENABLED = Object.keys(PTK).length > 1;

export const DAY_DURATION = "16:00";
