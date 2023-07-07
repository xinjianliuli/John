import axiosInstance from "../request";

// 登录接口 
export const RequestGoodLogin=(username,password)=>{
    return axiosInstance({
        method:'POST',
        url:'/api/login',
        data:{
            username,
            password,
        }
    })
}
// 列表数据接口  
export const  RequestGoodsList=(pageSize=5)=>{
    return axiosInstance({
        method:'GET',
        url:'/api/shop',
        params:{
            pageSize,
        }
    })
}
// 商品分类接口
export const RequestGoodsCategory=()=>{
    return axiosInstance({
        method:'GET',
        url:'/api/category',

    })
}
// 上传商品接口  
export const RequestGoodsADD=(formData)=>{
    const token = localStorage.getItem('TOKEN')
    return axiosInstance({
        method:'POST',
        url:'/api/shop/insert',
        headers:{'Content-Type':'multipart/form-data', Authorization: token},
        data: formData,
    })
}
// 删除商品接口 
export const RequestGoodsDetal=(id)=>{
    const token = localStorage.getItem('TOKEN')
    return axiosInstance({
        method:'GET',
        url:'/api/shop/delete',
        headers:{'Content-Type':'multipart/form-data', Authorization: token},
        params:{
            id,
        }
    })
}