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
            <el-button class="line_out_button" :icon="ShoppingCart" @click="handleShowShoppingCart">购物车</el-button>
            <el-button class="line_out_button" :icon="Tickets">订单</el-button>
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

  <el-drawer v-model="showShoppingCart" direction="rtl">
    <template #header>
      <h1>购物车</h1>
    </template>
    <template #default>
      <el-table :data="filterCartItemList" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column label="书籍名称" prop="bookInfo.bookName" />
        <el-table-column label="数量" prop="bookCount"></el-table-column>
        <el-table-column align="right">
          <template #header>
            <el-input v-model="cartSearch" size="small" placeholder="Type to search" />
          </template>
          <template #default="scope">
            <el-button size="small" type="danger" @click="handleCartItemDelete(scope)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button type="primary" @click="handlePurchaseShoppingCart">结算</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup>
import {onMounted, ref, computed} from 'vue';
import { Search, ShoppingCart, Tickets } from '@element-plus/icons-vue'
import {useBookStore, useCategoryStore, useIndexConfigStore, useUserStore} from "@/store";
import {apiBookListAll, apiCartItemList, apiCategoryList, apiDeleteCartItem, apiIndexConfigList} from "@/api";
import {useRoute, useRouter} from "vue-router/dist/vue-router";
import {ElMessage} from "element-plus";


const router = useRouter()
const route = useRoute()

let userStore = useUserStore()
let bookStore = useBookStore()
let categoryStore = useCategoryStore()
let indexConfigStore = useIndexConfigStore()

let search = ref()
let categoryMenuData = ref([])
let indexCarouselData = ref([])
let cartSearch = ref()
let cartItemList = ref([])
let filterCartItemList = computed(() => {
  return cartItemList.value.filter(
      (data) =>
          ((!cartSearch.value || data.bookInfo.bookName.toLowerCase().match(cartSearch.value.toLowerCase()))) ||
          ((!cartSearch.value || data.bookInfo.bookAuthor.toLowerCase().match(cartSearch.value.toLowerCase()))) ||
          ((!cartSearch.value || data.bookInfo.publisher.toLowerCase().match(cartSearch.value.toLowerCase()))) ||
          ((!cartSearch.value || data.bookInfo.bookIntro.toLowerCase().match(cartSearch.value.toLowerCase()))) ||
          ((!cartSearch.value || data.bookInfo.bookIsbn.toLowerCase().match(cartSearch.value.toLowerCase())))
  )
})

let showShoppingCart = ref(false)

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
const getCartItemList = async () =>{
  console.log('getCartItemList被调用')
  const res = await apiCartItemList({userId: userStore.$state.userId})
  if (res.statusCode === 200) {
    cartItemList.value = res.data
  } else {
    ElMessage.error(res.message)
  }
}
const deleteCartItem = async (data) => {
  console.log('deleteCartItem被调用')
  const res = await apiDeleteCartItem(data)
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
  await getCartItemList()
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
  await generateCategoryMenu()
  await generateIndexCarousel()
})



const selectMenu = (item) => {
  bookStore.$state.selectCategory = categoryMenuData.value[item].data
  router.push('/category')
}

const clickMenu = (item) => {

}

const handleShowShoppingCart = () => {
  getCartItemList()
  console.log(cartItemList.value)
  showShoppingCart.value = true
}
const handlePurchaseShoppingCart = () => {
  
}

const handleCartItemDelete = async (scope) => {
  await deleteCartItem({cartItemId: scope.row.cartItemBookId})
  await getCartItemList()

}

const handleSelectionChange = (selection) => {
  console.log(selection)
}

const TestButton = () => {

}
</script>

<style scoped>

</style>