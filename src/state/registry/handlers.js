import { ops } from "@static/functions";

import { DEFAULT_GENERAL_STATE } from "../defaultState";

/**@param {import("../defaultState").RegistryState} newState */
function getHandlers(prevState, newState) {
  // const common = getCommonHandling(prevState, newState);

  return {
    clean() {
      return DEFAULT_GENERAL_STATE.registry;
    },

    //

    replace({ newRegistry }) {
      return newRegistry;
    },

    addRecord({ newRecord }) {
      newState.push(newRecord);
      return newState;
    },

    removeRecord({ recordIndex }) {
      newState.splice(recordIndex, 1);
      return newState;
    },

    setRecord({ recordIndex, newRecord }) {
      newState[recordIndex] = newRecord;
      return newState;
    },

    offset({ minutes }) {
      const offsetTime = ops.minutesToTime(Math.abs(minutes));
      const sign = minutes > 0 ? "+" : "-";

      for (let record of newState)
        record.time =
          sign == "+"
            ? ops.addTimes(record.time, offsetTime)
            : ops.substractTimes(record.time, offsetTime);

      return newState;
    },
  };
}

export default getHandlers;
