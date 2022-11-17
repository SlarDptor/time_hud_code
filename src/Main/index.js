import React from "react";

import { useGeneralStateReader } from "@state/hooks";

import { INTERFACES as IFK } from "@static/values/keys";

import Counters from "../interfaces/Counters";
import Registry from "../interfaces/Registry";
import NoInterface from "../interfaces/NoInterface";

import TopTabs from "./TopTabs";

function App() {
  const gs = useGeneralStateReader("settings.currentInterface");

  // React.useEffect(() => {
  //   //Initial and whole-app context processes.
  // }, []);

  const CurrentInterface = selectInterface(gs.settings.currentInterface);

  return (
    <>
      <TopTabs />
      <div className={STYLES.currentInterfaceCt}>
        <CurrentInterface />
      </div>
    </>
  );
}

const STYLES = {
  currentInterfaceCt: "pt-16 pb-8 px-4 flex flex-col",
};

function selectInterface(currentInterface) {
  switch (currentInterface) {
    case IFK.COUNTERS:
      return Counters;
    case IFK.REGISTRY:
      return Registry;

    default:
      return NoInterface;
  }
}

export default App;
