import {request} from "@/network/request";

export function getHomeAllData() {
    return request({
        url: '/api/index'
    })
}

// 获取商品列表，不传参数，默认以销量排行
export function getHomeGoods(type = 'sales', page = 1) {
    return request({
        url: '/api/index?' + type + '=1&page=' + page
    })
}
