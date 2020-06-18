/**
 *
 * @param {arrays like
 *  let itemThings= [{
 *  date: "2020-04-14",
 *     name: "王小虎",
 *      address: "上海市普陀区金沙江路 1518 弄",
 *     status: 0
 *     },
 *    {
 *     date: "2020-04-14",
 *     name: "王小虎",
 *     address: "上海市普陀区金沙江路 1518 弄",
 *    status: 1
 *    }]
 * } jsonArray
 * @param {json object key} key
 * return
 * Loop through categories (teams), get all categories in array like this:
 * let groupbyDate = jsonArraysGroupByValue(itemThings, "date")
 * Object.keys(groupbyDate)
 * Object.keys(groupbyDate).forEach(function(category){
 *    console.log(`Team ${category} has ${groupbyDate[category].length} members : `);
 *    groupbyDate[category].forEach(function(memb,i){
 *    console.log(`---->${i+1}. ${memb.name}.`)
 *   })
 * });
 */
export function jsonArraysGroupByValue(jsonArray, key) {
  return jsonArray.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}
