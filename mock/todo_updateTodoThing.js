function updateTodoThing(req) {
  const { todoThing } = req.body;
  const res = { code: 200, message: "Success", data: todoThing };
  return res;
}

module.exports = updateTodoThing;
