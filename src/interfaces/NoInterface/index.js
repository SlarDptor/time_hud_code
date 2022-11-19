import React from "react";

import { BsClock } from "react-icons/bs";

function NoInterfaceInterface() {
  return (
    <>
      <BsClock className={STYLES.icon} />

      <p className={STYLES.title}>Time HUD</p>

      <p className={STYLES.subtitle}>by SlarDptor, for Juampi</p>
    </>
  );
}

const STYLES = {
  icon: "mt-24 mx-auto w-30 h-30 text-teal-400",
  title: "mt-8 text-center text-6xl text-teal-400",
  subtitle: "mt-8 text-center text-lg text-slate-500 text-light",
};

export default NoInterfaceInterface;
