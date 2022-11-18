import React from "react";
import { BsCheckCircle, BsExclamationCircleFill } from "react-icons/bs";
import { IoReloadOutline, IoWarningOutline } from "react-icons/io5";

import { CuteCheckbox, displayCuteAlert } from "@common/index";
import { useGeneralStateReader, useGeneralStateUpdator } from "@state/hooks";
import { ops } from "@static/functions";

import { CATEGORIES_NAMES as CGN } from "@static/values/config";
import { ACTIVITY_CATEGORIES as ACK } from "@static/values/keys";

//Interface with fully static styles: elements styles are never gonna change with events and styles are
//statically defined.

function CountersInterface() {
  const gs = useGeneralStateReader("settings", "counters", "registry");
  const updateGS = useGeneralStateUpdator("settings", "counters");

  function calculateMaxes() {
    displayCuteAlert({
      Icon: IoWarningOutline,
      title: "¿Recalcular los máximos?",
      body: "(Usando la nueva configuración)",
      button: { text: "No, cancelar" },
      secondButton: {
        text: "Sí, recalcular",
        onClick: (closeAlert) => {
          updateGS.settings.takeMinutes(gs.settings.reassigningMinutes);
          updateGS.counters.setCountersMaxes(
            ops.calculateCountersMaxTimes(gs.settings)
          );
          closeAlert();
        },
      },
      customStyles: STYLES.reloadAlert,
    });
  }

  React.useEffect(() => {
    updateGS.counters.setCountersDone(
      ops.calculateCountersDoneTime(gs.registry)
    );
  }, [gs.registry]);

  function onCheck(setting, checked) {
    updateGS.settings.setSetting(setting, checked);
  }

  function changeMax(categoryKey, operation) {
    const currentMax = gs.counters[categoryKey].max;

    var newMaxTime;
    if (operation == "add") {
      newMaxTime = ops.addTimes(currentMax, CHANGE_TIME);
      updateGS.settings.takeMinutes(CHANGE_MINUTES);
    } else {
      newMaxTime = ops.substractTimes(currentMax, CHANGE_TIME);
      updateGS.settings.addMinutes(CHANGE_MINUTES);
    }

    updateGS.counters.setMax(categoryKey, newMaxTime);
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

      <button onClick={calculateMaxes} className={STYLES.recalculate}>
        <IoReloadOutline className={STYLES.recalculateIcon} /> Recalcular
        máximos
      </button>

      <div className={STYLES.listCt}>
        <div className={STYLES.header}>
          <p className={STYLES.categoryColumn}>Categoría</p>
          <p className={STYLES.doneColumn}>Hecho</p>
          <p className={STYLES.remainingColumn}>Queda</p>
          <p className={STYLES.changeMaxColumn}>Cambiar</p>
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
                <div className={STYLES.changeMaxColumn + STYLES.changeButtons}>
                  <button
                    disabled={ops.isZeroTime(gs.counters[ctg].max)}
                    onClick={() => changeMax(ctg, "take")}
                    className={STYLES.take5Button}
                  >
                    -{CHANGE_MINUTES}
                  </button>

                  <button
                    disabled={gs.settings.reassigningMinutes == 0}
                    onClick={() => changeMax(ctg, "add")}
                    className={STYLES.add5Button}
                  >
                    +{CHANGE_MINUTES}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {gs.settings.reassigningMinutes > 0 && (
          <p className={STYLES.reassigningMinutes}>
            Minutos por Reasignar: {gs.settings.reassigningMinutes}
          </p>
        )}
      </div>
    </>
  );
}

//prettier-ignore
const STYLES = {
  checkboxesCt: "flex justify-around items-center mt-2",
  recalculate: "flex justify-center items-center text-center text-slate-600 text-light border-b-1 border-transparent w-7/12 mx-auto text-purple-500 pb-1 mt-4 focus:border-purple-500",
  recalculateIcon: "text-lg mr-1",

  listCt: "mt-4",
  header: "text-default text-slate-700 flex justify-center items-center border-t-1 border-b-1 border-purple-400 py-2",

  categoryColumn: "w-7/24 shrink-0 text-center text-sky-500 ",
  doneColumn: "w-3/12 shrink-0 text-center ",
  remainingColumn: "w-3/12 shrink-0 text-center ",
  changeMaxColumn: "grow text-center ",
  max: "text-purple-500",

  row: "flex items-center text-slate-700 text-light mt-6",
  remainingCell: "flex items-center justify-center",
  goalIcon: "ml-1 text-lg text-emerald-500 mb-2px",
  limitIcon: "ml-1 text-lg text-orange-400 mb-2px",
  changeButtons: "flex justify-around",
  take5Button: "w-7 border-1 border-orange-400 leading-none p-1 rounded-md text-sm text-orange-400 disabled:border-slate-300 disabled:text-slate-300",
  add5Button: "w-7 border-1 border-emerald-400 leading-none p-1 rounded-md text-sm text-emerald-400 disabled:border-slate-300 disabled:text-slate-300",

  reassigningMinutes: "mt-8 text-center border-1 border-slate-500 w-8/12 py-2 mx-auto rounded-md text-light text-slate-700",

  reloadAlert: {
    title: "text-slate-500 text-light",
    body: "text-slate-700 !text-center",
    icon: "text-red-500",
    rightButton: "xs:text-sm text-red-500 border-red-500 hover:bg-red-500 hover:text-slate-100",
    leftButton: "xs:text-sm"
  },
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

const CHANGE_MINUTES = 5;
const CHANGE_TIME = ops.toTime(CHANGE_MINUTES);

export default CountersInterface;
