import { BREAKPOINTS as BPK, ACTIVITY_CATEGORIES as ACK } from "./keys";

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
  [ACK.LEV]: "Levantarse",
  [ACK.SANA]: "Sana",
  [ACK.PROY]: "Proyectos",
  [ACK.BICI]: "Bici",
  [ACK.TD]: "T.D.",
  [ACK.ENTR]: "Entr.",
  [ACK.VIDA]: "Vida",
};

export const COUNTERS_PARAMS = {
  [ACK.SANA]: {
    baseMax: "2:00",
    onDNL: { change: "2:00", sign: "-" },
  },
  [ACK.PROY]: {
    baseMax: "3:00",
    onDNL: { change: "1:00", sign: "-" },
    onDSE: { change: "1:00", sign: "+" },
  },
  [ACK.BICI]: {
    baseMax: "2:00",
    onDSE: { change: "2:00", sign: "-" },
  },
  [ACK.TD]: {
    baseMax: "2:00",
    onDSE: { change: "1:00", sign: "+" },
  },
  [ACK.ENTR]: {
    baseMax: "4:00",
    onDNL: { change: "3:00", sign: "+" },
  },
  [ACK.VIDA]: {
    baseMax: "3:00",
  },
};

export const DAY_DURATION = "16:00";
