import React from "react";
import { MdTimer, MdArrowDropDown, MdArrowDropUp } from "react-icons/md";

import { useGeneralStateReader } from "@state/hooks";
import { ops } from "@static/functions";

import {
  CATEGORIES_NAMES,
  CATEGORIES_DESCRIPTIONS,
} from "@static/values/config";

function CountersModal({ categoryKey }) {
  const [order, setOrder] = React.useState("decreasing");
  const gs = useGeneralStateReader("counters", "registry");

  const ref = React.useRef();

  function toggleOrder() {
    setOrder((prev) => (prev == "increasing" ? "decreasing" : "increasing"));
  }

  const categoryRecords = gs.registry
    .slice(0, gs.registry.length - 1) //The last record (unfinished, without interval) is ignored.
    .map((record, index) => ({ ...record, index })) //The original index must be saved
    .filter((record) => record.categoryKey == categoryKey);

  const displayingRecords =
    order == "decreasing" ? categoryRecords : [...categoryRecords].reverse();

  return (
    <>
      <div className={STYLES.title}>
        <MdTimer className={STYLES.icon} />
        Intervalos en
        <span className={STYLES.categoryName}>
          {" "}
          {CATEGORIES_NAMES[categoryKey]}
        </span>
      </div>

      <p className={STYLES.description}>
        {CATEGORIES_DESCRIPTIONS[categoryKey]}
      </p>

      <div className={STYLES.listCt}>
        <div className={STYLES.header}>
          <p
            onClick={toggleOrder}
            className={STYLES.fromColumn + STYLES.fromHeader}
          >
            Intervalo{" "}
            {order == "decreasing" ? <MdArrowDropDown /> : <MdArrowDropUp />}
          </p>
          <p className={STYLES.durationColumn}>Duración</p>
          <p className={STYLES.nameColumn}>Nombre</p>
        </div>

        {displayingRecords.length > 0 ? (
          <div ref={ref} className={STYLES.listContent}>
            {displayingRecords.map((record) => {
              const nextRecord = gs.registry[record.index + 1];
              return (
                <div key={record.index} className={STYLES.row}>
                  <p
                    className={STYLES.fromColumn}
                  >{`${record.time} - ${nextRecord.time}`}</p>
                  <p className={STYLES.durationColumn}>
                    {ops.getRecordInterval(record, nextRecord)}
                  </p>
                  <p className={STYLES.nameColumn + STYLES.nameCell}>
                    {record.name}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <p className={STYLES.noIntervals}>Sin intervalos en esta actividad</p>
        )}
      </div>
    </>
  );
}

//prettier-ignore
const STYLES = {
  title: "flex justify-center items-center text-light text-slate-600 text-xl ",
  description: "text-center text-sm text-light text-slate-500 mt-4",
  categoryName: "text-sky-500 ml-1",
  icon: "mr-2 text-2xl ",

  listCt: "mt-4 ",
  header: "text-default text-slate-700 flex justify-center items-center border-b-1 border-purple-400 py-1 mb-2",
  fromHeader: "flex justify-center items-center cursor-pointer",

  nameColumn: "grow text-center ",
  fromColumn: "w-9/24 shrink-0 text-center ",
  durationColumn: "w-3/12 shrink-0 text-center ",

  listContent: "flex flex-col h-screen-4/12 overflow-y-scroll ",
  row: "flex text-light text-slate-700 mb-4",

  nameCell: "text-sm",

  noIntervals: "text-center text-slate-500 text-light mt-6 mb-2",
};

export default CountersModal;
