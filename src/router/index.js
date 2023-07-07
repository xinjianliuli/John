import { createRouter,createWebHistory } from "vue-router";
import Home from '../view/Home/home.vue'
import Login from '../view/Login/login.vue'
const router =createRouter({
    history:createWebHistory(),
    routes:[
        {
            path:'/',
            redirect:'/login',
        },
        {
            path:'/login',
            name:'login',
            component:Login,
        },
        {
            path:'/home',
            name:'home',
            component:Home,
            children:[
                {
                    path:'/goods',
                    component:()=>import('../view/plateform/Goods.vue')
                },
                {
                    path:'/category',
                    component:()=>import('../view/plateform/Category.vue')
                }
            ]
        }
    ],
})
router.beforeEach((to, from, next) => {
    // 如果是在登录 执行下一步 
    
   if(to.path=='/login' ){
    next();
   }else{
    // 获取token  
    const token =localStorage.getItem('TOKEN')
    // 如果token不存在或者是null 就重定向到登录 否则就执行下一步  
   if(token===null || token===''){
    next('/login')
   }else{
    next()
   }
   }
  });
export default router 