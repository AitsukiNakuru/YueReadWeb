<template>
  <el-carousel :interval="5000" arrow="always" v-if="carouselBookList[0]!=null" class="first_screen_carousel">
    <el-carousel-item v-for="(item, index) in carouselBookList" :key="index" class="first_screen_carousel_item" >
      <el-card :body-style="{ padding: '0px' }" class="first_screen_carousel_card"  @click="handleCard(item)" >
        <el-row style="width: 1200px">
          <el-col :span="8">
            <div class="first_screen_carousel_image">
              <el-image class="first_screen_carousel_image" :src=item.bookCover fit="cover" />
            </div>
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

  <h1 style="margin-left: 50px">热销排行</h1>

  <div class="bookList" style="margin-left: 20px">
    <div v-for="(item, index) in hotSaleList" >
      <el-card :body-style="{ padding: '0px'}" v-bind:id="item.bookId" class="bookList_card" @click="handleCard(item)">
        <el-image style="height: 250px; width: 200px" :src=item.bookCover fit="cover" />
        <div style="padding: 14px">
          <span>{{ item.bookName }}</span>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import {apiBookListAll, apiCarouselBookList, apiCategoryList, apiHotSaleList} from "@/api";
import {useBookStore, useCategoryStore, useUserStore} from "@/store";
import {useRoute, useRouter} from "vue-router/dist/vue-router";
import {ElMessage} from "element-plus";

const router = useRouter()
const route = useRoute()



let bookStore = useBookStore()
let categoryStore = useCategoryStore()



let carouselBookList = ref([])


let hotSaleList = ref([])



const getCarouselBookList = async () =>{
  console.log('getCarouselBookList被调用')
  const res = await apiCarouselBookList()
  if (res.statusCode === 200) {
    carouselBookList.value = res.data
  } else {
    ElMessage.error(res.message)
  }
}
const getHotSaleList = async () =>{
  console.log('getHotSaleList被调用')
  const res = await apiHotSaleList()
  if (res.statusCode === 200) {
    hotSaleList.value = res.data
  } else {
    ElMessage.error(res.message)
  }
}
const getAllInfo = async () => {
  await getCarouselBookList()
  await getHotSaleList()
}

const handleCard = (item) => {

  bookStore.$state.selectBook = item;
  console.log(bookStore.$state.selectBook)
  router.push('/book')
}


onMounted(async () => {
  await getAllInfo()
})

</script>

<style scoped>

</style>