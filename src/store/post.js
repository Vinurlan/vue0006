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
        await dispatch("getPosts")
      } catch(error) {
        throw new Error(error);
      }
    },
    async deletePost({dispatch}, id) {
      try {
        await fetch(`http://localhost:3000/posts/${id}`, {
          method: "DELETE"
        })
          .then(await dispatch("getPosts"))
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
    }
  }
}
