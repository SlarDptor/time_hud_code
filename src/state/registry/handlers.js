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
  };
}

export default getHandlers;
