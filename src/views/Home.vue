<template>
  <div class="home">
    <div class="home__body" v-if="loading">
      <b-button tag="router-link" type="is-success" to="/postset" class="btn-add-post">Добавить пост</b-button>
      <Post
        v-for="post of posts"
        :key="post.id"
        :postprop="post"
        @delete="deletePost"
      />
    </div>
  </div>
</template>

<script>
import Post from "@/components/Post"

export default {
  name: 'Home',
  components: {
    Post
  },
  data() {
    return {
      posts: [],
      loading: false,
    }
  },
  methods: {
    async deletePost(id) {
      try {
        await this.$store.dispatch("deletePost", id);
        this.posts = this.$store.state.posts;
      } catch(error) {
        console.error(error)
      }
    },
  },
  async mounted() {
    await this.$store.dispatch("getPosts");
    this.posts = await this.$store.state.posts;
    this.loading = true;
  }

}
</script>

<style lang="scss" scoped>

.home {
  width: 100%;
  margin-top: 140px;
  display: flex;
  justify-content: center;
  align-items: center;

  &__body {
    width: 70%;

    a {
      margin-bottom: 20px
    }
  }
}

</style>
