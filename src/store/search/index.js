import { reqGetSearchInfo } from '@/api/index'

// search模块小仓库
const actions = {
    async getSearchList(context, value = {}) {
        // reqGetSearchInfo这个函数调用获取服务器数据的时候，至少传递一个参数（空对象）
        let result = await reqGetSearchInfo(value)
        if (result.code == 200) {
            context.commit('GETSEARCHLIST', result.data);
        }
    }
};
const mutations = {
    GETSEARCHLIST(state, value) {
        state.searchList = value
    }

};
const state = {
    searchList: {}
};
const getters = {
    goodsList(state) {
        return state.searchList.goodsList || []
    },
    trademarkList(state) {
        return state.searchList.trademarkList || []
    },
    attrsList(state) {
        return state.searchList.attrsList || []
    }
};

export default {
    actions,
    mutations,
    state,
    getters
}