<template>
  <div class="Background">
    <div class="a">
      <div class="b"></div>
      <div class="c">
        <div class="d">
          <h1>Login/Register</h1>
          <el-form
              ref="LoginFormRef"
              :model="LoginForm"
              :rules="rules"
              label-position="left"
              label-width="auto"
          >
            <el-form-item class="e"  label="用户名" prop="userUsername">
              <el-input class="e" placeholder="请输入用户名" v-model="LoginForm.userUsername"></el-input>
            </el-form-item>
            <el-form-item class="e" label="密码" prop="userPassword">
              <el-input class="e" label="密码" placeholder="请输入密码" v-model="LoginForm.userPassword" show-password type="password"></el-input>
            </el-form-item>
            <el-form-item v-if="nickNameShow" class="e" label="昵称" prop="userNickname">
              <el-input  class="e" label="昵称" placeholder="请输入昵称" v-model="LoginForm.userNickname"></el-input>
            </el-form-item>

          </el-form>
          <el-button class="f" text @click="handleChange">{{ changeButtonName }}</el-button>
          <el-button class="g" round type="primary" @click="handleSubmit">{{ handleButtonName }}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import {apiLogin, apiRegister} from '@/api'
import {ElMessage} from "element-plus";
import router from "@/router";
import {useUserStore} from "@/store";


let userStore = useUserStore()
let changeButtonName = ref('注册')
let handleButtonName = ref('登录')
let nickNameShow = ref(false)
const LoginFormRef = ref()
const LoginForm = ref({
  userUsername: '',
  userPassword: '',
  userNickname: ''
})
const rules = ref({
  userUsername: [
    {required: true, message: '请输入用户名', trigger: 'blur'},
    {min: 3, max: 20, message: '用户名长度在3-20之间', trigger: 'blur'},
  ],
  userPassword: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {min: 3, max: 20, message: '密码长度在3-20之间', trigger: 'blur'},
  ],
  userNickname: [
    {required: true, message: '请输入昵称', trigger: 'blur'},
    {min: 3, max: 20, message: '昵称长度在3-20之间', trigger: 'blur'},
  ],
})



const handleSubmit = () => {
  if(nickNameShow.value) {
    LoginFormRef.value.validate(async (valid) => {
      if (valid) {
        const res = await apiRegister(LoginForm.value)
        if (res.statusCode === 200) {
          ElMessage.success(res.message)
          userStore.$state = res.data

        } else {
          ElMessage.error(res.message)
        }
      } else {
        ElMessage.info('请正确输入注册信息')
      }
    })
  } else {
    LoginFormRef.value.validate(async (valid) => {
      if (valid) {
        const res = await apiLogin(LoginForm.value)
        if (res.statusCode === 200) {
          ElMessage.success(res.message)
          userStore.$state = res.data
          router.push('/home')
        } else {
          ElMessage.error(res.message)
        }
      } else {
        ElMessage.info('请正确输入登录信息')
      }
    })
  }
}
const handleChange = () => {
  nickNameShow.value = !nickNameShow.value;
  if (nickNameShow.value) {
    changeButtonName.value = '登录'
    handleButtonName.value = '注册'
  } else {
    changeButtonName.value = '注册'
    handleButtonName.value = '登录'
  }
}


onMounted(() => {
  localStorage.clear();
})

</script>

<style scoped>


</style>