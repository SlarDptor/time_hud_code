import { mapValues } from "lodash";

export const STATE_NAME = "Registry";

//prettier-ignore
export const TYPES = mapValues({ 
    
  CLEAN: 0, //Simple Actions

  ADD_RECORD: 0, REMOVE_RECORD: 0, SET_RECORD: 0, //Parameterized Actions

}, (v, k) => `${STATE_NAME.toUpperCase()}_${k}` );

/**@type {Registry} */
const ACTION_CREATORS = {
  clean: () => ({ type: TYPES.CLEAN }),

  addRecord: (newRecord) => ({
    type: TYPES.ADD_RECORD,
    params: { newRecord },
  }),
  removeRecord: (recordIndex) => ({
    type: TYPES.REMOVE_RECORD,
    params: { recordIndex },
  }),
  setRecord: (recordIndex, newRecord) => ({
    type: TYPES.SET_RECORD,
    params: { recordIndex, newRecord },
  }),
};

export default ACTION_CREATORS;

//Is not necessary nor useful to specify the actions outputs.

/**
 * @typedef {Object} RegistryActions
 * @property {() => any} clean Cleans the time registry.
 * @property {(newRecord) => any} addRecord Adds a new Time Record to the registry.
 * @property {(recordIndex) => any} removeRecord Removes the Time Record at the specified index from the registry.
 * @property {(recordIndex, newRecord) => any} setRecord Sets the TimeRecord at the specified index in the registry.
 */
