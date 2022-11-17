import { DEFAULT_GENERAL_STATE } from "../defaultState";

/**@param {import("../defaultState").SettingsState} newState */
function getHandlers(prevState, newState) {
  // const common = getCommonHandling(prevState, newState);

  return {
    clean() {
      return DEFAULT_GENERAL_STATE.settings;
    },

    //

    setSetting({ settingKey, newValue }) {
      newState[settingKey] = newValue;
      return newState;
    },
  };
}

export default getHandlers;
