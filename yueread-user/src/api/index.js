
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
export const apiUpdate = (data) => {
    return request({
        url: '/user/update',
        method: 'POST',
        data
    })
}


export const apiBookListAll = (data) => {
    return request({
        url: '/book/listalluser',
        method: 'POST',
        data
    })
}
export const apiBookListByCategory = (data) => {
    return request({
        url: '/book/listbycategoryuser',
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


export const apiCarouselBookList = (data) => {
    return request({
        url: '/book/carousel',
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


export const apiPurchaseBook = (data) => {
    return request({
        url: '/book/purchase',
        method: 'POST',
        data
    })
}
export const apiPurchaseList = (data) => {
    return request({
        url: '/book/purchaselist',
        method: 'POST',
        data
    })
}


export const apiUserOrderList = (data) => {
    return request({
        url: '/order/listbyuser',
        method: 'POST',
        data
    })
}
export const apiOrderRefund = (data) => {
    return request({
        url: '/order/refund',
        method: 'POST',
        data
    })
}