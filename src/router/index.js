import Vue from "vue";
import VueRouter from "vue-router";
import NotFound from "@/views/404.vue";
import Layout from "@/layouts";

/**
 * 重写路由的push方法
 */
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error);
};
Vue.use(VueRouter);

import tableRouter from "./modules/table";
import todoThingsRouter from "./modules/todoThings";

export const constantRoutes = [
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path*",
        component: () => import("@/views/redirect/index")
      }
    ]
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ "@/views/dashboard/Analysis"
          ),
        name: "Dashboard",
        meta: { title: "dashboard", icon: "dashboard", affix: true }
      }
    ]
  },

  {
    path: "/documentation",
    component: Layout,
    redirect: "/documentation/index",
    children: [
      {
        path: "index",
        component: () =>
          import(
            /* webpackChunkName: "documentation" */ "@/views/documentation/index"
          ),
        name: "Documentation",
        meta: { title: "documentation", icon: "documentation" }
      }
    ]
  },

  {
    path: "/user",
    hidden: true,
    component: { render: h => h("router-view") },
    children: [
      { path: "/user", redirect: "/user/login" },
      {
        path: "/user/login",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "user" */ "@/views/user/Login.vue")
      },
      {
        path: "/user/register",
        name: "register",
        component: () =>
          import(/* webpackChunkName: "user" */ "@/views/user/Register.vue")
      }
    ]
  },
  {
    path: "/404",
    component: NotFound,
    hidden: true
  }
];

export const asyncRoutes = [
  {
    path: "/form",
    // component: { render: h => h("router-view") },
    component: Layout,
    name: "form",
    redirect: "/form/basic-form",
    meta: {
      title: "Form表单",
      icon: "form",
      roles: ["admin", "user"]
    },
    children: [
      {
        path: "/form/basic-form",
        name: "basicForm",
        meta: {
          title: "Form基础表单1",
          icon: "form",
          roles: ["admin", "user"]
        },
        component: () =>
          import(/* webpackChunkName: "form" */ "@/views/forms/basicForm.vue")
      },
      {
        path: "/form/basic-form2",
        name: "basicForm2",
        meta: {
          title: "Form基础表单2",
          icon: "form",
          roles: ["admin", "user"]
        },
        component: () =>
          import(/* webpackChunkName: "form" */ "@/views/forms/basicForm2.vue")
      },
      {
        path: "/form/step-form",
        name: "stepForm",
        meta: {
          roles: ["admin"]
        },
        component: () =>
          import(/* webpackChunkName: "form" */ "@/views/forms/stepform"),
        redirect: "/form/step-form/info",
        children: [
          // { path: "/form/step-form",  },
          {
            path: "/form/step-form/info",
            name: "info",
            component: () =>
              import(
                /* webpackChunkName: "form" */ "@/views/forms/stepform/step1.vue"
              ),
            meta: {
              title: "Form分步表单",
              icon: "form"
            }
          },
          {
            path: "/form/step-form/confirm",
            name: "confirm",
            component: () =>
              import(
                /* webpackChunkName: "form" */ "@/views/forms/stepform/step2.vue"
              ),
            meta: {
              title: "stepconfirm"
            },
            hidden: true
          },
          {
            path: "/form/step-form/result",
            name: "result",
            component: () =>
              import(
                /* webpackChunkName: "form" */ "@/views/forms/stepform/step3.vue"
              ),
            meta: {
              title: "stepresult"
            },
            hidden: true
          }
        ]
      }
    ]
  },
  tableRouter,
  todoThingsRouter,
  {
    path: "/about",
    // name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Layout,
    children: [
      {
        path: "/about",
        name: "About",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/About.vue"),
        meta: { title: "about", icon: "about", roles: ["user1"] }
      }
    ]
  },
  {
    path: "*",
    name: "404",
    component: NotFound,
    hidden: true
  }
];

const createRouter = new VueRouter({
  // mode: "history",
  routes: constantRoutes
});

export function resetRouter() {
  const newRouter = createRouter;
  router.matcher = newRouter.matcher; // reset router
}

const router = createRouter;

export default router;
