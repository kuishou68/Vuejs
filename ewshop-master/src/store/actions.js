// 异步处理数据
// 获取购物车长度
import {getCart} from "@/network/cart";

const actions = {
    updateCart({commit}){
        getCart().then(res=>{
            // 如果提交成功，   
            commit('addCart',{count:res.data.length || 0})
        })
    }
}
// 导出 actions
export default actions
