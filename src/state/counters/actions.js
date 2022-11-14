import { mapValues } from "lodash";

export const STATE_NAME = "Counters";

//prettier-ignore
export const TYPES = mapValues({ 
    
  CLEAN: 0, //Simple Actions

  ADD_TIME: 0, SUBSTRACT_TIME: 0, SET_COUNTER: 0, //Parameterized Actions

}, (v, k) => `${STATE_NAME.toUpperCase()}_${k}` );

/**@type {Registry} */
const ACTION_CREATORS = {
  clean: () => ({ type: TYPES.CLEAN }),

  addTime: (categoryKey, addingTime) => ({
    type: TYPES.ADD_TIME,
    params: { categoryKey, addingTime },
  }),
  substractTime: (categoryKey, substractingTime) => ({
    type: TYPES.SUBSTRACT_TIME,
    params: { categoryKey, substractingTime },
  }),
  setCounter: (categoryKey, newCounter) => ({
    type: TYPES.SET_COUNTER,
    params: { categoryKey, newCounter },
  }),
};

export default ACTION_CREATORS;

//Is not necessary nor useful to specify the actions outputs.

/**
 * @typedef {Object} CountersActions
 * @property {() => any} clean Cleans the counters.
 * @property {(categoryKey, addingTime) => any} addTime Adds done time to a counter.
 * @property {(categoryKey, substractingTime) => any} substractTime Substracts done time from a counter.
 * @property {(categoryKey, newCounter) => any} setCounter Sets the counter of the specified category.
 */
