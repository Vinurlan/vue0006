<template>
  <div>
     <Header />
     <router-view />
  </div>
</template>

<script>
import Header from "@/components/Header"

export default {
  name: "MainLayout",
  components: {
    Header
  },
  async mounted() {
    await this.$store.dispatch("getData");
  }
}
</script>
