import moment from "moment";
import { mapValues } from "lodash";

import {
  COUNTERS_PARAMS,
  DAY_DURATION,
  CATEGORIES_NAMES,
} from "@static/values/config";

moment.locale("es", {
  weekdays: [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
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

export function getRecordName({ name, categoryKey }) {
  const categoryName = CATEGORIES_NAMES[categoryKey];

  if (name == categoryName) return name;
  else if (!name) return categoryName;
  else if (!categoryName) return name;
  else return `${name} (${categoryName})`;
}

/**Adds two times and returns the result as a time */
export function addTimes(timeA, timeB) {
  const result = m(timeA)
    .add(m(timeB).hours(), "hours")
    .add(m(timeB).minutes(), "minutes");

  return present(result);
}

/**Substract `timeB` from `timeA` and returns the result as a time.
 * @param timeA The time to substract from
 * @param timeB The time to substract
 * @param cyclicHours If `false`, when `timeB` is higher than `timeA` the result will be negative. Otherwise, it will cycle.
 *
 * ### Example
 *
 * ```
 * //Not cyclic, useful to find the difference between two amounts of time (durations)
 * substractTimes("8:00", "10:00", false) => "-2:00"
 *
 * //Default and cyclic, useful to find the difference between two hours of the day
 * substractTimes("8:00", "10:00") => "22:00"
 * ```
 *
 */
export function substractTimes(timeA, timeB, cyclicHours = true) {
  var [higher, lower, negative] =
    cyclicHours || m(timeA).isSameOrAfter(m(timeB), "minutes")
      ? [timeA, timeB, false]
      : [timeB, timeA, true];

  const result = m(higher)
    .subtract(m(lower).hours(), "hours")
    .subtract(m(lower).minutes(), "minutes");

  return (negative ? "-" : "") + present(result);
}

/**Returns the time interval of `record` based on the `nextRecord` time,
 * or `null` if there's no `nextRecord`.*/
export function getRecordInterval(record, nextRecord) {
  if (!nextRecord) return null;

  return substractTimes(nextRecord.time, record.time);
}

/**Calculates the max time for each activity category counter */
export function calculateCountersMaxTimes(altDaysSettings) {
  return mapValues(COUNTERS_PARAMS, (counterParams) => {
    const { baseMax, ...counterMaxModifiers } = counterParams;

    var maxTime = baseMax;

    for (let altDayKey in counterMaxModifiers)
      if (altDaysSettings[altDayKey]) {
        const { change, sign } = counterMaxModifiers[altDayKey];
        maxTime =
          sign == "+"
            ? addTimes(maxTime, change)
            : substractTimes(maxTime, change);
      }

    return maxTime;
  });
}

/**Calculates the done time for each activity category counter. */
export function calculateCountersDoneTime(registry) {
  var countersDoneTime = mapValues(COUNTERS_PARAMS, () => "0:00");

  //Ignore the last record which interval can't be calculated.
  for (let r = 0; r < registry.length - 1; r++) {
    const record = registry[r];
    const nextRecord = registry[r + 1];

    countersDoneTime[record.categoryKey] = addTimes(
      countersDoneTime[record.categoryKey],
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

export function toTime(minutes) {
  return present(moment("00:00", "HH:mm").add(minutes, "minutes"));
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
