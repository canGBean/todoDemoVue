import fecha from "fecha";
/**
 * 获取上月最后一天
 * @param {*} date
 */
export function prevMonthDatePrefix(date) {
  const temp = new Date(date.getTime());
  temp.setDate(0);
  return temp;
}

/**
 * 获取上月第一天
 * @param {*} date
 * @return YYYY-MM-dd
 */
export function prevMonthFirstDate(date) {
  return fecha.format(prevMonthDatePrefix(date), "YYYY-MM") + "-01";
}

/**
 * 获取下月第一天
 * @param {*} date
 */
export function nextMonthDatePrefix(date) {
  const temp = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  return temp;
}

/**
 * 获取下月最后一天
 * @param {*} date
 */
export function nextMonthLastDate(date) {
  const temp = new Date(date.getFullYear(), date.getMonth() + 2, 0);
  return fecha.format(temp, "YYYY-MM-DD");
}
