<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header/Header.vue";
import Footer from "./components/Footer/Footer.vue";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted() {
    // 通知vuex发请求，获取数据，储存在仓库中（只需要发一次请求）
    this.$store.dispatch("categoryList");
    if (this.$route.path != "/home") {
      this.show = false;
    }

    // 将数据存储在仓库中,mack里的数据
    this.$store.dispatch("getBannerList");
  },
};
</script>

<style></style>
