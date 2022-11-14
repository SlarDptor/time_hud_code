import defaultState from "../defaultState";

/**@param {import("../defaultState").RegistryState} newState */
function getHandlers(prevState, newState) {
  // const common = getCommonHandling(prevState, newState);

  return {
    clean() {
      return defaultState.registry;
    },

    //

    addRecord({ newRecord }) {
      newState.push(newRecord);
      return newState;
    },

    setRecord({ recordIndex, newRecord }) {
      newState[recordIndex] = newRecord;
      return newState;
    },
  };
}

export default getHandlers;
