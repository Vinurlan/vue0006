import Vue from 'vue'
import Vuex from 'vuex'
import auth from "./auth"
import post from "./post"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null,
    user: null,
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    setRole(state, user){
      state.user = user;
    },
    clearRole(state) {
      state.user = null;
    }
  },
  actions: {

  },
  getters: {
    isUserNotUndef(state) {
      return state.user != undefined && state.user != null
    },
    isUserRole(state, {isUserNotUndef}) {
      if (isUserNotUndef == true) {
        return state.user.role;
      } else {
        return false;
      }
    }
  },
  modules: {
    auth, post
  }
})
