// 对axios函数库进行二次封装
import useUserStore from "@/store/modules/user";
import axios from "axios";

const request=axios.create({
    baseURL: '/api',
    timeout: 5000//超时时间设置
})

// 请求拦截器
request.interceptors.request.use((config)=>{
    let useStore=useUserStore();
    if(useStore.userInfo.token) {
        config.headers.token=useStore.userInfo.token
    }
    
    return config
})

//响应拦截器
request.interceptors.response.use((response)=>{
    return response.data
},(error)=>{
    return Promise.reject(new Error(error.message))
})

export default request