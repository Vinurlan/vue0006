<template>
  <div class="sitebar-block">
    <div class="sitebar">
      <b-navbar>

        <template slot="end" v-if="$store.state.user == null">
          <b-navbar-item tag="router-link" to="/login">
            Sign in
          </b-navbar-item>
          <b-navbar-item tag="router-link" to="/register" class="sign-up">
            Get started
          </b-navbar-item>
        </template>

        <template slot="end" v-if="$store.state.user != null">
          <b-navbar-item>
            <b-icon
              pack="fas"
              icon="user"
              size="is-medium">
            </b-icon>

            <b-navbar-dropdown :label="$store.state.user.name">
              <b-navbar-item tag="a" @click.prevent="logout">
                  Выйти
              </b-navbar-item>
            </b-navbar-dropdown>

          </b-navbar-item>
        </template>

      </b-navbar>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sitebar",
  data() {
    return {

    }
  },
  methods: {
    async logout() {
      this.$store.dispatch("logout");
    }
  }

}
</script>

<style lang="scss" scoped>
@import "@/assets/styles.scss";

.sitebar-block{
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid $colorHeaderFont;

  .sitebar {
    width: 70%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    z-index: 31;

      nav {
        width: 100%;
      }

      .sign-up {
        border: 1px solid #000;
        border-radius: 5px;
      }

  }
}

</style>
