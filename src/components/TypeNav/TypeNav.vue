<template>
  <div class="type-nav">
    <div class="container" @mouseleave="leaveIndex" @mouseenter="enterShow">
      <h2 class="all">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <!-- 过渡动画 -->
      <transition name="sort">
        <div class="sort" v-show="show">
          <div class="all-sort-list2">
            <div class="item" v-for="(toba, index) in categoryList" v-show="index != 9" :key="toba.categoryId"
              @click="goSearch">
              <h3 @mouseenter="changeIndex(index)" :class="{ cur: currentIndex == index }">
                <a :data-categoryName="toba.categoryName" :data-category1Id="toba.categoryId">
                  {{ toba.categoryName }}</a>
                <!-- <router-link to="/search">{{ toba.categoryName }}</router-link> -->
              </h3>
              <div class="item-list clearfix" :style="{ display: currentIndex == index ? 'block' : 'none' }">
                <div class="subitem" v-for="c2 in toba.categoryChild" :key="c2.categoryId">
                  <dl class="fore">
                    <dt>
                      <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">
                        {{ c2.categoryName }}</a>
                    </dt>
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">
                          {{ c3.categoryName }}</a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// 把lodash全部的功能函数引入
// import _ from "lodash";
// 把lodash按需引入
import throttle from "lodash/throttle";

export default {
  name: "TypeNav",
  data() {
    return {
      // 存储用户鼠标移上哪个一级分类
      currentIndex: -1,
      show: true
    };
  },
  // 组件挂载完毕
  mounted() {
    
  },
  methods: {
    changeIndex: throttle(function (index) {
      // 鼠标进入修改响应数据属性currentIndex
      this.currentIndex = index;
    }, 50),
    leaveIndex() {
      // 鼠标离开的时候隐藏二三级分类
      this.currentIndex = -1;
      if (this.$route.path == '/search') {
        // 在search页面的时候，鼠标离开的时候商品分类进行隐藏
        this.show = false
      }
    },
    enterShow() {
      // 鼠标移入的时候商品分类进行展示
      if (this.$route.path == '/search') {
        this.show = true
      }
    },
    goSearch(event) {
      //1.把子节点a标签，加上自定义属性data-categoryName，其余的子节点是没有的
      //2.event.target获取当前触发事件标签的节点,带有data-categoryName的标签一定是a标签
      let element = event.target;
      // console.log(element);
      //节点有一个属性dataset属性，可以获取节点的自定义属性与属性值
      let { categoryname, category1id, category2id, category3id } = element.dataset;
      // console.log(element.dataset);
      // console.log(categoryname, category1id, category2id, category3id);
      // 如果标签身上拥有categoryname一定是a标签
      if (categoryname) {
        // 整理路由跳转参数
        let location = { name: 'search' };
        let query = { categoryName: categoryname }
        if (category1id) {
          // 点击的肯定是a标签的一级分类
          query.category1Id = category1id;
        } else if (category2id) {
          // 点击的肯定是a标签的二级分类
          query.category2Id = category2id;
        } else if (category3id) {
          // 点击的肯定是a标签的三级分类
          query.category3Id = category3id;
        }
        // 判断：如果路由跳转到时候，带有params参数，一起传递过去
        if(this.$route.params){
          location.params=this.$route.params
        }
        
        // 整理完参数 location对象的值就是路由要push的值，全部配置好了
        location.query = query;
        // 路由跳转  
        this.$router.push(location)
      }

    },
  },
  computed: {
    // 右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数就会立即执行一次
    // 注入一个参数state，其实即为大仓库中的数据
    ...mapState({
      // home是模块化的home
      categoryList: (state) => state.home.categoryList,
    }),
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }
    
    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }

        // .item:hover {
        //   // 鼠标移动上方显示高亮
        //   background-color: turquoise;
        // }
        .cur {
          background-color: rgb(192, 214, 241);
        }
      }
    }
  // 过渡动画的样式
    .sort-enter {
      // 过渡动画开始状态(进入)
      height: 0px;
    }

    .sort-enter-to {
      // 过渡动画开始状态(结束)
      height: 461px;
    }

    .sort-enter-active {
      // 定义动画时间，速率
      transition: all .5s linear;
      overflow: hidden;
    }

      // 过渡动画的样式
    .sort-leave-to {
      // 过渡动画离开状态(结束)
      height: 0px;
    }

    .sort-leave {
      // 过渡动画离开状态(开始)
      height: 461px;
    }

    .sort-leave-active {
      // 定义动画时间，速率
      transition: all .5s linear;
      overflow: hidden;

    }
  }
}
</style>