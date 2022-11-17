import moment from "moment";
import { mapValues } from "lodash";

import { COUNTERS_PARAMS, DAY_DURATION } from "@static/values/config";

moment.locale("es", {
  weekdays: [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Dómingo",
  ],
});

/**Returns the name and date of today */
export function getToday() {
  const today = moment();

  return {
    dayName: today.format("dddd"),
    date: today.format("DD / MM / YY"),
  };
}

/**Adds two times and returns the result as a time */
export function addTimes(timeA, timeB) {
  const result = m(timeA)
    .add(m(timeB).hours(), "hours")
    .add(m(timeB).minutes(), "minutes");

  return present(result);
}

/**Substract `timeB` from `timeA` and returns the result as a time */
export function substractTimes(timeA, timeB) {
  const result = m(timeA)
    .subtract(m(timeB).hours(), "hours")
    .subtract(m(timeB).minutes(), "minutes");

  return present(result);
}

/**Returns the time interval of `record` based on the `nextRecord` time,
 * or `null` if there's no `nextRecord`.*/
export function getRecordInterval(record, nextRecord) {
  if (!nextRecord) return null;

  return substractTimes(nextRecord.time, record.time);
}

/**Calculates the max time for each activity category counter */
export function calculateCountersMaxTimes({ DNL, DSE }) {
  return mapValues(COUNTERS_PARAMS, (ct) => {
    var maxTime = ct.baseMax;

    if (DNL && ct.onDNL)
      maxTime =
        ct.onDNL.sign == "+"
          ? addTimes(maxTime, ct.onDNL.change)
          : substractTimes(maxTime, ct.onDNL.change);

    if (DSE && ct.onDSE)
      maxTime =
        ct.onDSE.sign == "+"
          ? addTimes(maxTime, ct.onDSE.change)
          : substractTimes(maxTime, ct.onDSE.change);

    return maxTime;
  });
}

/**Calculates the done time for each activity category counter. */
export function calculateCountersDoneTime(registry) {
  var countersDoneTime = {};

  //Ignore the first Time Record because it's getting up
  //and the last record which interval can't be calculated.
  for (let r = 1; r < registry.length - 1; r++) {
    const record = registry[r];
    const nextRecord = registry[r + 1];

    countersDoneTime[record.categoryKey] = addTimes(
      countersDoneTime[record.categoryKey] || "0:00",
      getRecordInterval(record, nextRecord)
    );
  }

  return countersDoneTime;
}

/**Tells if a time can be considered as "zero". */
export function isZeroTime(time) {
  return m(time).isSame(m("0:00"), "minute");
}

/**Calculates the end and remaining times of the day*/
export function calculateEndAndRemainingTime(wakeTime, lastRecordTime) {
  const endTime = addTimes(wakeTime, DAY_DURATION);
  const remainingTime = substractTimes(endTime, lastRecordTime);

  return { endTime, remainingTime };
}

/**Returns the complete version (all 4 numbers "HH:mm") of a time */
export function toCompleteTime(time) {
  return m(time).format("HH:mm");
}

/**Returns the simple version (3 numbers "H:mm" if the hour is 1 digit
 * and 4 numbers "HH:mm" if the hour is 2 digits) of a time */
export function toSimpleTime(time) {
  return m(time).format("H:mm");
}

//Private functions

/**Moment to Time
 * @param {moment.Moment} momentRecord */
function present(momentRecord) {
  return momentRecord.format("H:mm");
}

/**Time to Moment
 * @param {string} time */
function m(time) {
  return moment(time, "H:mm");
}
