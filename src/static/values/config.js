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
  [ACK.SANA]: "Sana",
  [ACK.PROY]: "Proyectos",
  [ACK.BICI]: "Bici",
  [ACK.TD]: "T.D.",
  [ACK.ENTR]: "Entr.",
  [ACK.VIDA]: "Vida",
};
