import { reqCategoryList, reqBannerList, reqFloorList } from '@/api/index.js'

// home模块小仓库
const actions = {
    async categoryList(commit) {
        let result = await reqCategoryList();
        if (result.code == 200) {
            commit.commit('CATEGORYLIST', result.data)
        }
    },
    async getBannerList(context) {
        let result = await reqBannerList();
        context.commit('GETBANNERLIST', result.data)
    },
    async getFloorList(context) {
        let result = await reqFloorList();
        context.commit('GETFLOORLIST', result.data)
    }
};
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
    },
    GETBANNERLIST(state, getBannerList) {
        state.getBannerList = getBannerList;
        // console.log(getBannerList);
    },
    GETFLOORLIST(state, getFloorList) {
        state.getFloorList = getFloorList;
    }

};
const state = {
    categoryList: [],
    getBannerList: [],
    getFloorList: []
};
const getters = {

};

export default {
    actions,
    mutations,
    state,
    getters
}