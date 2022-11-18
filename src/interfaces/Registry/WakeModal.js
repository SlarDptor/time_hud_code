import React from "react";

import { CuteTimeInput, CuteInput } from "@common/index";
import { useObjectState } from "@static/react";
import { ops } from "@static/functions";
import { useGeneralStateUpdator } from "@state/hooks";

import { ACTIVITY_CATEGORIES as ACK } from "@static/values/keys";
import { capitalize } from "lodash";

function RegistryWakeModal({ closeModal, wakeRecord }) {
  const updateGS = useGeneralStateUpdator("registry", "counters");
  const values = useObjectState(wakeRecord || BLANK_WAKE_RECORD);

  const isSubmittable = values.get.time != BLANK_WAKE_RECORD.time;

  function onSubmit() {
    if (wakeRecord) updateGS.registry.setRecord(0, values.get);
    else updateGS.registry.addRecord(values.get);

    closeModal();
  }

  return (
    <div className={STYLES.ct}>
      <p className={STYLES.title}>
        {wakeRecord ? "Editar" : "Agregar"} Hora de Levantarse
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
          onChange={(newName) => values.merge({ name: capitalize(newName) })}
          label="Nombre"
          customDirSty={STYLES.nameInput}
        />
      </div>

      {isSubmittable && (
        <button onClick={() => onSubmit(values.get)} className={STYLES.submit}>
          {wakeRecord ? "Guardar cambios" : "Agregar"}
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
  timeInput: { ct: "shrink-0 w-7/24 mr-2" },

  submit: "mt-8 w-full py-2 border-1 bg-sky-500 text-slate-100 rounded-lg text-default focus:bg-emerald-400",
};

const BLANK_WAKE_RECORD = {
  time: null,
  name: "Levantarse",
  categoryKey: ACK.ENTR,
};

export default RegistryWakeModal;
