import React from "react";
import { MdMoreTime } from "react-icons/md";
import { CgTimelapse } from "react-icons/cg";

import { useGeneralStateReader, useGeneralStateUpdator } from "@state/hooks";
import { useSwipeDetector } from "@static/react";

import { INTERFACES as IFK } from "@static/values/keys";

function TopTabs() {
  const gs = useGeneralStateReader("settings.currentInterface");
  const updateGS = useGeneralStateUpdator("settings");
  const { direction, distance } = useSwipeDetector();

  React.useEffect(() => {
    if (distance > 100)
      updateGS.settings.setInterface(
        direction == "right" ? IFK.REGISTRY : IFK.COUNTERS
      );
  }, [direction, distance]);

  function changeInterface(ifKey) {
    updateGS.settings.setInterface(
      ifKey == gs.settings.currentInterface ? IFK.NO_INTERFACE : ifKey
    );
  }

  return (
    <div className={STYLES.ct}>
      <div
        onClick={() => changeInterface(IFK.REGISTRY)}
        className={STYLES.tab + STYLES.personsTab}
      >
        <MdMoreTime className={STYLES.tabIcon} />
        Registro
        {gs.settings.currentInterface == IFK.REGISTRY && (
          <div className={STYLES.tumor + STYLES.personsTumor} />
        )}
      </div>
      <div className={STYLES.separator} />
      <div
        onClick={() => changeInterface(IFK.COUNTERS)}
        className={STYLES.tab + STYLES.expensesTab}
      >
        <CgTimelapse className={STYLES.tabIcon} />
        Contadores
        {gs.settings.currentInterface == IFK.COUNTERS && (
          <div className={STYLES.tumor + STYLES.expensesTumor} />
        )}
      </div>
    </div>
  );
}

const STYLES = {
  ct: "absolute w-full top left flex z-50 bg-white",
  tab: "relative flex-1 text-center flex justify-center items-center text-light py-2 text-slate-600 border-b-3 cursor-pointer ",
  tabIcon: "text-2xl mr-2 mb-2px text-slate-500",
  separator: "w-1",
  tumor: "absolute border-r-3 border-b-3 w-2 h-2 -bottom-7px z-40 rotate-45 ",

  personsTab: "border-teal-400",
  personsTumor: "border-teal-400",
  expensesTab: "border-purple-400",
  expensesTumor: "border-purple-400",
};

export default TopTabs;
