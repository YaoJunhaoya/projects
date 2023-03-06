// 引入mockjs模块
import Mock from "mockjs";
// 把JSON数据格式引入[json文件没有暴露，但是可以引进]
// webpack默认对外暴露：图片、JSON数据格式
import banner from './banner.json'
import floor from './floor.json'

// mock数据
Mock.mock("/mock/banner", { code: 200, data: banner })//首页大轮播图的数据
Mock.mock("/mock/floor", { code: 200, data: floor })