<template>
  <div class="post">
    <div class="post__content" v-if="loading">
      <div class="info-setting">
        <div class="author">User ID: {{postprop.userId}}</div>
        <div class="author">Post ID: {{postprop.id}}</div>
      </div>
      <div class="content">
        <div class="title">{{postprop.title}}</div>
        <div class="description">{{postprop.description}}</div>
      </div>
      <div class="post_footer">
        <div class="time-ago">{{updateAgo}} назад</div>
        <b-button class="claps" @click="addClapLike" v-if="showClaps" :disabled="disabled">
          <b-icon
            pack="fas"
            icon="heart"
            size="is-small">
          </b-icon>
        <span class="claps-count">{{getClaps}}</span></b-button>
        <div class="buttons" v-if="showButton">
          <b-button class="buttons__edit" @click="editPost">Изменить</b-button>
          <b-button type="is-danger" class="buttons__delete" @click="deletePost">Удалить</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: "Post",
  props: {
    postprop: Object,
  },
  data() {
    return {
      loading: false,
      idself: null,
      disabled: false,
      course: ""
    }
  },
  methods: {
    async deletePost() {
      await this.$emit("delete", this.idself)
    },
    editPost() {
      this.$router.push({name: "PostEdit", params: {id: this.idself}});
    },
    async addClapLike() {
      this.disabled = true;
      await this.$store.dispatch("addClap", this.idself)
      this.disabled = false;
    }
  },
  computed: {
    showButton() {
      return this.isUserRole == "admin";
    },
    showClaps() {
      return this.isUserRole == "user";
    },
    getClaps() {
      let index = this.$store.state.post.posts.findIndex(item => item.id == this.idself);
      return this.$store.state.post.posts[index].claps;
    },
    isUserRole() {
      return this.$store.getters.isUserRole;
    },
    updateAgo() {
      var datePrev = new Date(this.postprop.updateAt);
      let dateNow = new Date();
      let diff = dateNow - datePrev;

      let filter = Math.floor(diff/1000/60);

      if (filter > 59) {
        filter = Math.floor(diff/1000/60/60);
        return `${filter} ч.`;
      }

      return `${filter} мин.`;
    }
  },
  mounted() {
    this.idself = this.postprop.id;
    this.loading = true;
  },
}
</script>

<style lang="scss" scoped>

.post {
  width: 100%;
  border: 1px solid rgb(184, 184, 184);
  border-radius: 3px;
  margin: 20px auto;

  &__content{
    position: relative;

    .info-setting {
      position: relative;
      display: flex;
      justify-content: flex-start;

      .author {
        color: #aaa;
        margin: 20px;
      }

    }

    .content {
      margin: 10px 20px;

      .description {
        text-align: left;
      }
    }
  }

  &_footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 80px;
    border-top: 1px solid rgb(184, 184, 184);

    .time-ago {
      position: absolute;
      left: 0;
      margin-left: 30px;
      color: #aaa;
      align-self: center;
      justify-self: flex-start;
    }

    .claps {
      bottom: 0;
      left: 0;
      margin: auto 30px;
      width: 60px;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .claps-count {
        position: absolute;
      }
    }

    .buttons {
      justify-self: center;
      align-self: center;
      margin: auto 30px;

      .button {
        margin: auto 8px;
      }
    }
  }
}


</style>
