import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios'

Vue.use(Vuex);

// Normally this would be in /api/ folder but had problems with importing it...
const api = Axios.create({
  baseURL: "http://localhost:8000/api", // TODO: .env 
  headers: { Accept: "application/json" },
});

export default new Vuex.Store({
  state: {
    users: []
  },
  getters: {
    users: state => state.users
  },
  mutations: {
    SET_USERS (state, users) {
      console.log(users)
      state.users = users
    }
  },
  actions: {
    async getUsers({commit}) {
      try {
        const response = await api.get('/users')
        commit('SET_USERS', response.data)
      } catch (e) {
        console.log(e)
      }

    },

    async createUser({ dispatch }, data) {
      try {
        await api.post('/users', data)
        dispatch('getUsers')
      } catch (e) {
        console.log(e)
      }

    },

    async updateUser({dispatch}, data) {
      try {
        await api.patch(`/users/${data.id}`, data)
        dispatch('getUsers')
      } catch (e) {
        console.log(e)
      }
    }
  },
});
