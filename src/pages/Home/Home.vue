<template>
  <div>
    <!-- 三级联动全局组件 -->
    <TypeNav></TypeNav>

    <ListContainerVue></ListContainerVue>
    <RecommendVue></RecommendVue>
    <RankVue></RankVue>
    <Like></Like>
    <floorVue
      v-for="floors in FloorList"
      :key="floors.id"
      :floors="floors"
    ></floorVue>
    <BrandVue></BrandVue>
  </div>
</template>

<script>
import ListContainerVue from "./ListContainer/ListContainer.vue";
import RankVue from "./Rank/Rank.vue";
import RecommendVue from "./Recommend/Recommend.vue";
import Like from "./Like/Like.vue";
import floorVue from "./floor/floor.vue";
import BrandVue from "./Brand/Brand.vue";
import { mapState } from "vuex";

export default {
  name: "HoMe",
  mounted() {
    this.$store.dispatch("getFloorList");
  },
  computed: {
    ...mapState({
      FloorList: (state) => state.home.getFloorList,
    }),
  },
  components: {
    ListContainerVue,
    RecommendVue,
    RankVue,
    Like,
    floorVue,
    BrandVue,
  },
};
</script>

<style></style>
