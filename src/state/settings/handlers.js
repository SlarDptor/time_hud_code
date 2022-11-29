import { DEFAULT_GENERAL_STATE } from "../defaultState";

/**@param {import("../defaultState").SettingsState} newState */
function getHandlers(prevState, newState) {
  // const common = getCommonHandling(prevState, newState);

  return {
    clean() {
      return DEFAULT_GENERAL_STATE.settings;
    },

    //

    setInterface({ interfaceKey }) {
      newState.currentInterface = interfaceKey;
      return newState;
    },

    setAlternateDays({ newAlternateDays }) {
      newState.alternateDays = newAlternateDays;
      return newState;
    },

    addMinutes({ minutes }) {
      newState.reassigningMinutes += minutes;
      return newState;
    },

    takeMinutes({ minutes }) {
      newState.reassigningMinutes -= minutes;
      return newState;
    },
  };
}

export default getHandlers;
