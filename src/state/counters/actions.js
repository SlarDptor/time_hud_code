import { mapValues } from "lodash";

export const STATE_NAME = "Counters";

//prettier-ignore
export const TYPES = mapValues({ 
    
  CLEAN: 0, //Simple Actions

  SET_COUNTERS_MAXES: 0, SET_COUNTERS_DONE: 0, //Parameterized Actions

}, (v, k) => `${STATE_NAME.toUpperCase()}_${k}` );

/**@type {Registry} */
const ACTION_CREATORS = {
  clean: () => ({ type: TYPES.CLEAN }),

  setCountersMaxes: (countersMaxes) => ({
    type: TYPES.SET_COUNTERS_MAXES,
    params: { countersMaxes },
  }),
  setCountersDone: (countersDone) => ({
    type: TYPES.SET_COUNTERS_DONE,
    params: { countersDone },
  }),
};

export default ACTION_CREATORS;

//Is not necessary nor useful to specify the actions outputs.

/**
 * @typedef {Object} CountersActions
 * @property {() => any} clean Cleans the counters.
 * @property {(countersMaxes) => any} setCountersMaxes Sets the max time of multiple counters.
 * @property {(countersDone) => any} setCountersDone Sets the done time of multple counters
 */
