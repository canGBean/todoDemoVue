import Layout from "@/layouts";

const tableRouter = {
  path: "/table",
  component: Layout,
  name: "table",
  meta: {
    title: "Table表格",
    icon: "table",
    roles: ["user", "user1"]
  },
  alwaysShow: true,
  redirect: "/table/basic-table",
  children: [
    {
      path: "/table/basic-table",
      name: "basicTable",
      meta: { title: "基础表格", icon: "table", roles: ["user1"] },
      component: () =>
        import(/* webpackChunkName: "table" */ "@/views/tables/basictable.vue")
    },
    {
      path: "/table/page-table",
      name: "pageTable",
      meta: { title: "分页表格", icon: "table", roles: ["user"] },
      redirect: "/table/page-table0",
      component: { render: h => h("router-view") },
      children: [
        {
          path: "/table/page-table0",
          name: "pageTable0",
          meta: { title: "分页表格0", icon: "table", roles: ["user"] },
          component: () =>
            import(
              /* webpackChunkName: "table" */ "@/views/tables/pagetable/pagetable0.vue"
            )
        },
        {
          path: "/table/page-table1",
          name: "pageTable1",
          meta: { title: "分页表格1", icon: "table", roles: ["user"] },
          component: () =>
            import(
              /* webpackChunkName: "table" */ "@/views/tables/pagetable/pagetable1.vue"
            )
        }
      ]
    }
  ]
};
export default tableRouter;
