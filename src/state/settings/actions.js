import { mapValues } from "lodash";

export const STATE_NAME = "Settings";

//prettier-ignore
export const TYPES = mapValues({ 
    
  CLEAN: 0, //Simple Actions

  SET_INTERFACE: 0, SET_ALTERNATE_DAY: 0, ADD_MINUTES: 0, TAKE_MINUTES: 0 //Parameterized Actions

}, (v, k) => `${STATE_NAME.toUpperCase()}_${k}` );

/**@type {SettingsActions} */
const ACTION_CREATORS = {
  clean: () => ({ type: TYPES.CLEAN }),

  setInterface: (interfaceKey) => ({
    type: TYPES.SET_INTERFACE,
    params: { interfaceKey },
  }),
  setAlternateDays: (newAlternateDays) => ({
    type: TYPES.SET_ALTERNATE_DAY,
    params: { newAlternateDays },
  }),
  addMinutes: (minutes) => ({
    type: TYPES.ADD_MINUTES,
    params: { minutes },
  }),
  takeMinutes: (minutes) => ({
    type: TYPES.TAKE_MINUTES,
    params: { minutes },
  }),
};

export default ACTION_CREATORS;

//Is not necessary nor useful to specify the actions outputs.

/**
 * @typedef {Object} SettingsActions
 * @property {() => any} clean Cleans the settings.
 * @property {(interfaceKey) => any} setInterface Changes the interface.
 * @property {(newAlternateDays) => any} setAlternateDays Sets all alternate days setting.
 * @property {(minutes) => any} addMinutes Adds the specified number of minutes to the reassigningMinutes.
 * @property {(minutes) => any} takeMinutes Reduces the specified number of minutes from the reassigningMinutes.
 */
