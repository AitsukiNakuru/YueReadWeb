<template>
  <div class="Layout">
    <el-container>

      <el-header class="HomeHeader">
        <p class="HomeTitle">YueRead后台管理系统</p>
        <el-popover
            :width="200"
            class="HomePopover"
            content="this is content, this is content, this is content"
            placement="top-start"
            title="Title"
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
        </el-popover>
      </el-header>


      <el-container>


        <el-aside class="HomeAside">

          <el-menu
              default-active="1"
              class="HomeAsideMenu"
              :router="true"
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
</template>

<script setup>
import {ref, shallowRef} from 'vue';
import {useAdminStore} from '@/store'
import {ElMessage} from "element-plus";

const menuActive = localStorage.getItem('menuActive');

const adminStore = useAdminStore()


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



</script>

<style scoped>
</style>