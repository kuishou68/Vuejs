import {request} from "@/network/request";

// 分类数据请求
export function getDetail(id) {
    return request({
        url: '/api/goods/' + id
    })
}
