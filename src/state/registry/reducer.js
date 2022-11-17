import { cloneDeep } from "lodash";

import defaultState, { unhandledActionError } from "../defaultState";
import { TYPES, STATE_NAME } from "./actions";
import getHandlers from "./handlers";

export default function reducer(prevState = defaultState.registry, action) {
  if (!Object.values(TYPES).includes(action.type)) return prevState;

  const handlers = getHandlers(prevState, cloneDeep(prevState));

  switch (action.type) {
    case TYPES.CLEAN:
      return handlers.clean();

    case TYPES.ADD_RECORD:
      return handlers.addRecord(action.params);
    case TYPES.REMOVE_RECORD:
      return handlers.removeRecord(action.params);
    case TYPES.SET_RECORD:
      return handlers.setRecord(action.params);

    default:
      throw unhandledActionError(STATE_NAME, action.type);
  }
}
