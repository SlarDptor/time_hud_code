import projectData from "../../../package.json";
import { BREAKPOINTS as BPK, ACTIVITY_CATEGORIES as ACK } from "./keys";

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

export const COUNTERS_PARAMS = {
  [ACK.SANA]: {
    baseMax: "2:00",
    DNL: { change: "2:00", sign: "-" },
  },
  [ACK.PROY]: {
    baseMax: "3:00",
    DEE: { change: "2:00", sign: "+" },
    DPR: { change: "3:00", sign: "-" },
  },
  [ACK.BICI]: {
    baseMax: "2:00",
    DEE: { change: "2:00", sign: "-" },
    DDD: { change: "2:00", sign: "-" },
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
};

export const DAY_DURATION = "16:00";
