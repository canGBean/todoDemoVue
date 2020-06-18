function saveTodoThing(req) {
  const { todoThing } = req.body;
  todoThing.id = parseInt(Math.random() * 100) + 1024; // mock a id
  const res = { code: 200, message: "Success", data: todoThing };
  return res;
}

module.exports = saveTodoThing;
