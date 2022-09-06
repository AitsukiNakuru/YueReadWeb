import {defineStore} from "pinia/dist/pinia";


export const useAdminStore = defineStore('AdminStore', {
    state: () =>{
        return {
            adminStore: {

            },
        }
    },

    getters: {

    },

    actions: {

    },
    persist: true
})

export const useBookStore = defineStore('BookStore', {
    state: () =>{
        return {
            //所有书籍列表
            bookList: {

            },
            //分类好的书籍列表
            bookListByCategory: {

            }
        }
    },

    getters: {

    },

    actions: {

    },

})

export const useCategory = defineStore('CategoryStore', {
    state: () =>{
        return {
            //分类列表
            categoryList: {

            },
        }
    },

    getters: {

    },

    actions: {

    },

})

export const useOrder = defineStore('OrderStore', {
    state: () =>{
        return {
            //分类列表
            orderList: {

            },
        }
    },

    getters: {

    },

    actions: {

    },

})

export const useHomeParams = defineStore('HomeParamsStore', {
    state: () =>{
        return {
            activeMenu: '1'
        }
    },

    getters: {

    },

    actions: {

    },
    persist: true
})