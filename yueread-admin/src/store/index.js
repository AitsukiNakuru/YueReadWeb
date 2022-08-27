import admin from './admin'
import adminStore from "./admin";


// 统一导出useStore方法
export default function useStore() {
    return {
        admin: adminStore()
    }
}