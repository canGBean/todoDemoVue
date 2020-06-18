import request from "@/utils/request";

export function getTodoThingsByDate(beginDate, endDate) {
  return request({
    url: "/api/todo/getTodoThingsByDate",
    method: "get",
    params: { beginDate: beginDate, endDate: endDate }
  });
}

export function createTodoThing(todoThing) {
  return request({
    url: "/api/todo/saveTodoThing",
    method: "post",
    data: { todoThing: todoThing }
  });
}

export function updateTodoThing(todoThing) {
  return request({
    url: "/api/todo/updateTodoThing",
    method: "post",
    data: { todoThing: todoThing }
  });
}
