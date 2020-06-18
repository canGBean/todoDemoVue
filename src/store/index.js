import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import user from "./modules/user";
import permission from "./modules/permission";
import settings from "./modules/settings";
import app from "./modules/app";
import tagsView from "./modules/tagsView";
import bearmodules from "../bear/index";

Vue.use(Vuex);

const modules = { user, permission, settings, app, tagsView, ...bearmodules };

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules,
  getters
});
