import defaultState from "../defaultState";

/**@param {import("../defaultState").SettingsState} newState */
function getHandlers(prevState, newState) {
  // const common = getCommonHandling(prevState, newState);

  return {
    clean() {
      return defaultState.settings;
    },

    //

    setSetting({ settingKey, newValue }) {
      newState[settingKey] = newValue;
      return newState;
    },
  };
}

export default getHandlers;
