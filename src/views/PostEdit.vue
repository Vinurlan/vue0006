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
    const posts = await this.$store.state.posts;

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

<style lang="scss" scoped>

$widthForm: 800px;
$heightForm: 600px;

.postset-view {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.postset {
  width: $widthForm;
  height: $heightForm;
  box-shadow: 0 0 6px 1px black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__form {
    width: $widthForm*0.8;
    height: $heightForm*0.8;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    legend {
      font-size: 18pt;
      margin-bottom: 30px;
    }

    .field {
      margin-bottom: 0;
      margin-top: 30px;
      width: 100%;
    }

    .textarea {
      min-height: 50px !important;
      background: #000;

    }

    .inp-desc {
      max-height: 200px;
    }


    & > input{
      margin-top: 30px;
    }

  }

}

.invalid {
  color: red;
}

</style>
