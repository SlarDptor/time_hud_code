import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { IoWarning } from "react-icons/io5";
import "./index.css";

import { createComposedStore } from "@state/index";
import { displayCuteAlert } from "@common/index";

import {
  STORED_VERSION_NAME,
  LOCAL_STORAGE_NAME,
  VERSION,
} from "@static/values/config";

import Main from "./Main";

//Version Control: Reset the local storage if the version is different.
const storedVersion = localStorage.getItem(STORED_VERSION_NAME);
if (storedVersion !== VERSION) {
  displayCuteAlert({
    Icon: IoWarning,
    title: `Versión Antigua.`,
    body: `${
      storedVersion
        ? `La versión guardada es la ${storedVersion}`
        : "No hay una versión guardada"
    } y la última versión es la ${VERSION}. ¿Reestablecer el estado guardado?`,
    button: {
      text: "Sí",
      onClick: () => {
        localStorage.removeItem(LOCAL_STORAGE_NAME);
        localStorage.removeItem(STORED_VERSION_NAME);
        localStorage.setItem(STORED_VERSION_NAME, VERSION);
        window.location.pathname = "/";
      },
    },
    secondButton: {
      text: "Todavía no",
      onClick: () => (window.location.href = "/"),
    },
  });
}
//Load the app if all good.
else
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <ReduxProvider store={createComposedStore()}>
        <Main />
      </ReduxProvider>
    </React.StrictMode>
  );
