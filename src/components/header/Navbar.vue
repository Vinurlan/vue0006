<template>
  <div class="nav-block">
    <b-navbar>
      <template slot="start">
        <b-navbar-item tag="router-link" to="/">
          Home
        </b-navbar-item>
        <b-navbar-item tag="router-link" to="/vue">
          Vue.js
        </b-navbar-item>
      </template>
    </b-navbar>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import '@/assets/styles.scss';

.nav-block {
  display: flex;
  justify-content: center;
  align-items: center;
  nav {
    width: 70%;
    height: 50px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    a {
      text-decoration: none;
      font-weight: bold;
      color: $colorHeaderFont;
      padding: 5px 20px;

      &.router-link-exact-active {
        color: #000;
      }
    }
  }
}

</style>
