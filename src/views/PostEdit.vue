<template>
  <div class="postset-view">
    <div class="postset">
      <form class="postset__form" @submit.prevent="submitPost">
        <legend>Изменение поста</legend>

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
      post: {}
    }
  },
  methods: {
    async submitPost() {
      let date = new Date();

      const dataPost = {
        "id": this.post.id,
        "title": this.title,
        "description": this.desc,
        "claps": this.post.claps,
        "createdAt": this.post.date,
        "updateAt": date,
        "userId": this.$store.state.user.id
      }

      try {
        await this.$store.dispatch("editPost", dataPost);
        this.$router.push("/");
      } catch (error) {null;}
    }
  },
  async mounted() {
    await this.$store.dispatch("getData");

    const idPost = this.$route.params.id;
    await this.$store.dispatch("getPosts");
    const posts = await this.$store.state.post.posts;

    for(let post of posts) {
      if (post.id == idPost) {
        this.post = post;
      }
    }

    this.title = this.post.title;
    this.desc = this.post.description;
  }
}
</script>
