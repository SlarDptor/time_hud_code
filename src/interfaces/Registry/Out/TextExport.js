import React from "react";

import { ops } from "@static/functions";

function TextExport({ registry }) {
  const [copied, setCopied] = React.useState(false);
  const ref = React.useRef();

  function copy() {
    ref.current.select();
    ref.current.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(ref.current.value);

    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  }

  return (
    <>
      <textarea
        disabled
        ref={ref}
        className={
          "resize-none px-8 py-4 mt-4 border-1 border-slate-300 rounded-sm text-light text-sm text-slate-700 leading-relaxed"
        }
        rows={10}
        value={registry
          .map((record) => `${record.time} — ${ops.getRecordName(record)}`)
          .join("\n")}
      ></textarea>{" "}
      <button
        onClick={copy}
        className="mt-6 border-slate-400 text-slate-500 border-1 py-2 w-4/12 mx-auto rounded-md focus:bg-slate-500 focus:text-slate-100"
      >
        {copied ? "Copiado!" : "Copiar"}
      </button>
    </>
  );
}

export default TextExport;
