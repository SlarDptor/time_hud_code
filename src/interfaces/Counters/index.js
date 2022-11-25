import React from "react";
import { BsCheckCircle, BsExclamationCircleFill } from "react-icons/bs";
import { IoReloadOutline, IoWarningOutline } from "react-icons/io5";

import {
  CuteCheckbox,
  CuteModal,
  displayCuteAlert,
  useModalState,
} from "@common/index";
import { useGeneralStateReader, useGeneralStateUpdator } from "@state/hooks";
import { ops } from "@static/functions";

import { CATEGORIES_NAMES as CGN } from "@static/values/config";
import { ACTIVITY_CATEGORIES as ACK } from "@static/values/keys";

import CountersModal from "./Modal";

function CountersInterface() {
  const gs = useGeneralStateReader("settings", "counters", "registry");
  const updateGS = useGeneralStateUpdator("settings", "counters");
  const modal = useModalState();

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
            ops.calculateCountersMaxTimes(gs.settings.alternateDays)
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

  function onCheck(altDayKey, checked) {
    updateGS.settings.setAlternateDay(altDayKey, checked);
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

  function viewCounterSummary(categoryKey) {
    modal.open({ categoryKey });
  }

  const displayingCounters = Object.keys(gs.counters).filter(
    (ctg) => !ops.isZeroTime(gs.counters[ctg].max)
  );

  return (
    <>
      <div className={STYLES.checkboxesCt}>
        <div className={STYLES.checkboxesColumn}>
          <CuteCheckbox
            onChange={(checked) => onCheck("DNL", checked)}
            checked={gs.settings.alternateDays.DNL}
            label="Día No Laboral"
            customDirSty={{ ct: STYLES.leftCheckbox }}
          />
          <CuteCheckbox
            onChange={(checked) => onCheck("DEE", checked)}
            checked={gs.settings.alternateDays.DEE}
            label="Día Entre Ejerc."
            customDirSty={{ ct: STYLES.leftCheckbox }}
          />
          <CuteCheckbox
            onChange={(checked) => onCheck("DMP", checked)}
            checked={gs.settings.alternateDays.DMP}
            label="Día Medios Proy."
            customDirSty={{ ct: STYLES.leftCheckbox }}
          />
        </div>
        <div className={STYLES.checkboxesColumn}>
          <CuteCheckbox
            labelPosition="left"
            onChange={(checked) => onCheck("DST", checked)}
            checked={gs.settings.alternateDays.DST}
            label="Día Sin T.D."
            customDirSty={{ ct: STYLES.rightCheckbox }}
          />
          <CuteCheckbox
            labelPosition="left"
            onChange={(checked) => onCheck("DDD", checked)}
            checked={gs.settings.alternateDays.DDD}
            label="Día De Descanso"
            customDirSty={{ ct: STYLES.rightCheckbox }}
          />
          <CuteCheckbox
            labelPosition="left"
            onChange={(checked) => onCheck("DSP", checked)}
            checked={gs.settings.alternateDays.DSP}
            label="Día Sin Proyectos"
            customDirSty={{ ct: STYLES.rightCheckbox }}
          />
        </div>
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

            const remaining = ops.substractTimes(max, done, false);
            const overTime = remaining.includes("-");

            return (
              <div key={ctg} className={STYLES.row}>
                <p
                  onClick={() => viewCounterSummary(ctg)}
                  className={STYLES.categoryColumn + STYLES.categoryCell}
                >
                  {CGN[ctg]}
                </p>
                <p
                  onClick={() => viewCounterSummary(ctg)}
                  className={STYLES.doneColumn + STYLES.doneCell}
                >
                  {done} <span className={STYLES.max}>/ {max}</span>
                </p>
                <div
                  onClick={() => viewCounterSummary(ctg)}
                  className={STYLES.remainingColumn + STYLES.remainingCell}
                >
                  {remaining}
                  {(ops.isZeroTime(remaining) || overTime) &&
                    (MAX_IS[ctg] == "goal" ? (
                      <BsCheckCircle className={STYLES.goalIcon} />
                    ) : (
                      <BsExclamationCircleFill
                        className={
                          overTime ? STYLES.overLimitIcon : STYLES.limitIcon
                        }
                      />
                    ))}
                </div>
                <div className={STYLES.changeMaxColumn + STYLES.changeMaxCell}>
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
            Minutos por Reasignar:{" "}
            <span className={STYLES.reassigningMinutesNumber}>
              {gs.settings.reassigningMinutes}
            </span>
          </p>
        )}
      </div>

      <CuteModal {...modal.cuteModalProps}>
        <CountersModal {...modal.childrenProps} />
      </CuteModal>
    </>
  );
}

//prettier-ignore
const STYLES = {
  checkboxesCt: "flex",
  checkboxesColumn: "flex-1 flex items-stretch flex-col",
  leftCheckbox: "justify-start py-3 border-b-1 border-slate-300",
  rightCheckbox: "justify-end py-3 border-b-1 border-slate-300",

  recalculate: "flex justify-center items-center text-center text-slate-600 text-light border-1 border-purple-500 w-8/12 rounded-md mx-auto text-purple-500 py-2 mt-4 focus:text-slate-100 focus:bg-purple-500",
  recalculateIcon: "text-lg mr-1",

  listCt: "mt-8",
  header: "text-default text-slate-700 flex justify-center items-center border-t-1 border-b-1 border-purple-400",

  categoryColumn: "w-3/12 py-3 shrink-0 text-center ",
  doneColumn: "w-7/24 py-3 shrink-0 text-center ",
  remainingColumn: "w-3/12 py-3 shrink-0 text-center ",
  changeMaxColumn: "grow text-center ",
  max: "text-purple-500",

  listContent: "mt-2",
  row: "flex items-center text-slate-700 text-light my-1 hover:bg-slate-100",

  categoryCell: "cursor-pointer",
  doneCell: "cursor-pointer",

  remainingCell: "flex items-center justify-center cursor-pointer",
  goalIcon: "ml-1 text-lg text-emerald-500 mb-2px",
  limitIcon: "ml-1 text-lg text-orange-400 mb-2px",
  overLimitIcon: "ml-1 text-lg text-red-500 mb-2px ",

  changeMaxCell: "flex justify-around cursor-pointer",
  take5Button: "w-7 border-1 border-orange-400 leading-none p-1 rounded-md text-sm text-orange-400 focus:bg-orange-400 focus:text-slate-100 disabled:border-slate-300 disabled:text-slate-300",
  add5Button: "w-7 border-1 border-emerald-400 leading-none p-1 rounded-md text-sm text-emerald-400 focus:bg-emerald-400 focus:text-slate-100 disabled:border-slate-300 disabled:text-slate-300",

  reassigningMinutes: "mt-8 text-center border-1 border-slate-500 w-8/12 py-2 mx-auto rounded-md text-light text-slate-700",
  reassigningMinutesNumber: "relative text-lg text-purple-500 ml-1 top-1px",

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
