<template>
  <el-card class="book_card">
    <template #header>
      <div class="book_card_header">
        <h1>{{ selectBook.bookName }}</h1>
      </div>
      <el-button @click="TestButton">TestButton</el-button>
    </template>
    <el-row class="book_card_content">
      <el-col :span="6" style="padding: 10px;">
        <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="book_card_content_image"
        />
        <p>书籍简介：</p>
        <p style="text-indent: 1cm">{{selectBook.bookIntro}}</p>
      </el-col>

      <el-col :span="18" style="padding: 10px">
        <el-row class="">
          <el-col class="" :span="4">图书售价</el-col>
          <el-col class="" :span="20">{{selectBook.originalPrice}}</el-col>
        </el-row>

        <el-row class="">
          <el-col class="" :span="4">作者</el-col>
          <el-col class="" :span="20">{{selectBook.bookAuthor}}</el-col>
        </el-row>

        <el-row class="">
          <el-col class="" :span="4">分类</el-col>
          <el-col class="" :span="20">{{selectBook.bookCategoryName}}</el-col>
        </el-row>

        <el-row class="">
          <el-col class="" :span="4">ISBN</el-col>
          <el-col class="" :span="20">{{selectBook.bookIsbn}}</el-col>
        </el-row>

        <el-row class="">
          <el-col class="" :span="4">出版社</el-col>
          <el-col class="" :span="20">{{selectBook.publisher}}</el-col>
        </el-row>

        <el-row class="">
          <el-col class="" :span="4">出版日期</el-col>
          <el-col class="" :span="20">{{selectBook.publishDate}}</el-col>
        </el-row>

        <el-row class="">
          <el-col class="" :span="4">详细信息</el-col>
          <el-col class="" :span="20">{{selectBook.detailContent}}</el-col>
        </el-row>

        <el-input-number v-model="bookCount" class="mx-4" />
        <el-button @click="handlePurchase">立即购买</el-button>
        <el-button @click="handleAddCartItem">加入购物车</el-button>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup>
import {ref, onMounted, computed} from 'vue';
import {useBookStore, useCategoryStore, useIndexConfigStore, useUserStore} from "@/store";
import {apiAddCartItem, apiBookListAll, apiCategoryList, apiIndexConfigList, apiUpdateCartItem} from "@/api";
import { Search, ShoppingCart, Tickets } from '@element-plus/icons-vue'
import {useRoute, useRouter} from "vue-router/dist/vue-router";
import {ElMessage} from "element-plus";

const router = useRouter()
const route = useRoute()

let userStore = useUserStore()
let bookStore = useBookStore()
let categoryStore = useCategoryStore()
let indexConfigStore = useIndexConfigStore()

let selectBook = ref(bookStore.$state.selectBook)
let bookCount = ref(1)

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
const addCartItem = async (data) =>{
  console.log('addCartItem被调用')
  const res = await apiAddCartItem(data)
  if (res.statusCode === 200) {
    ElMessage.success(res.message)
  } else {
    ElMessage.error(res.message)
  }
}

const getAllInfo = async () => {
  await getBookList()
  await getCategoryList()
  await getIndexConfigList()
}

onMounted(async () => {
  await getAllInfo()
  selectBook.value.publishDate = timeFormatter(selectBook.value.publishDate)
  console.log(selectBook)
})


const handleAddCartItem = () => {
  addCartItem({
    userId: userStore.$state.userId,
    bookId: selectBook.value.bookId,
    bookCount: bookCount.value
  })
}
const handlePurchase = () => {

}



const timeFormatter = (cellValue) => {
  let date = new Date(cellValue);
  let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
  let currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  let hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  let mm = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  return date.getFullYear() + "-" + month + "-" + currentDate
}

const TestButton = () => {
  console.log(bookCount.value)
}
</script>

<style scoped>

</style>