<template>
  <header>
    <Sitebar />
    <Navbar />
  </header>
</template>

<script>
import Sitebar from "./header/Sitebar"
import Navbar from "./header/Navbar"

export default {
  name: "Header",
  components: {
    Sitebar, Navbar
  }
}
</script>

<style lang="scss">
@import '@/assets/styles.scss';

header {
  position: fixed;
  top: 0;
  width: 100%;
  box-shadow: 0 3px 6px 1px $colorHeaderFont;
  display: grid;
  z-index: 1;
  background: #fff;
}

</style>
