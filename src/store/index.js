import Vue from 'vue'
import Vuex from 'vuex'
import auth from "./auth"
import post from "./post"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null,
    user: null,
    posts: [],
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
    },
    setPosts(state, posts){
      state.posts = posts;
    }
  },
  actions: {
    async addClap({dispatch}, id) {
      let newPosts = this.state.posts;
        console.log("1", newPosts)
      let newPost = await newPosts.find(item => item.id == id);
        console.log("2", newPost)
      newPost.claps += 1;
        console.log("3", newPost)
      await dispatch("editPost", newPost);
    }
  },
  getters: {
    error: s => s.error,
  },
  modules: {
    auth, post
  }
})
