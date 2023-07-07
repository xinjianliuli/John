<template>
<el-container>
    <el-aside width="auto">
        <div class="title">
            <el-image :src="url" />
            <p v-if="isCollapse">轩兰轩后台</p>
        </div>
        <p class="home">首页</p>
        <el-menu
        :collapse="!isCollapse"
        active-text-color="#79bbff"
        background-color="#545c64"
        text-color="#fff"
        class="el-menu-vertical-demo"
        >
        <el-sub-menu index="1">
            <template #title>
                <el-icon><Plus /></el-icon><span>商品管理</span>
            </template>
            <el-menu-item index="1-1"  @click="bindRouter('/goods')">商品列表</el-menu-item>
            <el-menu-item index="1-2" @click="bindRouter('/category')">分类列表</el-menu-item>
        </el-sub-menu>
        <el-sub-menu>
            <template #title>
                <el-icon><Aim /></el-icon><span>用户管理</span>
            </template>
            <el-menu-item index="2-1">用户列表</el-menu-item>
            <el-menu-item index="2-2">用户添加</el-menu-item>
        </el-sub-menu>
        </el-menu>
    </el-aside>
    <el-container>
        <el-header>
            <!-- 收缩 -->
            <el-icon size="26" @click="isCollapse=!isCollapse">
               <component :is="isCollapse ? Fold :  Expand "></component>
            </el-icon>
            <div class="headerRight">
                <p>欢迎{{acount?.nick}}</p>
              <el-dropdown @command="handbind">
                <span>
                  <el-image :src="acount?.headerimg" style="width:30px;height:30px;"></el-image>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="setting">系统设置</el-dropdown-item>
                        <el-dropdown-item command="exit">退出系统</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
        </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
</el-container>
</template>

<script setup>
import {ref,onMounted,computed}from 'vue'
import {Plus,Aim,Expand,Fold,}from '@element-plus/icons-vue'
import {useAccount}from '../../store/modules/user'
import { useRouter } from 'vue-router';
const router =useRouter()
const url=ref('../../../public/wisteria.jpg')
const useStore =useAccount()
const isCollapse=ref(true)
const acount =computed(()=>{
   return useStore.user
})
function bindRouter(path){
    router.replace({path})
}
function handbind(type){
  
    switch(type){
        case 'exit':
        router.replace({path:'/login'})
        break
    }
    
}
</script>

<style lang='scss' scoped>
.el-container{
    width: 100%;
    height: 100vh;
    .el-aside{
        height: 100%;
        background-color: rgb(93, 107, 212);
        .title{
            display: flex;
            align-items: center;
            padding: 20px 20px;
            .el-image{
                width: 30px;
                height: 30px;
            }
            p{
                color:white;
                margin-left: 5px;
            }
        }
        .home{
            padding: 20px ;
        }
        .el-menu-vertical-demo:not(.el-menu--collapse){
            width: 200px;
        }
        .el-menu{
            border-right: 0;
        }
       
    }
    .el-container{
        .el-header{
            width: 100%;
            height: 70px;
            background-color: #fff;
            border-bottom: 2px solid #ccc;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .headerRight{
                display: flex;
                align-items: center;
            }
        }
    }
}
</style>
