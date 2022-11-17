import React from "react";
import { BiPlus } from "react-icons/bi";
import { IoReloadOutline, IoWarningOutline, IoBed } from "react-icons/io5";

import { useGeneralStateReader, useGeneralStateUpdator } from "@state/hooks";
import { ops } from "@static/functions";
import { useObjectState } from "@static/react";
import { CuteModal, displayCuteAlert } from "@common/index";

import { CATEGORIES_NAMES as CGN } from "@static/values/config";
import { ACTIVITY_CATEGORIES as ACK } from "@static/values/keys";

import RegistryModal from "./Modal";

//Interface with fully static styles: elements styles are never gonna change with events and styles are
//statically defined.

function RegistryInterface() {
  const gs = useGeneralStateReader("registry");
  const updateGS = useGeneralStateUpdator("registry");
  const modalConfig = useObjectState({ record: null, opened: false });

  const isEmpty = gs.registry.length == 0;

  function onAddRecord() {
    modalConfig.replace({ record: null, opened: true });
  }

  function onEditRecord(recordIndex) {
    modalConfig.replace({
      record: { recordIndex, ...gs.registry[recordIndex] },
      locked: recordIndex == 0,
      opened: true,
    });
  }

  function closeModal() {
    modalConfig.merge({ opened: false });
  }

  function onAddWakeRecord() {
    modalConfig.replace({
      record: WAKE_RECORD,
      locked: true,
      opened: true,
    });
  }

  function reload() {
    displayCuteAlert({
      Icon: IoWarningOutline,
      title: "¿Borrar todo el Registro?",
      button: { text: "No, cancelar" },
      secondButton: {
        text: "Sí, borrar",
        onClick: (closeAlert) => {
          updateGS.registry.clean();
          closeAlert();
        },
      },
      customStyles: STYLES.reloadAlert,
    });
  }

  const { endTime, remainingTime } =
    !isEmpty &&
    ops.calculateEndAndRemainingTime(
      gs.registry[0].time, //The first record is always waking up.
      gs.registry.at(-1).time //Last record
    );

  const today = ops.getToday();

  return (
    <>
      <div className={STYLES.top}>
        <p className={STYLES.date}>
          {today.dayName}{" "}
          <span className={STYLES.dateNumbers}>{today.date}</span>
        </p>
        <button onClick={reload} className={STYLES.reload}>
          <IoReloadOutline className={STYLES.reloadIcon} /> Reiniciar
        </button>
      </div>

      <div className={STYLES.buttons}>
        <button
          disabled={isEmpty}
          onClick={onAddRecord}
          className={STYLES.addButton}
        >
          <BiPlus className={STYLES.buttonPlus} /> Punto Temporal
        </button>
        <button disabled={isEmpty} className={STYLES.minusButton}>
          <BiPlus className={STYLES.buttonPlus} /> Intermedio
        </button>
      </div>

      <div className={STYLES.listCt}>
        <div className={STYLES.header}>
          <p className={STYLES.timeColumn}>Hora</p>
          <p className={STYLES.beginColumn}>Actividad Iniciada</p>
          <p className={STYLES.intervalColumn}>Intervalo</p>
        </div>

        {isEmpty ? (
          <button onClick={onAddWakeRecord} className={STYLES.addWake}>
            <IoBed className={STYLES.addWakeIcon} /> Agregar Hora de Levantarse
          </button>
        ) : (
          <div className={STYLES.listContent}>
            {gs.registry.map((record, index) => (
              <div
                onClick={() => onEditRecord(index)}
                className={STYLES.row}
                key={index}
              >
                <p className={STYLES.timeColumn}>{record.time}</p>
                <p className={STYLES.beginColumn}>{getName(record)}</p>
                <p className={STYLES.intervalColumn}>
                  {ops.getRecordInterval(record, gs.registry[index + 1])}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {!isEmpty && (
        <p className={STYLES.bottom}>
          Fin a las <span className={STYLES.endTime}>{endTime}</span> hs. Quedan{" "}
          <span className={STYLES.remainingTime}>{remainingTime}</span> hs.
        </p>
      )}

      <CuteModal
        customDirSty={{ ct: STYLES.modal }}
        onClose={closeModal}
        visible={modalConfig.get.opened}
      >
        <RegistryModal
          closeModal={closeModal}
          editingRecord={modalConfig.get.record}
          locked={modalConfig.get.locked}
        />
      </CuteModal>
    </>
  );
}

//prettier-ignore
const STYLES = {
  top: "flex justify-around items-center",
  date: "mt-1 text-center text-slate-500 text-2xl",
  dateNumbers: "ml-2",
  reload: "flex justify-center items-center px-4 py-1 border-b-1 border-slate-300 text-slate-500 focus:border-slate-500 focus:text-slate-700",
  reloadIcon: "mr-1",

  buttons: "mt-5 flex",
  addButton: "shrink-0 w-7/12 text-default flex items-center justify-center mr-1 rounded-md border-1 border-sky-500 text-sky-500 text-slate-100 pr-2 py-2 focus:bg-sky-500 focus:text-slate-100 disabled:border-slate-500 disabled:text-slate-500",
  minusButton: "grow flex items-center text-default justify-center ml-1 rounded-md border-1 border-yellow-500 text-yellow-500 text-slate-100 py-2 focus:bg-yellow-500 focus:text-slate-100 disabled:border-slate-500 disabled:text-slate-500",
  buttonPlus: "w-6 h-6 mr-1",

  listCt: "mt-4",
  header: "text-default text-slate-700 flex justify-center items-center border-t-1 border-b-1 border-emerald-400 py-2 mb-2",

  timeColumn: "w-5/24 shrink-0 text-center ",
  beginColumn: "grow text-center ",
  intervalColumn: "w-5/24 shrink-0 text-center ",

  addWake: "mt-10 flex justify-center items-center mx-auto text-slate-500 border-1 rounded-md border-slate-300 px-6 py-2 text-lg focus:text-slate-100 focus:bg-gray-500",
  addWakeIcon: "text-3xl mr-4",

  listContent: "flex flex-col-reverse",
  row: "flex text-slate-700 text-light py-2 cursor-pointer focus:bg-slate-100 hover:bg-slate-100",

  bottom: "fixed w-screen bottom-0 left-0 py-2 px-4 border-t-1 border-sky-500 text-lg text-light text-center tracking-wide text-slate-700",
  endTime: "text-yellow-700 text-default",
  remainingTime: "text-sky-500 text-default",

  modal: "bg-white",

  reloadAlert: {
    title: "text-slate-500 text-light",
    icon: "text-red-500",
    rightButton: "text-red-500 border-red-500 hover:bg-red-500 hover:text-slate-100",
  }
};

function getName({ name, categoryKey }) {
  const categoryName = CGN[categoryKey];

  if (name == categoryName) return name;
  else if (!name) return categoryName;
  else return `${name} (${categoryName})`;
}

const WAKE_RECORD = {
  time: null,
  name: "Levantarse",
  categoryKey: ACK.LEV,
};

export default RegistryInterface;
