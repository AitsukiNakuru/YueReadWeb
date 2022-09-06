<template>
  <div>
    <div style="display: flex;" >
      <h1>{{ selectCategory.categoryName }}</h1>
      <el-button @click="TestButton">TestButton</el-button>
      <div>
        <el-input
            v-model="search"
            placeholder="请输入搜索条件"
            class="line_out_search"
        >
          <template #append>
            <el-button :icon="Search" />
          </template>
        </el-input>
      </div>
    </div>
    <div class="bookList">
      <div v-for="(item, index) in filterBookList" >
        <el-card :body-style="{ padding: '0px'}" v-bind:id="item.bookId" class="bookList_card" @click="handleCard">
          <img
              src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
              v-bind:id="item.bookId"
              class="image"
          />
          <div style="padding: 14px">
            <span>{{ item.bookName }}</span>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, computed} from 'vue';
import {useBookStore, useCategoryStore, useUserStore} from "@/store";
import {apiBookListAll, apiBookListByCategory, apiCategoryList} from "@/api";
import { Search, ShoppingCart, Tickets } from '@element-plus/icons-vue'
import {useRoute, useRouter} from "vue-router/dist/vue-router";

const router = useRouter()
const route = useRoute()

//Pinia
let bookStore = useBookStore()
let categoryStore = useCategoryStore()


let search = ref()
let selectBook = ref()


let selectCategory = computed(() => {
  return categoryStore.$state.selectCategory
})

let bookListData = computed(() => {
  return bookStore.$state.bookListByCategory.filter(data =>
      (data.categoryId === categoryStore.$state.selectCategory.categoryId))[0].bookList
})
let filterBookList = computed(() => {
  return bookListData.value.filter((data) => (
          (!search.value || data.bookAuthor.toLowerCase().match(search.value.toLowerCase())) ||
          (!search.value || data.bookName.toLowerCase().match(search.value.toLowerCase())) ||
          (!search.value || data.bookCategoryName.toLowerCase().match(search.value.toLowerCase())) ||
          (!search.value || data.publisher.toLowerCase().match(search.value.toLowerCase()))
  ))
})


const getBookListByCategory = async () => {
  console.log('getBookListByCategory被调用')
  const res = await apiBookListByCategory()
  if (res.statusCode === 200) {
    bookStore.$state.bookListByCategory = res.data

  }
}


const getAllInfo = async () => {

  await getBookListByCategory()

}

onMounted(async () => {
  await getAllInfo()
})



const handleCard = (item) => {
  bookStore.$state.selectBook = bookStore.$state.bookList.filter((data) => data.bookId == item.target.id)[0]

  router.push('/book')
}

const TestButton = () => {
  console.log(bookListData.value)
}
</script>

<style scoped>

</style>