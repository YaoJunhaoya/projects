<template>
  <!--banner轮播---全局组件-->
  <div class="swiper" id="mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="amg in list" :key="amg.id">
        <img :src="amg.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
    <div class="swiper-scrollbar"></div>
  </div>
</template>

<script>
import "swiper/swiper-bundle.min.css";
import Swiper, { Navigation, Pagination } from "swiper";
Swiper.use([Navigation, Pagination]);

export default {
  name: "Carousel",
  props: ["list"],
  watch: {
    bannerList: {
      immediate: true,
      // 监视handler的值，发生改变后运行
      handler(newValue, oldValue) {
        // handler值改变完成后，运行
        // 将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。
        this.$nextTick(() => {
          var mySwiper = new Swiper(".swiper", {
            // 第一次进入首页，在收到服务器数据之后，再使用Swiper。但是切换其他路由组件后，服务器数据已经接收，不会再次接收，但是这个路由组件会注销，所以里面的效果不会再次生效，需要使用mounted

            // direction: "vertical", // 垂直切换选项
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },

            // 如果需要滚动条
            scrollbar: {
              el: ".swiper-scrollbar",
            },
          });
        });
      },
    },
  },
};
</script>

<style>
</style>