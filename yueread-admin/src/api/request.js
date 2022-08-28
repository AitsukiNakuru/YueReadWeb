import axios from 'axios'
import {ElMessage} from "element-plus";

const service = axios.create({
    baseURL: 'http://localhost:9090',
    timeout: 5000
})


service.interceptors.response.use(response => {
    const data = response.data
    return Promise.resolve(data)
}, error => {
    return Promise.reject(error)
})

export default service