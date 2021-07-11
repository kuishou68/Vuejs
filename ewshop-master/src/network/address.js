import {request} from './request';

// 添加地址
export function addAddress(params){
    // 返回地址
    return request({
        url:'/api/address',
        method: 'post',
        params
    })
}

// 编辑地址
export function EditAddress(id, params){
    // 返回地址
    return request({
        url:`/api/address/${id}`,
        method: 'PUT',
        params
    })
}

// 删除地址
export function DeleteAddress(id){
    // 返回地址
    return request({
        url:`/api/address/${id}`,
        method: 'DELETE'
    })
}

// 获取地址列表
export function getAddressList(){
    // 返回地址
    return request({
        url:'/api/address',
    })
}

// 地址详情
export function getAddressDetail(id){
    // 返回地址
    return request({
        url:`/api/address/${id}`,
        method: 'GET',
        params
    })
}