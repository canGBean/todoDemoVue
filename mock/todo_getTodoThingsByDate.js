function getTodoThingsByDate(req) {
  const todoThings = require("./todoThings");
  const { beginDate, endDate } = req.query;
  // let { token } = req.body;
  let res = [];
  todoThings.forEach(item => {
    // console.log({
    //   mock: "mock",
    //   beginDate: beginDate,
    //   endDate: endDate
    // });
    if (item.date >= beginDate && item.date <= endDate) {
      res.push(item);
    }
  });
  return res;
}

module.exports = getTodoThingsByDate;
