import React from "react";

import { CATEGORIES_NAMES as CGN } from "@static/values/config";

function TextImport({ closeAlert, onSubmit }) {
  const [error, setError] = React.useState(false);
  const [value, setValue] = React.useState("");

  function input(newValue) {
    if (newValue == "" && error) setError(false);
    setValue(newValue);
  }

  function submit() {
    try {
      onSubmit(
        value
          .trim()
          .split("\n")
          .map((textRecord) => {
            const time = textRecord.split("—")[0].trim();
            const nameNCategory = textRecord.split("—")[1].trim();

            var name, category, categoryKey;

            //Category within parenthesis
            if (nameNCategory.includes("(")) {
              [name, category] = nameNCategory.split("(");
              category = category.substring(0, category.length - 1);
            }
            //Only category
            else if (Object.values(CGN).includes(nameNCategory))
              category = nameNCategory;
            //Only name
            else name = nameNCategory;

            if (category)
              categoryKey = Object.keys(CGN).find((cn) => category == CGN[cn]);

            closeAlert();
            return { time, name: name && name.trim(), categoryKey };
          })
      );
    } catch (error) {
      console.log("ERROR IMPORTING", error);
      setError(true);
    }
  }

  return (
    <>
      <textarea
        className={
          "resize-none px-6 py-4 mt-4 border-1 border-slate-300 rounded-sm text-light text-sm text-slate-700 leading-relaxed"
        }
        rows={10}
        value={value}
        onChange={(e) => input(e.target.value)}
      />

      {value && (
        <button
          onClick={submit}
          className="mt-6 border-sky-400 text-sky-500 border-1 py-2 w-4/12 mx-auto rounded-md focus:bg-sky-500 focus:text-slate-100"
        >
          Cargar
        </button>
      )}
      {error && (
        <p className="mt-4 text-center text-red-400 text-light">
          El texto cargado es inválido
        </p>
      )}
    </>
  );
}

export default TextImport;
