import defaultState from "../defaultState";

/**@param {import("../defaultState").CountersState} newState */
function getHandlers(prevState, newState) {
  // const common = getCommonHandling(prevState, newState);

  return {
    clean() {
      return defaultState.counters;
    },

    //

    addTime({ categoryKey, addingTime }) {
      newState[categoryKey].done += addingTime;
      return newState;
    },

    substractTime({ categoryKey, substractingTime }) {
      newState[categoryKey].done -= substractingTime;
      return newState;
    },

    setCounter({ categoryKey, newCounter }) {
      newState[categoryKey] = newCounter;
      return newState;
    },
  };
}

export default getHandlers;
