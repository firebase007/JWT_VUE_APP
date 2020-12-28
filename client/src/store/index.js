import Vue from "vue";
import Vuex from "vuex";
// import Axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: ""
  },
  getters: {
    USERS: state => {
      return state.user;
    }
  },
  mutations: {
    SET_USER: (state, payload) => {
      state.user = payload;
    }
  },

  actions: {
    SET_USER: (context, payload) => {
      context.commit("SET_USER", payload);
    }
  }
});
