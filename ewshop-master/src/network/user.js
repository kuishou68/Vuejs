import {request} from "@/network/request";

// 用户注册
export function register(data) {
    return request({
        url: '/api/auth/register',
        method:'POST',
        data
    })
}

// 用户登录
export function login(data) {
    return request({
        url: '/api/auth/login',
        method:'POST',
        data
    })
}

// 用户退出
export function logout() {
    return request({
        url: '/api/auth/logout',
        method:'POST',
    })
}

export function getUser() {
    return request({
        url:'/api/user',
    })
}

