// 当前这个模块：API进行统一管理
import requests from "./request";
import mockRequests from './mockAjax'
// 三级联动的接口
//  api/product/getBaseCategoryList get 无参数

//发送请求:axios发请求返回结果Promise对象
export const reqCategoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'get' });

// 获取banner（home首页轮播图接口）
export const reqBannerList = () => mockRequests({ url: '/banner', method: 'get' });

// 获取floor数据
export const reqFloorList = () => mockRequests.get("/floor");

// 获取搜索模块数据 地址：/api/list  请求方式：post  需要参数
// 获取搜索模块的数据，给服务器传递一个默认参数，至少是一个空对象
export const reqGetSearchInfo = (params) => requests({ url: '/list', method: 'post', data: params })
