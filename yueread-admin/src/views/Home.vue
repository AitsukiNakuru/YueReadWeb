<template>
  <div class="Layout">
    <el-container>

      <el-header class="HomeHeader">
        <p class="HomeTitle">YueRead后台管理系统</p>
        <el-popover
            :width="200"
            class="HomePopover"
            content="this is content, this is content, this is content"
            placement="bottom"
            trigger="hover"
        >
          <template #reference>
            <div class="adminUser">
              <el-icon>
                <Avatar></Avatar>
              </el-icon>
              <label style="margin-left: 10px;">{{ adminStore.$state.adminNickname }}</label>
            </div>
          </template>

          <p>用户名：{{adminStore.$state.adminUsername}}</p>
          <el-button @click="handleUpdateAdmin">修改管理员信息</el-button>
        </el-popover>
      </el-header>


      <el-container>


        <el-aside class="HomeAside">

          <el-menu
              :default-active="activeMenu"
              class="HomeAsideMenu"
              :router="true"
              @select="selectMenu"
          >
            <div v-for="(item, index) in menu" :key="index">
              <el-menu-item :index="item.index" :route="item.path">
                <el-icon><component :is="item.icon"></component></el-icon>
                <span>{{item.title}}</span>
              </el-menu-item>
            </div>
          </el-menu>
        </el-aside>


        <el-main class="HomeMain">
          <router-view></router-view>
        </el-main>


      </el-container>


    </el-container>
  </div>
  <el-dialog
      v-model="dialogVisible"
      title="修改管理员信息"
  >
    <el-form :model="updateFrom" ref="updateFormRef" :rules="rules">
      <el-form-item label="用户名" prop="adminUsername">
        <el-input v-model="updateFrom.adminUsername"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="adminPassword">
        <el-input v-model="updateFrom.adminPassword"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="adminNickname">
        <el-input v-model="updateFrom.adminNickname"></el-input>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleUpdateCancel">取消</el-button>
        <el-button type="primary" @click="handleUpdateConfirm">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import {onMounted, ref, shallowRef} from 'vue';
import {useAdminStore, useHomeParams} from '@/store'
import {ElMessage} from "element-plus";
import {apiLogin, apiUpdate} from "@/api";
import router from "@/router";



const adminStore = useAdminStore()
const homeParams = useHomeParams()
let activeMenu = ref()
let dialogVisible = ref()
const updateFormRef = ref()
const updateFrom = ref({
  adminId: adminStore.$state.adminId,
  adminUsername: '',
  adminPassword: '',
  adminNickname: ''
})
const menu = ref([
  {
    index: '1',
    title: '书籍管理',
    icon: 'Reading',
    path: '/book'
  },
  {
    index: '2',
    title: '分类管理',
    icon: 'CollectionTag',
    path: '/category'
  },
  {
    index: '3',
    title: '订单管理',
    icon: 'List',
    path: '/order'
  },
  {
    index: '4',
    title: '用户管理',
    icon: 'User',
    path: '/user'
  }
])
const rules = ref({
  adminUsername: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度在3-20之间', trigger: 'blur' },
  ],
  adminPassword: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 3, max: 20, message: '密码长度在3-20之间', trigger: 'blur' },
  ],
  adminNickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { min: 3, max: 20, message: '昵称长度在3-20之间', trigger: 'blur' },
  ],
})






const selectMenu = (index, path) => {
  localStorage.setItem("activeMenu", JSON.stringify(index))
}
const handleUpdateAdmin = () => {
  console.log(JSON.parse(JSON.stringify(adminStore.$state)))
  updateFrom.value = JSON.parse(JSON.stringify(adminStore.$state))
  dialogVisible.value = true;
}
const handleUpdateCancel = () => {
  dialogVisible.value = false;
}
const handleUpdateConfirm = () => {
  console.log("update")
  updateFormRef.value.validate(async (valid) => {
    if (valid) {
      console.log("update")
      const res = await apiUpdate(updateFrom.value)
      if (res.statusCode === 200) {
        ElMessage.success(res.message)
        dialogVisible.value = false
        adminStore.$state = updateFrom.value
      } else {
        ElMessage.error(res.message)
      }
    } else {
      ElMessage.info('请正确输入用户信息')
    }
  })
}


onMounted(() => {
  activeMenu.value = JSON.parse(localStorage.getItem("activeMenu"))
})

</script>

<style scoped>
</style>