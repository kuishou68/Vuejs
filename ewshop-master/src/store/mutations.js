// 所有的状态管理必须要经过这里，唯一的路径
const mutations = {
    // 是否登录（固定值，状态资源）
    setIsLogin(state, payload) {
        state.user.isLogin = payload
    },
    // 添加购物车数量的方法
    addCart(state, payload) {
        // 传递一个数量count
        state.cartCount = payload.count
    }
}

export default mutations
