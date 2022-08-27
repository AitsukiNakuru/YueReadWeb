import {defineStore} from "pinia/dist/pinia";


const adminStore = defineStore('adminStore', {
    state: () => {
        return {
            adminId: '',
            adminUsername: '',
            adminPassword: '',
            adminNickname: ''
        }
    }
})

export default adminStore