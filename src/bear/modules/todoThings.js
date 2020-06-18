import {
  getTodoThingsByDate,
  createTodoThing,
  updateTodoThing
} from "@/api/todoThings/todoThings";

const actions = {
  getTodoThingsByDate(context, { beginDate, endDate }) {
    return new Promise((resolve, reject) => {
      getTodoThingsByDate(beginDate, endDate)
        .then(response => {
          const { data } = response;
          const resp = { code: 200, message: "Success", data: data };
          // console.log({ bear: "bear", resp: resp });

          resolve(resp);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  createTodoThing(context, { todoThing }) {
    return new Promise((resolve, reject) => {
      createTodoThing(todoThing)
        .then(response => {
          const resp = response.data;
          resolve(resp);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  updateTodoThing(context, { todoThing }) {
    return new Promise((resolve, reject) => {
      updateTodoThing(todoThing)
        .then(response => {
          const resp = response.data;
          resolve(resp);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};

export default {
  namespaced: true,
  actions
};
