<template>
  <div class="postset-view">
    <div class="postset">
      <form class="postset__form" @submit.prevent="submitPost">
        <legend>Добавление поста</legend>

        <b-field label="Title">
          <b-input maxlength="100" type="text" v-model="title"></b-input>
        </b-field>
        <b-field label="Description">
          <b-input maxlength="200" type="textarea" v-model="desc"></b-input>
        </b-field>

        <b-button tag="input" native-type="submit" type="is-ligth" value="Отправить" />
      </form>
      <b-button tag="router-link" to="/" type="is-text">На главную</b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostSet",
  data() {
    return {
      title: "",
      desc: "",
    }
  },
  methods: {
    async submitPost() {
      let date = new Date();

      let lengthPosts = this.$store.state.post.posts.length;
      let idPost = lengthPosts == 0 ? 0 : this.$store.state.post.posts[lengthPosts-1].id+1;

      const dataPost = {
        "id": idPost,
        "title": this.title,
        "description": this.desc,
        "claps": 0,
        "createdAt": date,
        "updateAt": date,
        "userId": this.$store.state.user.id
      }


      try {
        await this.$store.dispatch("addPost", dataPost);
        this.$router.push("/");
      } catch (error) {
        console.error(error)
      }
    }
  },
  async mounted() {
    await this.$store.dispatch("getData");
  }
}
</script>
