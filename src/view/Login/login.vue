<template>
  <div class="container">
    <div class="warper">
      <h2>轩兰轩后台</h2>
      <el-form :rules="rules" :model="acount" ref="loginRef">
        <el-form-item prop="username"> 
            <el-input v-model="acount.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input v-model="acount.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item > 
            <el-button type="primary" @click="bindLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import {ref}from 'vue'
import { RequestGoodLogin}from '../../api/path/index'
import {ElMessage}from 'element-plus'
import {useRouter}from 'vue-router'
import {useAccount}from '../../store/modules/user'
const store =useAccount()
const router=useRouter()
const loginRef =ref(null)
const acount =ref({
    username:'root',
    password:'root',
})
const rules =ref({
    username:[{required:true,message:'请输入用户名',trigger:'blur'}],
    password:[{required:true,message:'请输入密码',trigger:'blur'}]
})
const bindLogin=()=>{
    loginRef.value.validate((valid)=>{
        if(valid){
            onLogin()
        }
    }) 
}
async function onLogin(){
  const data = await RequestGoodLogin(acount.value.username, acount.value.password);
  const { resultCode, resultInfo,token} = data;
  if (resultCode === 1) {
    localStorage.setItem('TOKEN',token)
   store.savasAcount({
    headerimg:resultInfo.headerimg,
    nick:resultInfo.nick
   })
    router.replace({ path: '/home' });
  } else {
    ElMessage.error(resultInfo);
  }
}
</script>

<style lang="scss" scoped>
.container{
    width: 100%;
    height: 100vh;
    background-color: rgb(93, 117, 199);
    position: relative;
    top: 0;
    left: 0;
    .warper{
        width: 400px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        h2{
            text-align: center;
            color: aquamarine;
        }
        .el-form{
            padding: 30px 40px;
            background-color: white;
            border-radius: 8px;
            .el-button{
                width: 100%;

            }
        }
    }
}
</style>
