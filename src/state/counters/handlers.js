import { ops } from "@static/functions";

import { DEFAULT_GENERAL_STATE } from "../defaultState";

/**@param {import("../defaultState").CountersState} newState */
function getHandlers(prevState, newState) {
  // const common = getCommonHandling(prevState, newState);

  return {
    clean() {
      return DEFAULT_GENERAL_STATE.counters;
    },

    //

    setCountersMaxes({ countersMaxes }) {
      for (let ctg in countersMaxes) newState[ctg].max = countersMaxes[ctg];

      return newState;
    },

    setCountersDone({ countersDone }) {
      for (let ctg in countersDone) newState[ctg].done = countersDone[ctg];

      return newState;
    },
  };
}

export default getHandlers;
