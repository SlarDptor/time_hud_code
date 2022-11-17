import React from "react";
import { BsCheckCircle, BsExclamationCircleFill } from "react-icons/bs";

import { CuteCheckbox } from "@common/index";
import { useGeneralStateReader, useGeneralStateUpdator } from "@state/hooks";
import { ops } from "@static/functions";

import { CATEGORIES_NAMES as CGN } from "@static/values/config";
import { ACTIVITY_CATEGORIES as ACK } from "@static/values/keys";

//Interface with fully static styles: elements styles are never gonna change with events and styles are
//statically defined.

function CountersInterface() {
  const gs = useGeneralStateReader("settings", "counters", "registry");
  const updateGS = useGeneralStateUpdator("settings", "counters");

  React.useEffect(() => {
    updateGS.counters.setCountersMaxes(
      ops.calculateCountersMaxTimes(gs.settings)
    );
  }, [gs.settings]);

  React.useEffect(() => {
    updateGS.counters.setCountersDone(
      ops.calculateCountersDoneTime(gs.registry)
    );
  }, [gs.registry]);

  function onCheck(setting, checked) {
    updateGS.settings.setSetting(setting, checked);
  }

  const displayingCounters = Object.keys(gs.counters).filter(
    (ctg) => !ops.isZeroTime(gs.counters[ctg].max)
  );

  return (
    <>
      <div className={STYLES.checkboxesCt}>
        <CuteCheckbox
          onChange={(checked) => onCheck("DNL", checked)}
          checked={gs.settings.DNL}
          label="Día No Laboral"
        />
        <CuteCheckbox
          onChange={(checked) => onCheck("DSE", checked)}
          checked={gs.settings.DSE}
          label="Día Sin Ejercicio"
        />
      </div>

      <div className={STYLES.listCt}>
        <div className={STYLES.header}>
          <p className={STYLES.categoryColumn}>Categoría</p>
          <p className={STYLES.doneColumn}>
            Hecho <span className={STYLES.max}>/ Máx</span>
          </p>
          <p className={STYLES.remainingColumn}>Queda</p>
        </div>

        <div className={STYLES.listContent}>
          {displayingCounters.map((ctg) => {
            const { done, max } = gs.counters[ctg];

            return (
              <div key={ctg} className={STYLES.row}>
                <p className={STYLES.categoryColumn}>{CGN[ctg]}</p>
                <p className={STYLES.doneColumn}>
                  {done} <span className={STYLES.max}>/ {max}</span>
                </p>
                <div className={STYLES.remainingColumn + STYLES.remainingCell}>
                  {ops.substractTimes(max, done)}
                  {max == done &&
                    (MAX_IS[ctg] == "goal" ? (
                      <BsCheckCircle className={STYLES.goalIcon} />
                    ) : (
                      <BsExclamationCircleFill className={STYLES.limitIcon} />
                    ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

//prettier-ignore
const STYLES = {
  checkboxesCt: "flex justify-around items-center mt-2",

  buttons: "mt-6 flex",
  addButton: "shrink-0 w-7/12 flex items-center justify-center mr-1 rounded-md bg-sky-500 text-slate-100 pr-2 py-2",
  minusButton: "grow flex items-center justify-center ml-1 rounded-md bg-yellow-600 text-slate-100 py-2",
  buttonPlus: "w-6 h-6 mr-1",

  listCt: "mt-8 text-lg",
  header: "text-default text-slate-700 flex justify-center items-center border-t-1 border-b-1 border-purple-400 py-2",

  categoryColumn: "w-7/24 shrink-0 text-center text-sky-500 ",
  doneColumn: "grow text-center ",
  remainingColumn: "w-3/12 shrink-0 text-center ",
  max: "ml-2 text-purple-500",
  
  row: "flex items-center text-slate-700 text-light mt-4",
  remainingCell: "flex items-center justify-center",
  goalIcon: "ml-2 text-xl text-emerald-500 mb-2px",
  limitIcon: "ml-2 text-xl text-orange-400 mb-2px",
};

//Tells if the maximum amount is a goal or a limit
const MAX_IS = {
  [ACK.SANA]: "goal",
  [ACK.PROY]: "goal",
  [ACK.BICI]: "goal",

  [ACK.TD]: "limit",
  [ACK.ENTR]: "limit",
  [ACK.VIDA]: "limit",
};

export default CountersInterface;
