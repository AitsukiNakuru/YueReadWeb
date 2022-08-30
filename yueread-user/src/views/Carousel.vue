<template>
  <el-carousel :interval="5000" arrow="always" v-if="indexCarouselData[0]!=null" class="first_screen_carousel">
    <el-carousel-item v-for="(item, index) in indexCarouselData" :key="index" class="first_screen_carousel_item">
      <el-card :body-style="{ padding: '0px' }" class="first_screen_carousel_card">
        <el-row style="width: 1200px">
          <el-col :span="8">
            <div class="first_screen_carousel_image"></div>
          </el-col>
          <el-col :span="16">
            <div class="first_screen_carousel_info">
              <h1 >书籍名称：{{ item.bookName }}</h1>
              <h1 >书籍作者：{{ item.bookAuthor }}</h1>
              <h1 >分类：{{ item.bookCategoryName }}</h1>
              <h1 >价格：{{ item.originalPrice }}</h1>
              <h1 >出版社：{{ item.publisher }}</h1>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </el-carousel-item>
  </el-carousel>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import {apiBookListAll, apiCategoryList, apiIndexConfigList} from "@/api";
import {useBookStore, useCategoryStore, useIndexConfigStore, useUserStore} from "@/store";
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


const generateIndexCarousel = async () => {
  await getIndexConfigList()
  indexConfigStore.$state.list.forEach((item) =>{
    let temp = bookStore.$state.list.filter((data) => (data.bookId === item.bookId))
    indexCarouselData.value.push(temp[0])
  })

}

onMounted(async () => {
  await getBookList()

  await generateIndexCarousel()
})

</script>

<style scoped>

</style>