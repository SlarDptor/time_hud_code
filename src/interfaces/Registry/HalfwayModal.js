import React from "react";
import { capitalize, chunk } from "lodash";
import { BsTrashFill } from "react-icons/bs";
import { IoWarningOutline } from "react-icons/io5";

//prettier-ignore
import { CuteTimeInput, CuteInput, displayCuteAlert } from "@common/index";
import { useObjectState } from "@static/react";
import { ops, exists } from "@static/functions";
import { useGeneralStateReader, useGeneralStateUpdator } from "@state/hooks";

import { CATEGORIES_NAMES as CGN } from "@static/values/config";

function RegistryHalfwayModal({ closeModal }) {
  const gs = useGeneralStateReader("registry");
  const updateGS = useGeneralStateUpdator("registry");
  const values = useObjectState(BLANK_HALFWAY);

  const isSubmittable = Object.keys(values.get).every(
    (f) => !REQUIRED.includes(f) || values.get[f] != BLANK_HALFWAY[f]
  );

  function submit() {
    if (!isSubmittable) return;

    const lastRecord = gs.registry.at(-1);

    //Edit the last record (call it lastRecord) with the halfway name and category
    const halfwayRecord = {
      ...values.get,
      name: "i" + values.get.name,
      time: lastRecord.time,
    };
    updateGS.registry.setRecord(gs.registry.length - 1, halfwayRecord);

    //Then add lastRecord again as a new record with the added time of the halfway
    const newLastRecord = {
      ...lastRecord,
      time: ops.addTimes(lastRecord.time, values.get.time),
    };
    updateGS.registry.addRecord(newLastRecord);

    /* This way, the Halfway's interval will be the duration specified here while the 
    lastRecord remains unfinished. The halfway is treated as any other Time Record from now on. */

    closeModal();
  }

  React.useEffect(() => {
    function onKeyDown(e) {
      if (isSubmittable && e.key == "Enter") submit();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isSubmittable]);

  return (
    <div className={STYLES.ct}>
      <p className={STYLES.title}>Agregar intervalo Intermedio</p>

      <div className={STYLES.inputsCt}>
        <CuteTimeInput
          time={values.get.time && ops.toCompleteTime(values.get.time)}
          onChange={(newTime) =>
            values.merge({ time: newTime && ops.toSimpleTime(newTime) })
          }
          label="Duración"
          customDirSty={STYLES.timeInput}
        />

        <CuteInput
          value={values.get.name}
          onChange={(newName) => values.merge({ name: capitalize(newName) })}
          label="Actividad"
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
          Agregar Intervalo
        </button>
      )}
    </div>
  );
}

//prettier-ignore
const STYLES = {
  ct: "relative px-4 text-center",
  title: "text-center text-xl w-full pb-2 border-b-1 border-sky-500 text-slate-600",

  inputsCt: "mt-8 flex",
  timeInput: { ct: "shrink-0 w-4/12 mr-2" },
  
  categoriesTitle: "mt-6 text-slate-700 border-b-1 border-emerald-300 text-center w-10/12 mx-auto",
  categoriesCt: "mt-3 flex flex-col",
  categoriesRow: "my-1 flex justify-center items-center",
  categoryBox: "mx-1 py-1 px-3 text-default border-1 border-sky-300 rounded-md ",
  categorySelected: "bg-sky-400 text-slate-100",

  submit: "mt-8 w-full py-2 border-1 bg-sky-500 text-slate-100 rounded-lg text-default focus:bg-emerald-400",
};

const REQUIRED = ["time", "categoryKey"];

const BLANK_HALFWAY = {
  time: "00:00",
  name: "",
  categoryKey: null,
};

export default RegistryHalfwayModal;
