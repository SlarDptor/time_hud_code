import React from "react";
import { BsClock } from "react-icons/bs";

import { VERSION } from "@static/values/config";

function NoInterfaceInterface() {
  return (
    <>
      <BsClock className={STYLES.icon} />

      <p className={STYLES.title}>Time HUD</p>

      <p className={STYLES.version}>v {VERSION}</p>

      <p className={STYLES.dedication}>by SlarDptor, for myself</p>
    </>
  );
}

const STYLES = {
  icon: "mt-24 mx-auto w-30 h-30 text-teal-400",
  title: "mt-6 text-center text-6xl text-teal-400 leading-tight",
  version: "text-center text-lg text-slate-600 text-light",
  dedication:
    "mt-12 w-10/12 mx-auto border-1 py-2 rounded-sm text-center text-lg text-slate-500 text-light",
};

export default NoInterfaceInterface;
