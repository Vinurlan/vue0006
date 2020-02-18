export default {
  actions: {
    async addPost({commit}, dataPost) {
      try {
        await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataPost),
      })
        .then(response => response.json())
        .then(data => commit("setPosts", data))
      } catch(error) {
        throw new Error(error);
      }
    },
    async editPost({dispatch}, dataPost) {
      try {
        await fetch(`http://localhost:3000/posts/${dataPost.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(dataPost),
        })
         await dispatch("getPosts");
      } catch(error) {
        throw new Error(error);
      }
    },
    async deletePost({dispatch}, id) {
      try {
        await fetch(`http://localhost:3000/posts/${id}`, {
          method: "DELETE"
        });
        await dispatch("getPosts")
      } catch(error) {
        throw new Error(error);
      }
    },
    async getPosts({commit}) {
      try {
        await fetch("http://localhost:3000/posts")
          .then(response => response.json())
          .then(data => commit("setPosts", data))

      } catch (error) {
          commit("setError", error);
          throw error;
      }
    },
    async addClap({dispatch}, id) {
      let newPosts = this.state.post.posts;
      let newPost = await newPosts.find(item => item.id == id);
      newPost.claps += 1;

      await dispatch("editPost", newPost);
    }
  },
  state: {
    posts: [],
  },
  getters: {
    allPosts(state) {
      return state.posts;
    }
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    }
  }
}
