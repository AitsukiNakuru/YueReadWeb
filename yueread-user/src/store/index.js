import {defineStore} from "pinia/dist/pinia";


export const useUserStore = defineStore('UserStore', {
    state: () =>{
        return {
            userStore: {

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
            bookStore: {

            },
            selectCategory: {

            },
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
            categoryStore: {

            },
        }
    },

    getters: {

    },

    actions: {

    },

})

export const useIndexConfigStore = defineStore('IndexConfigStore', {
    state: () =>{
        return {
            IndexConfigStore: {

            },
        }
    },

    getters: {

    },

    actions: {

    },

})

