import Vue from 'vue';
import VueRouter from 'vue-router';
// import vueRoute from 'vue-router';

Vue.use(VueRouter);
import Home from '@/pages/Home/Home.vue'
import Login from '@/pages/Login/Login.vue'
import Register from '@/pages/Register/Register.vue'
import Search from '@/pages/Search/Search.vue'

// 防止多次点击相同的触发警告
// 把VueRouter原型对象的push，想保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

// 重写push|replace
// 第一个参数：告诉原来push方法，你往哪里跳转（传递哪些参数）
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        // call||aooly
        // 相同点：都可以调用函数一次，都可以篡改函数的上下文一次
        // 不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
        originPush.call(this, location, resolve, reject)
    } else {
        //如果没有resolve或者reject
        originPush.call(this, location, () => { }, () => { })

    }
}

VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        // call||aooly
        // 相同点：都可以调用函数一次，都可以篡改函数的上下文一次
        // 不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
        originReplace.call(this, location, resolve, reject)
    } else {
        //如果没有resolve或者reject
        originReplace.call(this, location, () => { }, () => { })

    }
}

export default new VueRouter({
    routes: [
        {
            // 重定向,在项目跑起来的时候就出现的路由
            path: '*',
            redirect: '/home'
        },
        {
            // 主页
            name: 'home',
            path: '/home',
            component: Home,
            meta: {
                // 判断是否显示Footer组件
                show: true
            }
        },
        {
            // 登录
            name: 'login',
            path: '/login',
            component: Login,
            meta: {
                show: false
            }
        },
        {
            // 注册
            name: 'register',
            path: '/register',
            component: Register,
            meta: {
                show: false
            }
        },
        {
            // 搜索
            name: 'search',
            path: '/search',
            component: Search,
            meta: {
                show: true
            }
        },
    ]
})