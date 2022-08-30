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
      <div v-for="(item, index) in bookList" >
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
import {useBookStore, useCategoryStore, useIndexConfigStore, useUserStore} from "@/store";
import {apiBookListAll, apiCategoryList, apiIndexConfigList} from "@/api";
import { Search, ShoppingCart, Tickets } from '@element-plus/icons-vue'
import {useRoute, useRouter} from "vue-router/dist/vue-router";

const router = useRouter()
const route = useRoute()

let userStore = useUserStore()
let bookStore = useBookStore()
let categoryStore = useCategoryStore()
let indexConfigStore = useIndexConfigStore()
let search = ref()
let selectBook = ref()

let indexCarouselData = ref([])
let selectCategory = computed(() => {
  return bookStore.$state.selectCategory
})
let bookList2 = computed(() => {
  return  bookStore.$state.list.filter((data) => (data.bookCategoryId === selectCategory.value.categoryId))

})
let bookList = computed(() => {
  return bookList2.value.filter(
      (data) =>
          ((!search.value || data.bookName.toLowerCase().match(search.value.toLowerCase()))) ||
          ((!search.value || data.bookAuthor.toLowerCase().match(search.value.toLowerCase()))) ||
          ((!search.value || data.publisher.toLowerCase().match(search.value.toLowerCase()))) ||
          ((!search.value || data.bookIntro.toLowerCase().match(search.value.toLowerCase()))) ||
          ((!search.value || data.bookIsbn.toLowerCase().match(search.value.toLowerCase())))
  )
})


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

onMounted(async () => {
  await getAllInfo()
})


const handleCard = (item) => {
  selectBook.value = bookStore.$state.list.filter((data) => data.bookId == item.target.id)[0]
  bookStore.$state.selectBook = selectBook.value
  router.push('/book')
}

const TestButton = () => {
  console.log(selectBook)
}
</script>

<style scoped>

</style>