import router, { resetRouter } from "@/router";
import { setToken, getToken, removeToken } from "@/utils/auth";
import { getInfo, login, logout } from "@/api/user";

const state = {
  userInfo: {
    name: "",
    token: getToken(),
    password: "",
    roles: [],
    avatar: ""
  }
};

const actions = {
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.userInfo.token)
        .then(response => {
          const { data, code, msg, exception, timestamp } = response.data;

          if (!data) {
            reject("Verification failed, please Login again.");
          }
          if (code === 200) {
            const { roles, name, token, avatar } = data;
            // roles must be a non-empty array
            if (!roles || roles.length <= 0) {
              reject("getInfo: roles must be a non-null array!");
            }

            commit("SET_ROLES", roles);
            commit("SET_NAME", name);
            commit("SET_TOKEN", token);
            commit("SET_AVATAR", avatar);
            resolve(data);
          } else {
            console.log({
              message: msg,
              exception: exception,
              timestamp: timestamp
            });

            resolve();
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  submitlogin({ commit }, { payload }) {
    const { username, password } = payload;
    return new Promise((resolve, reject) => {
      login(username.trim(), password)
        .then(response => {
          const { data, code, msg, exception, timestamp } = response.data;
          if (code === 200) {
            const { name, token } = data;
            commit("SET_NAME", name);
            commit("SET_TOKEN", token);
            setToken(token);
            resolve(data);
          } else {
            console.log({
              message: msg,
              exception: exception,
              timestamp: timestamp
            });
            resolve();
            router.push("/404");
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.userInfo.token)
        .then(() => {
          commit("SET_TOKEN", "");
          commit("SET_ROLES", []);
          removeToken();
          resetRouter();
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit("SET_TOKEN", "");
      commit("SET_ROLES", []);
      removeToken();
      resolve();
    });
  }
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.userInfo.token = token;
  },
  SET_NAME: (state, name) => {
    state.userInfo.name = name;
  },
  SET_ROLES: (state, roles) => {
    state.userInfo.roles = roles;
  },
  SET_AVATAR: (state, avatar) => {
    state.userInfo.avatar = avatar;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
