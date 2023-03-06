import Vue from 'vue'
import App from './App.vue'
// 三级联动组件---全局组件
import TypeNav from '@/components/TypeNav/TypeNav.vue'
Vue.component(TypeNav.name, TypeNav)
import Carousel from '@/components/Carousel/Carousel.vue'
Vue.component(Carousel.name, Carousel)

// 引入swiper样式
import 'swiper/css'

// 引入MockServer.js-----mock数据
import "@/mock/mockServe.js"

// 引入路由
import router from '@/router'

// 引入vuex的store
import store from '@/store/store.js'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 注册路由
  router,
  // 注册仓库：组件实例的身上会多一个实例$store属性
  store
}).$mount('#app')
