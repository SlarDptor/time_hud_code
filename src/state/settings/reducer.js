import { cloneDeep } from "lodash";

import defaultState, { unhandledActionError } from "../defaultState";
import { TYPES, STATE_NAME } from "./actions";
import getHandlers from "./handlers";

export default function reducer(prevState = defaultState.settings, action) {
  if (!Object.values(TYPES).includes(action.type)) return prevState;

  const handlers = getHandlers(prevState, cloneDeep(prevState));

  switch (action.type) {
    case TYPES.CLEAN:
      return handlers.clean();

    case TYPES.SET_SETTING:
      return handlers.setSetting(action.params);
    case TYPES.ADD_MINUTES:
      return handlers.addMinutes(action.params);
    case TYPES.TAKE_MINUTES:
      return handlers.takeMinutes(action.params);

    default:
      throw unhandledActionError(STATE_NAME, action.type);
  }
}
