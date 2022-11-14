import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";

import defaultState from "./defaultState";

import countersReducer from "./counters/reducer";
import registryReducer from "./registry/reducer";
import settingsReducer from "./settings/reducer";

const rootReducer = combineReducers({
  counters: countersReducer,
  registry: registryReducer,
  settings: settingsReducer,
});

export const createComposedStore = () => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(
    rootReducer,
    defaultState,
    composeEnhancers(applyMiddleware(reduxImmutableStateInvariant()))
  );
};
