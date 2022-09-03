<template>
  <div class="LoginBoard">
    <p class="LoginTitle">YueRead后台管理系统</p>
    <el-form
        ref="LoginFormRef"
        :model="LoginForm"
        :rules="rules"
        class="LoginForm"
        label-position="left"
        label-width="auto"
    >

      <el-form-item class="LoginItem" label="用户名" prop="adminUsername">
        <el-input v-model="LoginForm.adminUsername" class="LoginInput" placeholder="请输入用户名"
                  prefix-icon="User"></el-input>
      </el-form-item>

      <el-form-item class="LoginItem" label="密码" prop="adminPassword">
        <el-input v-model="LoginForm.adminPassword" class="LoginInput" placeholder="请输入密码" prefix-icon="Lock" show-password
                  type="password"></el-input>
      </el-form-item>

      <el-button class="LoginButton" type="primary" @click="handleLogin">登录</el-button>
    </el-form>

  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import {apiLogin} from '@/api'
import {ElMessage} from "element-plus";
import {useAdminStore} from "@/store";
import router from "@/router";

const adminStore = useAdminStore()
const formSize = ref('default')
const LoginFormRef = ref()
const LoginForm = ref({
  adminUsername: '',
  adminPassword: ''
})
const rules = ref({
  adminUsername: [
    {required: true, message: '请输入用户名', trigger: 'blur'},
    {min: 3, max: 20, message: '用户名长度在3-20之间', trigger: 'blur'},
  ],
  adminPassword: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {min: 3, max: 20, message: '密码长度在3-20之间', trigger: 'blur'},
  ],

})


const handleLogin = () => {
  LoginFormRef.value.validate(async (valid) => {
    if (valid) {
      const res = await apiLogin(LoginForm.value)
      if (res.statusCode === 200) {
        ElMessage.success(res.message)
        adminStore.$state = res.data
        router.push('/home')
      } else {
        ElMessage.error(res.message)
      }
    } else {
      ElMessage.info('请正确输入登陆信息')
    }
  })
}

onMounted(() => {
  localStorage.clear();
})


</script>

<style scoped>


</style>