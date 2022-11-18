import React from "react";
import { chunk } from "lodash";
import { BsTrashFill } from "react-icons/bs";
import { IoWarningOutline } from "react-icons/io5";

//prettier-ignore
import { CuteTimeInput, CuteInput, displayCuteAlert } from "@common/index";
import { useObjectState } from "@static/react";
import { ops, exists } from "@static/functions";
import { useGeneralStateUpdator } from "@state/hooks";

import { CATEGORIES_NAMES as CGN } from "@static/values/config";

function RegistryModal({ closeModal, editingRecord, recordIndex }) {
  const record = editingRecord || BLANK_RECORD; //Existance of recordIndex tells if it's a new record.

  const updateGS = useGeneralStateUpdator("registry", "counters");
  const values = useObjectState(record);

  const isSubmittable = exists(recordIndex)
    ? Object.keys(values.get).some((f) => values.get[f] != editingRecord[f]) //For editing records at least one field must have changed.
    : Object.keys(values.get).every(
        (f) => !REQUIRED.includes(f) || values.get[f] != BLANK_RECORD[f] //For new records all fields must be completed.
      );

  function submit() {
    if (!isSubmittable) return;

    if (exists(recordIndex))
      updateGS.registry.setRecord(recordIndex, values.get);
    else updateGS.registry.addRecord(values.get);

    closeModal();
  }

  React.useEffect(() => {
    function onKeyDown(e) {
      if (isSubmittable && e.key == "Enter") submit();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isSubmittable]);

  function onTrash() {
    displayCuteAlert({
      Icon: IoWarningOutline,
      title: "¿Borrar este Punto Temporal?",
      button: { text: "No, cancelar" },
      secondButton: {
        text: "Sí, borrar",
        onClick: (closeAlert) => {
          updateGS.registry.removeRecord(recordIndex);
          closeModal();
          closeAlert();
        },
      },
      customStyles: STYLES.trashAlert,
    });
  }

  return (
    <div className={STYLES.ct}>
      {exists(recordIndex) && (
        <BsTrashFill onClick={onTrash} className={STYLES.trash} />
      )}

      <p className={STYLES.title}>
        {exists(recordIndex) ? "Editar" : "Agregar"} Punto Temporal
      </p>

      <div className={STYLES.inputsCt}>
        <CuteTimeInput
          time={values.get.time && ops.toCompleteTime(values.get.time)}
          onChange={(newTime) =>
            values.merge({ time: newTime && ops.toSimpleTime(newTime) })
          }
          label="Hora"
          customDirSty={STYLES.timeInput}
        />

        <CuteInput
          value={values.get.name}
          onChange={(newName) => values.merge({ name: newName })}
          label="Actividad Iniciada"
          customDirSty={STYLES.nameInput}
        />
      </div>

      <p className={STYLES.categoriesTitle}>Categoría de la Actividad</p>
      <div className={STYLES.categoriesCt}>
        {chunk(Object.keys(CGN).reverse(), 3).map((ctgRow, index) => (
          <div key={index} className={STYLES.categoriesRow}>
            {ctgRow.map((ctg) => (
              <button
                key={ctg}
                onClick={() => values.merge({ categoryKey: ctg })}
                className={
                  STYLES.categoryBox +
                  (values.get.categoryKey == ctg ? STYLES.categorySelected : "")
                }
              >
                {CGN[ctg]}
              </button>
            ))}
          </div>
        ))}
      </div>

      {isSubmittable && (
        <button onClick={submit} className={STYLES.submit}>
          {exists(recordIndex) ? "Guardar cambios" : "Agregar nuevo punto"}
        </button>
      )}
    </div>
  );
}

//prettier-ignore
const STYLES = {
  ct: "relative px-4 text-center",
  trash: "absolute left-0 -top-2 text-slate-400 rounded-lg cursor-pointer hover:text-red-400 focus:text-red-400",
  title: "text-center text-xl w-full pb-2 border-b-1 border-sky-500 text-slate-600",

  inputsCt: "mt-8 flex",
  timeInput: { ct: "shrink-0 w-7/24 mr-2" },
  
  categoriesTitle: "mt-6 text-slate-700 border-b-1 border-emerald-300 text-center w-10/12 mx-auto",
  categoriesCt: "mt-3 flex flex-col",
  categoriesRow: "my-1 flex justify-center items-center",
  categoryBox: "mx-1 py-1 px-3 text-default border-1 border-sky-300 rounded-md ",
  categorySelected: "bg-sky-400 text-slate-100",

  submit: "mt-8 w-full py-2 border-1 bg-sky-500 text-slate-100 rounded-lg text-default focus:bg-emerald-400",
  trashAlert: {
    title: "text-slate-500 text-light",
    icon: "text-red-500",
    rightButton: "text-red-500 border-red-500 hover:bg-red-500 hover:text-slate-100",
  }
};

const REQUIRED = ["time", "categoryKey"];

const BLANK_RECORD = {
  time: null,
  name: "",
  categoryKey: null,
};

export default RegistryModal;
