import {defineStore} from "pinia/dist/pinia";


export const useUserStore = defineStore('UserStore', {
    state: () =>{
        return {
            userStore: {},
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
            bookList: [],
            //分类好的书籍列表
            bookListByCategory: [],
            selectBook: {}
        }
    },

    getters: {

    },

    actions: {

    },
    persist: true
})

export const useCategoryStore = defineStore('CategoryStore', {
    state: () =>{
        return {
            categoryList: [],
            selectCategory: {},
        }
    },

    getters: {

    },

    actions: {

    },
    persist: true
})



