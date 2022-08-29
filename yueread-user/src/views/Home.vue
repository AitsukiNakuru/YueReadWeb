<template>
<!--  顶部工具栏-->
  <el-row class="tools">
    <el-col :span="24" style="display: flex">
      <div class="tool_welcome">欢迎光临悦读</div>
      <el-link class="tool_user">{{ userStore.$state.userNickname }}</el-link>
    </el-col>
  </el-row>

<!--  顶部标题-->
  <el-row class="line_out" >

      <el-col :span="4">
        <div class="line_out_title">悦读</div>

      </el-col>

      <el-col :span="16">

      </el-col>

      <el-col :span="4">
        <div>
          <el-button-group>
            <el-button class="line_out_button"  :icon="ShoppingCart">购物车</el-button>
            <el-button class="line_out_button"  :icon="Tickets">订单</el-button>
            <el-button @click="TestButton">TestButton</el-button>

          </el-button-group>
        </div>
      </el-col>
  </el-row>

<!--  轮播图-->
  <el-row class="first_screen">
    <el-col :span="4">
      <el-menu
          class="first_screen_menu"
          @select="selectMenu"

      >
        <div v-for="(item, index) in categoryMenuData" :key="index" >
          <el-menu-item :index="item.index" @click="clickMenu" >
            <span>{{item.data.categoryName}}</span>
          </el-menu-item>
        </div>
      </el-menu>
    </el-col>

    <el-col :span="20">
      <router-view></router-view>
    </el-col>

  </el-row>

</template>

<script setup>
import {onMounted, ref} from 'vue';
import { Search, ShoppingCart, Tickets } from '@element-plus/icons-vue'
import {useBookStore, useCategoryStore, useIndexConfigStore, useUserStore} from "@/store";
import {apiBookListAll, apiCategoryList, apiIndexConfigList} from "@/api";
import {useRoute, useRouter} from "vue-router/dist/vue-router";

const router = useRouter()
const route = useRoute()

let userStore = useUserStore()
let bookStore = useBookStore()
let categoryStore = useCategoryStore()
let indexConfigStore = useIndexConfigStore()

let search = ref()
let categoryMenuData = ref([])
let indexCarouselData = ref([])


const getBookList = async () => {
  console.log('getBookList被调用')
  const res = await apiBookListAll()
  if (res.statusCode === 200) {
    bookStore.$state.list = res.data

  } else {
    ElMessage.error(res.message)
  }
}
const getCategoryList = async () => {
  console.log('getCategoryList被调用')
  const res = await apiCategoryList()
  if (res.statusCode === 200) {
    categoryStore.$state.list = res.data

  } else {
    ElMessage.error(res.message)
  }
}
const getIndexConfigList = async () =>{
  console.log('getIndexConfigList被调用')
  const res = await apiIndexConfigList()
  if (res.statusCode === 200) {
    indexConfigStore.$state.list = res.data
  } else {
    ElMessage.error(res.message)
  }
}
const getAllInfo = async () => {
  await getBookList()
  await getCategoryList()
  await getIndexConfigList()
}

const generateCategoryMenu = async () => {
  await getCategoryList()
  categoryMenuData.value = []
  categoryStore.$state.list.forEach((value,index,array) => {
    categoryMenuData.value.push({
      index: '' + index,
      data: value,
      path: '/category'
    })
  })
  console.log(categoryMenuData.value)
}
const generateIndexCarousel = async () => {
  await getIndexConfigList()
  indexConfigStore.$state.list.forEach((item) =>{
    let temp = bookStore.$state.list.filter((data) => (data.bookId === item.bookId))

    indexCarouselData.value.push(temp[0])
  })
  console.log(indexCarouselData.value)
}

onMounted(async () => {
  await getBookList()
  await generateCategoryMenu()
  await generateIndexCarousel()
})



const selectMenu = (item) => {
  console.log(categoryMenuData.value[item])
  bookStore.$state.selectCategory = categoryMenuData.value[item].data
  router.push('/category')
}

const clickMenu = (item) => {

}

const TestButton = () => {
  generateCategoryMenu()
  generateIndexCarousel()
}
</script>

<style scoped>

</style>