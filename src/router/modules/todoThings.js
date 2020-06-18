import Layout from "@/layouts";

const todoThingsRouter = {
  path: "/todothings",
  component: Layout,
  name: "todothings",
  meta: {
    title: "待办事项",
    icon: "todo",
    roles: ["admin", "user", "user1"]
  },
  alwaysShow: true,
  redirect: "/todothings/index",
  children: [
    {
      path: "/todothings/index",
      name: "todothings_index",
      meta: {
        title: "待办日历",
        icon: "todo",
        roles: ["admin", "user", "user1"]
      },
      component: () =>
        import(
          /* webpackChunkName: "todothings" */ "@/views/todothings/index.vue"
        )
    },
    {
      path: "/todothings/list",
      name: "todothings_list",
      meta: {
        title: "待办事项列表",
        icon: "todo",
        roles: ["admin", "user", "user1"]
      },
      component: () =>
        import(
          /* webpackChunkName: "todothings" */ "@/views/todothings/todoThingsList.vue"
        )
    }
  ]
};
export default todoThingsRouter;
