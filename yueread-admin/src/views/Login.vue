<template>
  <div class="LoginBoard">
    <p class="LoginTitle">YueRead后台管理系统</p>
    <el-form
        class="LoginForm"
        label-width="auto"
        label-position="left"
        ref="LoginFormRef"
        :model="LoginForm"
        :rules="rules"
    >

      <el-form-item label="用户名" class="LoginItem" prop="adminUsername">
        <el-input v-model="LoginForm.adminUsername" placeholder="请输入用户名" class="LoginInput"></el-input>
      </el-form-item>

      <el-form-item label="密码" class="LoginItem" prop="adminPassword">
        <el-input v-model="LoginForm.adminPassword" placeholder="请输入密码" show-password type="password" class="LoginInput"></el-input>
      </el-form-item>

      <el-button type="primary" class="LoginButton" @click="handleLogin">登录</el-button>
    </el-form>

  </div>
</template>

<script  setup>
import {ref} from 'vue';
import {login} from '@/api/Login'
import {ElMessage} from "element-plus";
import adminStore from "@/store/admin";

const admin = adminStore()
const formSize = ref('default')
const LoginFormRef = ref()
const LoginForm = ref({
  adminUsername: '',
  adminPassword: ''
})
const rules = ref({
  adminUsername: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度在3-20之间', trigger: 'blur' },
  ],
  adminPassword: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 3, max: 20, message: '密码长度在3-20之间', trigger: 'blur' },
  ],

})


const handleLogin = () => {
  LoginFormRef.value.validate(async (valid) => {
      if (valid) {
        const res = await login(LoginForm.value)
          if (res.statusCode === 200) {
            ElMessage.success(res.message)
            admin.$state = res.data
            
          } else {
            ElMessage.error(res.message)
          }
      } else {
        ElMessage.info('请正确输入登陆信息')
      }
  })
}



</script>

<style scoped>



</style>