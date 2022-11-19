import React from "react";
import { BiPlus } from "react-icons/bi";
import { IoReloadOutline, IoWarningOutline, IoBed } from "react-icons/io5";
import { BsDownload, BsUpload } from "react-icons/bs";

import { useGeneralStateReader, useGeneralStateUpdator } from "@state/hooks";
import { ops } from "@static/functions";
import { CuteModal, displayCuteAlert, useModalState } from "@common/index";

import RecordModal from "./RecordModal";
import WakeModal from "./WakeModal";
import HalfwayModal from "./HalfwayModal";
import TextExport from "./Out/TextExport";
import TextImport from "./Out/TextImport";

function RegistryInterface() {
  const gs = useGeneralStateReader("registry");
  const updateGS = useGeneralStateUpdator("registry");
  const modal = useModalState();

  function onAddRecord() {
    modal.open();
  }

  function onAddHalfway() {
    modal.open(null, { halfway: true });
  }

  function onAddWakeRecord() {
    modal.open(null, { wake: true });
  }

  function onEditRecord(recordIndex) {
    const record = gs.registry[recordIndex];

    if (recordIndex == 0) modal.open({ wakeRecord: record }, { wake: true });
    else modal.open({ recordIndex, editingRecord: record });
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

  function exportText() {
    displayCuteAlert({
      Icon: BsDownload,
      title: "Exportar en Texto",
      body: <TextExport registry={gs.registry} />,
      customStyles: STYLES.exportAlert,
    });
  }

  function importText() {
    displayCuteAlert({
      Icon: BsUpload,
      title: "Importar desde Texto",
      body: {
        Component: TextImport,
        onSubmit: (newRegistry) => updateGS.registry.replace(newRegistry),
      },
      customStyles: STYLES.exportAlert,
    });
  }

  const isEmpty = gs.registry.length == 0;
  const today = ops.getToday();

  const { endTime, remainingTime } =
    !isEmpty &&
    ops.calculateEndAndRemainingTime(
      gs.registry[0].time, //The first record is always waking up.
      gs.registry.at(-1).time //Last record
    );

  var ModalContent = RecordModal;
  if (modal.wake) ModalContent = WakeModal;
  else if (modal.halfway) ModalContent = HalfwayModal;

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
        <button
          onClick={onAddHalfway}
          disabled={isEmpty}
          className={STYLES.minusButton}
        >
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
                <p className={STYLES.beginColumn}>
                  {ops.getRecordName(record)}
                </p>
                <p className={STYLES.intervalColumn}>
                  {ops.getRecordInterval(record, gs.registry[index + 1])}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className={STYLES.outButtonsCt}>
          <button onClick={exportText} className={STYLES.outButton}>
            <BsDownload className={STYLES.outButtonIcon} /> Exportar
          </button>
          <button onClick={importText} className={STYLES.outButton}>
            <BsUpload className={STYLES.outButtonIcon} /> Importar
          </button>
        </div>
      </div>

      {!isEmpty && (
        <p className={STYLES.bottom}>
          Fin a las <span className={STYLES.endTime}>{endTime}</span> hs. Quedan{" "}
          <span className={STYLES.remainingTime}>{remainingTime}</span> hs.
        </p>
      )}

      <CuteModal customDirSty={{ ct: STYLES.modal }} {...modal.cuteModalProps}>
        <ModalContent {...modal.childrenProps} />
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
  addButton: "shrink-0 w-7/12 text-default flex items-center justify-center mr-1 rounded-md border-1 border-sky-500 text-sky-500 pr-2 py-2 focus:bg-sky-500 focus:text-slate-100 disabled:border-slate-300 disabled:text-slate-300",
  minusButton: "grow flex items-center text-default justify-center ml-1 rounded-md border-1 border-yellow-500 text-yellow-500 py-2 focus:bg-yellow-500 focus:text-slate-100 disabled:border-slate-300 disabled:text-slate-300",
  buttonPlus: "w-6 h-6 mr-1",

  listCt: "mt-4 pb-10",
  header: "text-default text-slate-700 flex justify-center items-center border-t-1 border-b-1 border-emerald-400 py-2 mb-2",

  timeColumn: "w-5/24 shrink-0 text-center ",
  beginColumn: "grow text-center ",
  intervalColumn: "w-5/24 shrink-0 text-center ",

  addWake: "mt-10 mb-10 flex justify-center items-center mx-auto text-slate-500 border-1 rounded-md border-sky-400 px-6 py-2 text-lg focus:text-slate-100 focus:bg-gray-500",
  addWakeIcon: "text-3xl mr-4",

  listContent: "flex mt-4 flex-col-reverse",
  row: "flex text-slate-700 text-light py-2 cursor-pointer focus:bg-slate-100 hover:bg-slate-100",

  outButtonsCt: "flex justify-center mt-4 pt-8 border-t-1 border-emerald-400",
  outButton: "flex mx-2 justify-center items-center px-4 border-1 border-slate-300 py-2 rounded-md text-slate-500 focus:bg-slate-500 focus:text-slate-100",
  outButtonIcon: "mr-2 text-xl",

  bottom: "fixed w-screen bottom-0 left-0 py-2 px-4 bg-slate-100 border-t-1 border-slate-200 text-lg text-light text-center tracking-wide text-slate-500",
  endTime: "text-yellow-600",
  remainingTime: "text-sky-500 ",

  modal: "bg-white",

  reloadAlert: {
    title: "text-slate-500 text-light",
    icon: "text-red-500",
    rightButton: "text-red-500 border-red-500 hover:bg-red-500 hover:text-slate-100",
  },
  exportAlert: {
    title: "text-slate-500 text-light",
    icon: "text-slate-500",
  }
};

export default RegistryInterface;
