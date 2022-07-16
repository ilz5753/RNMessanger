import { isEqual } from "lodash";
export let DuplicateFinder = (array = []) => {
  let duplicates = [];
  let arrayCopy = [...array];
  for (let itemI of arrayCopy) {
    let counter = 0;
    for (let itemJ of arrayCopy)
      if (isEqual(itemI, itemJ)) {
        counter++;
        arrayCopy = arrayCopy.filter((ac) => !isEqual(ac, itemJ));
      }
    if (counter > 1) duplicates.push({ key: itemI, counter });
  }
  return duplicates;
};

export let TimeFormater = (time) => {
  let date = new Date(time);
  let diff = new Date().getTime() - time;
  let onDay = 24 * 3600;
  let localTime = date.toLocaleTimeString();
  localTime = localTime.slice(0, localTime.length - 3);
  let onYear = 365 * onDay;
  if (diff < onDay) {
    return localTime;
  }
  if (diff < 2 * onDay) return `yesterday ${localTime}`;
  if (diff < 30 * onDay) return date.getDate();
  if (diff < onYear) return date.getMonth();
  else {
    let years = Math.floor(diff / onYear);
    return years;
  }
};
