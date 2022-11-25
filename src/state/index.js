import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";

import { LOCAL_STORAGE_NAME } from "@static/values/config";

import defaultState from "./defaultState";

import countersReducer from "./counters/reducer";
import registryReducer from "./registry/reducer";
import settingsReducer from "./settings/reducer";

const combinedReducers = combineReducers({
  counters: countersReducer,
  registry: registryReducer,
  settings: settingsReducer,
});

function rootReducer(previousState, action) {
  const newState = combinedReducers(previousState, action);

  localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(newState));

  return newState;
}

export const createComposedStore = () => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(
    rootReducer,
    defaultState,
    composeEnhancers(applyMiddleware(reduxImmutableStateInvariant()))
  );
};
