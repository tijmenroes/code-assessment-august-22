import Vue from "vue";
import Vuex from "vuex";
import api from "@/api/main";
import VueCookies from "vue-cookies";
import router from "../router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [],
    currentUser: {},
    error: null,
  },
  getters: {
    users: (state) => state.users,

    currentUser: (state) => state.currentUser,

    isLoggedIn: (state) =>
      !!state.currentUser && Object.keys(state.currentUser).length,

    error: (state) => state.error,
  },
  mutations: {
    SET_USERS(state, users) {
      state.users = users;
    },
    SET_CURRENT_USER(state, user) {
      state.currentUser = user;
    },
    SET_ERROR(state, message) {
      state.error = message;
    },
  },
  actions: {
    async getUsers({ commit }) {
      try {
        const response = await api.get("/users");
        commit("SET_USERS", response.data);
      } catch (e) {
        console.log(e);
      }
    },

    async updateUser({ dispatch }, { data, id }) {
      const response = await dispatch("makeRequest", {
        method: "patch",
        url: `/users/${id}`,
        data,
      });
      if (response) dispatch("getUsers");
    },

    async deleteUser({ dispatch }, id) {
      const response = await dispatch("makeRequest", {
        method: "delete",
        url: `/users/${id}`,
      });
      if (response) dispatch("getUsers");
    },

    async restoreUser({ dispatch }, id) {
      const response = await dispatch("makeRequest", {
        method: "get",
        url: `/users/${id}/restore`,
      });
      if (response) dispatch("getUsers");
    },

    async registerUser({ dispatch }, data) {
      const response = await dispatch(`makeRequest`, {
        method: "post",
        url: "/register",
        data,
      });
      if (response) {
        dispatch("setUser", response);
        router.push("/users");
      }
    },

    async loginUser({ dispatch }, data) {
      const response = await dispatch(`makeRequest`, {
        method: "post",
        url: "/login",
        data,
      });
      if (response) {
        dispatch("setUser", response);
        router.push("/users");
      }
    },

    async logOutUser({ dispatch, commit }) {
      const response = await dispatch(`makeRequest`, {
        method: "post",
        url: "/logout",
      });
      if (response) {
        commit("SET_CURRENT_USER", null);
        VueCookies.remove("token");
        router.push("/login");
      }
    },

    setUser({ commit }, response) {
      VueCookies.set("token", response.data.token);
      commit("SET_CURRENT_USER", response.data.user);
    },

    async makeRequest({ commit }, { method, url, data = null }) {
      try {
        const response = await api({
          method: method,
          url: url,
          data: data,
        });
        return response;
      } catch (e) {
        commit("SET_ERROR", e.response?.data?.message);
        setTimeout(() => {
          commit("SET_ERROR", null);
        }, "3000");
      }
    },
  },
});
