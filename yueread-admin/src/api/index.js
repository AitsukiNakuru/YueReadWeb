import request from './request'

export const apiLogin = (data) => {
    return request({
        url: '/admin/login',
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