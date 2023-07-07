import axios from 'axios'

const axiosInstance =axios.create({
    baseURL:'http://43.136.34.132:8089'
})
axiosInstance.interceptors.request.use(
    config=>{
        console.log('请求的数据',config)
        return config 
    },
    err=>Promise.reject(err)
)
axiosInstance.interceptors.response.use(
    res=>{
        return res.data
    },
    err=>Promise.reject(err)
)
export default axiosInstance