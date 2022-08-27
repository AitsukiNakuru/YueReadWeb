import axios from 'axios'
import {ElMessage} from "element-plus";

const service = axios.create({
    baseURL: 'http://localhost:9090',
    timeout: 5000
})


service.interceptors.response.use(response => {
    const data = response.data
    if (response.status === 200) {
        return data;
    } else {
        ElMessage.error('服务器响应错误')
    }
})

export default service