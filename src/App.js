import React from "react";

import { useGeneralStateReader } from "@state/hooks";

import { INTERFACES as IFK } from "@static/values/keys";

import Counters from "./interfaces/Counters";
import Registry from "./interfaces/Registry";
import NoInterface from "./interfaces/NoInterface";

//Top Manager.
function App() {
  const gs = useGeneralStateReader("settings");

  // React.useEffect(() => {
  //   //Initial and whole-app context processes.
  // }, []);

  const CurrentInterface = selectInterface(gs.settings.currentInterface);

  return <>{CurrentInterface ? <CurrentInterface /> : <NoInterface />}</>;
}

function selectInterface(currentInterface) {
  switch (currentInterface) {
    case IFK.COUNTERS:
      return Counters;
    case IFK.REGISTRY:
      return Registry;
  }
}

export default App;
