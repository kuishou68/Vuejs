import {request} from "@/network/request";

// 分类数据请求
export function getCategory() {
    return request({
        url: '/api/goods'
    })
}

// 根据排序类型获取数据 : cid=0 获取所有数据
export function getCategoryGoods(order = 'sales', cid = 0, page = 1) {
    return request({
        url: '/api/goods?category_id=' + cid + '&page=' + page + '&' + order + '=1'
    })
}
