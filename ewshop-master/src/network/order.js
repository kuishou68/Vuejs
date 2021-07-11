import {request} from './request';

// 创建定单
export function createOrder(params) {
    return request({
        url:'/api/orders',
        method: 'post',
        params
    })
}

// 获取定单预览
export function getOrderPreview() {
    return request({
        url:'/api/orders/preview'
    })
}

// 定单支付, 获取二维
export function payOrder(order, params) {
    return request({
        url:`/api/orders/${order}/pay`,
        params
    })
}

// 定单状态
export function payOrderStatus(order) {
    return request({
        url:`/api/orders/${order}/status`
    })
}

// 获取定单列表 {page:1, status:2, include:'user,orderDetail.goods'}
export function getOrderList(params) {
    return request({
        url:'/api/orders',
        method: 'get',
        params
    })
}

// 定单详情
export function getOrderDetail(order) {
    return request({
        url:`/api/orders/${order}`,
        params: {
            include:'user,orderDetails.goods'
        }
    })
}

// 确认定单
export function confirmOrder(order) {
    return request({
        url:`/api/orders/${order}/confirm`,
        method: 'patch'
    })
}

// 获取物流信息 /api/orders/{order}/express
export function viewExpress(order) {
    return request({
        url:`/api/orders/${order}/express`
    })
}