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
    loading: false,
    snackbar: {
      value: false,
      message: "",
    },
  },
  getters: {
    users: (state) => state.users,

    currentUser: (state) => state.currentUser,

    isLoggedIn: (state) =>
      !!state.currentUser && Object.keys(state.currentUser).length,

    error: (state) => state.error,

    availableRoles: () => ["developer", "designer", "intern", "boss"],

    isLoading: (state) => state.loading,

    inputRules: () => {
      return [
        (value) => !!value || "Required.",
        (value) => (value && value.length >= 3) || "Min 3 characters",
      ];
    },

    snackbar: (state) => state.snackbar,
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
    SET_LOADING(state, isLoading) {
      state.loading = isLoading;
    },
    SET_SNACKBAR(state, { message, color = "primary" }) {
      state.snackbar = {
        value: true,
        message,
        color,
      };
    },
  },
  actions: {
    async getUsers({ dispatch, commit }) {
      const response = await dispatch("makeRequest", {
        method: "get",
        url: "/users",
      });
      if (response) commit("SET_USERS", response.data);
    },

    async updateUser({ dispatch, commit }, { data, id }) {
      const response = await dispatch("makeRequest", {
        method: "patch",
        url: `/users/${id}`,
        data,
      });
      if (response) {
        dispatch("getUsers");
        commit("SET_SNACKBAR", {
          message: `Succesfully updated ${data.name}`,
          color: "success",
        });
      }
    },

    async deleteUser({ dispatch, commit }, user) {
      const response = await dispatch("makeRequest", {
        method: "delete",
        url: `/users/${user.id}`,
      });
      if (response) {
        dispatch("getUsers");
        commit("SET_SNACKBAR", {
          message: `Succesfully deleted ${user.name}`,
          color: "success",
        });
      }
    },

    async restoreUser({ dispatch, commit }, id) {
      const response = await dispatch("makeRequest", {
        method: "get",
        url: `/users/${id}/restore`,
      });
      if (response) {
        dispatch("getUsers");
        commit("SET_SNACKBAR", {
          message: "Succesfully restored user",
          color: "success",
        });
      }
    },

    async registerUser({ dispatch }, data) {
      const response = await dispatch(`makeRequest`, {
        method: "post",
        url: "/register",
        data,
      });
      if (response) {
        await dispatch("setUser", response);
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
        await dispatch("setUser", response);
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
        commit("SET_SNACKBAR", { message: "Logged out" });
      }
    },

    setUser({ commit }, response) {
      VueCookies.set("token", response.data.token);
      commit("SET_CURRENT_USER", response.data.user);
    },

    async makeRequest({ commit }, { method, url, data = null }) {
      commit("SET_LOADING", true);
      try {
        const response = await api({
          method: method,
          url: url,
          data: data,
        });
        commit("SET_LOADING", false);
        return response;
      } catch (e) {
        commit("SET_ERROR", e.response?.data?.message);
        setTimeout(() => {
          commit("SET_ERROR", null);
        }, "3000");
        commit("SET_LOADING", false);
      }
    },
  },
});
