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
  [ACK.PROY]: "Proy.",
  [ACK.BICI]: "Bici",
  [ACK.TD]: "T.D.",
  [ACK.ENTR]: "Entret.",
  [ACK.VIDA]: "Vida",
};

export const ALTERNATE_DAYS = {
  [PTK.STANDARD]: {
    DNL: "Día No Laboral",
    DPR: "Día Proy. Red.",
    DDE: "Día De Ejercicio",
    DDD: "Día De Descanso",
  },
  [PTK.WEIGHT_LOSS]: {
    DNL: "Día No Laboral",
    DDD: "Día De Descanso",
  },
};

export const COUNTERS_PARAMS = {
  [PTK.STANDARD]: {
    [ACK.SANA]: {
      baseMax: "2:00",
      DNL: { change: "2:00", sign: "-" },
    },
    [ACK.PROY]: {
      baseMax: "5:00",
      DDE: { change: "2:00", sign: "-" },
      DDD: { change: "2:00", sign: "-" },
      DPR: { change: "3:00", sign: "-" },
    },
    [ACK.BICI]: {
      baseMax: "0:00",
      DDE: { change: "2:00", sign: "+" },
    },
    [ACK.TD]: {
      baseMax: "2:00",
    },
    [ACK.ENTR]: {
      baseMax: "4:00",
      DNL: { change: "2:00", sign: "+" },
      DDD: { change: "2:00", sign: "+" },
      DPR: { change: "3:00", sign: "+" },
    },
    [ACK.VIDA]: {
      baseMax: "3:00",
    },
  },
  [PTK.WEIGHT_LOSS]: {
    [ACK.SANA]: {
      baseMax: "1:30",
      DNL: { change: "1:30", sign: "-" },
    },
    [ACK.PROY]: {
      baseMax: "2:00",
    },
    [ACK.BICI]: {
      baseMax: "2:00",
      DDD: { change: "2:00", sign: "-" },
    },
    [ACK.TD]: {
      baseMax: "2:00",
    },
    [ACK.ENTR]: {
      baseMax: "5:30",
      DNL: { change: "1:30", sign: "+" },
      DDD: { change: "2:00", sign: "+" },
    },
    [ACK.VIDA]: {
      baseMax: "3:00",
    },
  },
};

export const DAY_DURATION = "16:00";
