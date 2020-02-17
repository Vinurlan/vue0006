<template>
  <div class="post">
    <!-- <b-loading :is-full-page="false"  :can-cancel="false" v-if="!loading"></b-loading> -->
    <div class="post__content" v-if="loading">
      <div class="info-setting">
        <div class="author">User ID: {{postprop.userId}}</div>
        <div class="author">Create: {{postprop.createdAt}}</div>
        <div class="author">Update: {{postprop.updateAt}}</div>
        <div class="author">Post ID: {{postprop.id}}</div>
      </div>
        <div class="content">
        <div class="title">{{postprop.title}}</div>
        <div class="description">{{postprop.description}}</div>
      </div>
      <div class="post_footer">
        <b-button class="claps" @click="addClapLike" v-if="showClaps">
          <b-icon
            pack="fas"
            icon="heart"
            size="is-small">
          </b-icon>
        <span class="claps-count">{{postprop.claps}}</span></b-button>
        <div class="buttons" v-if="showButton">
          <b-button class="buttons__edit" @click="editPost">Edit</b-button>
          <b-button type="is-danger" class="buttons__delete" @click="deletePost">Delete</b-button>
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
    }
  },
  methods: {
    deletePost() {
      this.$emit("delete", this.postprop.id)
    },
    editPost() {
      this.$router.push({name: "PostEdit", params: {id: this.postprop.id}});
    },
    async addClapLike() {
      await this.$store.dispatch("addClap", this.postprop.id)
    }
  },
  computed: {
    showButton() {
      return true;
      // console.log(this.$store.state.user.role)
      // return this.$store.state.user.role == "admin";
    },
    showClaps() {
      return true
      // return this.$store.state.user.role == "user";
    }
  },
  mounted() {
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
  }

  &_footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 80px;
    border-top: 1px solid rgb(184, 184, 184);

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
