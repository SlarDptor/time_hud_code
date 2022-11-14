import { mapValues } from "lodash";

export const STATE_NAME = "Settings";

//prettier-ignore
export const TYPES = mapValues({ 
    
  CLEAN: 0, //Simple Actions

  SET_SETTING: 0, //Parameterized Actions

}, (v, k) => `${STATE_NAME.toUpperCase()}_${k}` );

/**@type {Registry} */
const ACTION_CREATORS = {
  clean: () => ({ type: TYPES.CLEAN }),

  setSetting: (settingKey, newValue) => ({
    type: TYPES.SET_SETTING,
    params: { settingKey, newValue },
  }),
};

export default ACTION_CREATORS;

//Is not necessary nor useful to specify the actions outputs.

/**
 * @typedef {Object} SettingsActions
 * @property {() => any} clean Cleans the settings.
 * @property {(settingKey, newValue) => any} setSetting sets a new value to the specified setting.
 */
