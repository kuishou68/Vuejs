import {request} from "./request";

// 添加购物车
export function addCart(data) {
    return request({
        url: '/api/carts',
        method: 'post',
        data
    })
}

// 删除购物车
export function deleteCartItem(id) {
    return request({
        url: `/api/carts/${id}`,
        method: 'delete'
    })
}

// 修改购物车, data = {num:1}
export function modifyCart(id, data) {
    return request({
        // 反引号表示使用模板字符串，传过来的url是一个变量
        url: `/api/carts/${id}`,
        method: 'PUT',
        data
    })
}

// 选择商品的状态 checked, 参数为所有选中的 ID
export function checkedCart(data) {
    return request({
        url: '/api/carts/checked',
        method: 'PATCH',
        data
    })
}

// 获取购物车列表
export function getCart(data = '') {
    return request({
        url: '/api/carts?' + data
    })
}
