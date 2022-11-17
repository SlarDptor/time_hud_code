// This file contains the state structure and keys, as well as the default values for each field.

import { isEmpty, mapValues } from "lodash";

import { exists } from "@static/functions";

//prettier-ignore
import { INTERFACES as IFK } from "@static/values/keys";
import { COUNTERS_PARAMS } from "@static/values/config";

/**Error thrown when some actions were defined but not handled by the reducer.
 * @param {string} stateName @param {string} type */
export function unhandledActionError(stateName, type) {
  throw Error(
    stateName +
      " contains actions types it's reducer is not handling. Unhandled type: " +
      type
  );
}

// ==== State's structure and default values ====

/**
 * @typedef GeneralState
 * @property {RegistryState} registry
 * @property {CountersState} counters
 * @property {SettingsState} settings
 */

/**@type {GeneralState} */
export const DEFAULT_GENERAL_STATE = {
  registry: [],
  counters: mapValues(COUNTERS_PARAMS, () => ({
    max: "0:00",
    done: "0:00",
  })),
  settings: {
    currentInterface: IFK.NO_INTERFACE,
    DNL: false,
    DSE: false,
  },
};

/**
 * @typedef {Array<TimeRecord>} RegistryState
 * @typedef {{[category: string]: CategoryCounter}} CountersState
 * @typedef {{DNL: boolean, DSE: boolean, currentInterface: string}} SettingsState
 *
 * @typedef {Object} TimeRecord
 * @property {string} time The time at which the activity began.
 * @property {string} name Name of the activity.
 * @property {string} categoryKey Category of the activity.
 *
 * @typedef {Object} CategoryCounter
 * @property {string} done Amount of time done of this activity category.
 * @property {string} max Goal or limit of this activity category.
 */

export default (() => {
  // Here do changes and processes on the default state before exporting.

  // Load general state from localStorage if it's there. Otherwise, load the default general state.
  const savedGS = JSON.parse(localStorage.getItem("generalState"));

  var initialState;
  if (exists(savedGS) && !isEmpty(savedGS)) initialState = savedGS;
  else initialState = DEFAULT_GENERAL_STATE;

  return initialState;
})();
