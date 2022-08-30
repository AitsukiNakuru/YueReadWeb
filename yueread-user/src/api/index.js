
import request from './request'

export const apiLogin = (data) => {
    return request({
        url: '/user/login',
        method: 'POST',
        data
    })
}
export const apiRegister = (data) => {
    return request({
        url: '/user/register',
        method: 'POST',
        data
    })
}


export const apiBookList = (data) => {
    return request({
        url: '/book/list',
        method: 'POST',
        data
    })
}
export const apiBookListAll = (data) => {
    return request({
        url: '/book/listall',
        method: 'POST',
        data
    })
}
export const apiBookCategoryList = (data) => {
    return request({
        url: '/book/listbycategory',
        method: 'POST',
        data
    })
}
export const apiUpdateBook = (data) => {
    return request({
        url: '/book/update',
        method: 'POST',
        data
    })
}
export const apiAddBook = (data) => {
    return request({
        url: '/book/add',
        method: 'POST',
        data
    })
}


export const apiCategoryList = (data) => {
    return request({
        url: '/category/list',
        method: 'POST',
        data
    })
}
export const apiAddCategory = (data) => {
    return request({
        url: '/category/add',
        method: 'POST',
        data
    })
}
export const apiUpdateCategory = (data) => {
    return request({
        url: '/category/update',
        method: 'POST',
        data
    })
}


export const apiIndexConfigList = (data) => {
    return request({
        url: '/index/list',
        method: 'POST',
        data
    })
}


export const apiAddCartItem = (data) => {
    return request({
        url: '/cart/add',
        method: 'POST',
        data
    })
}
export const apiUpdateCartItem = (data) => {
    return request({
        url: '/cart/update',
        method: 'POST',
        data
    })
}
export const apiDeleteCartItem = (data) => {
    return request({
        url: '/cart/delete',
        method: 'POST',
        data
    })
}
export const apiCartItemList = (data) => {
    return request({
        url: '/cart/list',
        method: 'POST',
        data
    })
}

