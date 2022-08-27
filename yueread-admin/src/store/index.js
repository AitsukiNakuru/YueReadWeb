import {defineStore} from "pinia/dist/pinia";


export const useAdminStore = defineStore('AdminStore', {
    state: () =>{
        return {
            adminStore: {
                // adminId: 'lin',
                // adminUsername: 'lin',
                // adminPassword: 'lin',
                // adminNickname: 'lin'
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
                // adminId: 'lin',
                // adminUsername: 'lin',
                // adminPassword: 'lin',
                // adminNickname: 'lin'
            },
        }
    },

    getters: {

    },

    actions: {

    },
    persist: true
})

export const useCategory = defineStore('CategoryStore', {
    state: () =>{
        return {
            categoryStore: {
                // adminId: 'lin',
                // adminUsername: 'lin',
                // adminPassword: 'lin',
                // adminNickname: 'lin'
            },
        }
    },

    getters: {

    },

    actions: {

    },
    persist: true
})