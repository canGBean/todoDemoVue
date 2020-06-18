import variables from "@/styles/element-variables.scss";
import defaultSettings from "@/settings";
import Cookies from "js-cookie";

const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings;

const state = {
  theme: Cookies.get("theme") || variables.theme,
  showSettings: showSettings,
  tagsView: Cookies.get("tagsView")
    ? Cookies.get("tagsView") === "true"
    : tagsView,
  fixedHeader: Cookies.get("fixedHeader")
    ? Cookies.get("fixedHeader") === "true"
    : fixedHeader,
  sidebarLogo: Cookies.get("sidebarLogo")
    ? Cookies.get("sidebarLogo") === "true"
    : sidebarLogo
};

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value;
      Cookies.set(key, value);
    }
  }
};

const actions = {
  changeSetting({ commit }, data) {
    commit("CHANGE_SETTING", data);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
