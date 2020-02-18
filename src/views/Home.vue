<template>
  <div class="home">
    <div class="home__body" v-if="loading">
      <b-pagination @change="pagHandler" v-if="visiblePagination"
        :total="postsLength"
        :current.sync="currPage"
        range-before="1"
        range-after="1"
        :per-page="perPage"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page">
      </b-pagination>
      <b-button tag="router-link" type="is-link" to="/postset" class="btn-add-post" v-if="showButton">Добавить пост</b-button>
      <Post
        v-for="post in currPosts"
        :key="post.id"
        :postprop="post"
        @delete="deletePost"
      />
    </div>

  </div>
</template>

<script>
import Post from "@/components/Post"
import {mapGetters, mapActions} from "vuex"

export default {
  name: 'Home',
  components: {
    Post
  },
  data() {
    return {
      loading: false,
      currPage: 1,
      perPage: 10
    }
  },
  methods: {
    ...mapActions(["getPosts"]),

    async deletePost(id) {
      try {
        await this.$store.dispatch("deletePost", id);
      } catch(error) {
        console.error(error)
      }
    },
    pagHandler(e) {
      this.currPage = e;
    }
  },
  computed: {
    ...mapGetters(["allPosts"]),
    postsLength() {
      return this.allPosts.length;
    },
    visiblePagination() {
      return this.postsLength > this.perPage;
    },
    currPosts() {
      return this.allPosts.slice(this.perPage * (this.currPage - 1), this.perPage * this.currPage);
    },
    showButton() {
      return this.isUserRole == "admin";
    },
    isUserRole() {
      return this.$store.getters.isUserRole;
    }
  },
  async mounted() {
    await this.getPosts();
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
