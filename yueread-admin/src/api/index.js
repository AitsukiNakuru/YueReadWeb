import request from './request'

export const apiLogin = (data) => {
    return request({
        url: '/admin/login',
        method: 'POST',
        data
    })
}
export const apiUpdate = (data) => {
    return request({
        url: '/admin/update',
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

export const apiBookListByCategory = (data) => {
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
export const apiDeleteCategory = (data) => {
    return request({
        url: '/category/delete',
        method: 'POST',
        data
    })
}



export const apiUserList = (data) => {
    return request({
        url: '/user/list',
        method: 'POST',
        data
    })
}
export const apiUserUpdate = (data) => {
    return request({
        url: '/user/update',
        method: 'POST',
        data
    })
}



export const apiOrderList = () => {
    return request({
        url: '/order/listall',
        method: 'POST',
    })
}