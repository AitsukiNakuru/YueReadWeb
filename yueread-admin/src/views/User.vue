<template>
  <el-table
      ref="tableRef"
      :data="filterTableData.slice((currentPage-1)*PageSize,currentPage*PageSize)"
      style="width: 100%"
      @row-click="rowClick"
  >

    <el-table-column label="用户名"
        prop="userUsername"
        width="200"
    >
      <template #header>
        <slot>用户名</slot>
        <el-input v-model="searchUsername" placeholder="" size="small"
                  style="margin-left: 5px; width: 100px"></el-input>
      </template>
    </el-table-column>

    <el-table-column label="密码"
        prop="userPassword"
        width="200"
    >
      <template #header>
        <slot>用户名</slot>
      </template>
    </el-table-column>

    <el-table-column label="昵称"
                     prop="userNickname"
                     width="200"
    >
      <template #header>
        <slot>昵称</slot>
        <el-input v-model="searchNickname" placeholder="" size="small"
                  style="margin-left: 5px; width: 100px"></el-input>
      </template>
    </el-table-column>

    <el-table-column label="购买金额"
        prop="userPurchase" sortable
        width="160"
    >

    </el-table-column>

  </el-table>

  <el-pagination
      :currentPage="currentPage"
      :total="totalCount"
      :page-size="PageSize"
      :page-sizes="[5, 10, 15, 20]"
      class="BookPage"
      layout="prev, pager, next, jumper"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
  />

  <el-dialog
      v-model="dialogVisible"
      title="修改用户信息"
  >
    <el-form :model="updateFrom" ref="updateFormRef" :rules="rules">
      <el-form-item label="用户名" prop="userUsername">
        <el-input v-model="updateFrom.userUsername"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="userPassword">
        <el-input v-model="updateFrom.userPassword"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="userNickname">
        <el-input v-model="updateFrom.userNickname"></el-input>
      </el-form-item>
      <el-form-item label="购买金额" prop="userVip">
        <el-input-number v-model="updateFrom.userVip"></el-input-number>
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
import {onMounted, ref, computed} from 'vue';
import {apiBookListAll, apiUpdate, apiUserList, apiUserUpdate} from "@/api";
import {ElMessage} from "element-plus";

//表格数据
const tableRef = ref()
let currentPage = ref(1)
const PageSize = ref(15)
let userList = ref([])
let filterTableData = computed(() => {
  return userList.value.filter(
      (data) => (
          (!searchUsername.value || data.userUsername.toLowerCase().match(searchUsername.value.toLowerCase())) &&
          (!searchNickname.value || data.userNickname.toLowerCase().match(searchNickname.value.toLowerCase()))
      )
  )
})
let totalCount = computed(() => {
  return filterTableData.value.length
})


const searchUsername = ref()
const searchNickname = ref()

const updateFormRef = ref()
let dialogVisible = ref(false)
const updateFrom = ref({

})
const rules = ref({
  userUsername: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度在3-20之间', trigger: 'blur' },
  ],
  userPassword: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 3, max: 20, message: '密码长度在3-20之间', trigger: 'blur' },
  ],
  userNickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { min: 3, max: 20, message: '昵称长度在3-20之间', trigger: 'blur' },
  ],
  userVip: [
    { required: true, message: '请输入购买金额', trigger: 'blur' },
    { pattern: /^(\-|\+)?\d+(\.\d+)?$/, message: '请输入数字', trigger: 'blur'}
  ],
})

const getUserList = async () => {
  console.log('getUserList被调用')
  const res = await apiUserList()
  if (res.statusCode === 200) {
    userList.value = res.data
    console.log(userList.value)
  } else {
    ElMessage.error(res.message)
  }
}



const handleCurrentChange = (val) => {
  currentPage.value = val
}
const handleSizeChange = (val) => {
  // 改变每页显示的条数
  PageSize.value=val
  // 注意：在改变每页显示的条数时，要将页码显示到第一页
  currentPage.value=1
}
const rowClick = (row) => {
  updateFrom.value = row
  console.log(updateFrom.value)
  dialogVisible.value = true
}
const handleUpdateCancel = () => {
  dialogVisible.value = false;
}
const handleUpdateConfirm = () => {
  console.log("update")
  updateFormRef.value.validate(async (valid) => {
    if (valid) {
      const res = await apiUserUpdate(updateFrom.value)
      if (res.statusCode === 200) {
        ElMessage.success(res.message)
        await getUserList()
        dialogVisible.value = false
      } else {
        ElMessage.error(res.message)
      }
    } else {
      ElMessage.info('请正确输入用户信息')
    }
  })
}

onMounted(() => {
  getUserList()
})

</script>

<style scoped>

</style>