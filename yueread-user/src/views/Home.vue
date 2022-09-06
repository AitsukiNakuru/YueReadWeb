<template>
<!--  顶部工具栏-->
  <el-row class="tools">
    <el-col :span="24" style="display: flex">
      <div class="tool_welcome">欢迎光临悦读</div>
      <el-link class="tool_user" @click="handleUserDetail">{{ userStore.$state.userNickname }}</el-link>
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
        <el-button-group>
          <el-button class="line_out_button" :icon="ShoppingCart" @click="handleShowShoppingCart">购物车</el-button>
          <el-button class="line_out_button" :icon="ShoppingCart" @click="handleShowOrderList">订单列表</el-button>
        </el-button-group>
      </el-col>
  </el-row>

<!--  左侧分类+右侧router-view-->
  <el-row class="first_screen">
    <el-col :span="4">
      <h1>书籍分类</h1>
      <el-menu
          class="first_screen_menu"
          @select="selectMenu"

      >
        <div v-for="(item, index) in categoryMenuData" :key="index" >
          <el-menu-item :index="item.index" >
            <span>{{item.data.categoryName}}</span>
          </el-menu-item>
        </div>
      </el-menu>
    </el-col>

    <el-col :span="20">
      <router-view></router-view>
    </el-col>

  </el-row>

<!--  购物车-->
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

  <el-drawer v-model="showOrderList" direction="rtl">
    <template #header>
      <h1>订单列表</h1>
    </template>
    <template #default>
      <el-table :data="filterUserOrderList" style="width: 100%" @selection-change="handleSelectionChange" :border="parentBorder">
        <el-table-column class="infinite-list" type="expand">
          <template #default="props">
            <el-table :border="childBorder" :data="props.row.bookList">
              <el-table-column label="书名" prop="bookInfo.bookName"/>
              <el-table-column label="数量" prop="bookCount"/>
              <el-table-column label="购买价格" prop="sellingPrice"/>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column label="订单号" prop="orderId"/>
        <el-table-column label="订单金额" prop="totalPrice"/>
        <el-table-column label="订单状态" prop="orderStatus"/>
        <el-table-column align="right">
          <template #header>
            <el-input v-model="cartSearch" size="small" placeholder="Type to search" />
          </template>
          <template #default="scope">
            <el-button size="small" type="danger" @click="handleOrderRefund(scope.row)">退款</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

  </el-drawer>
<!--  用户详情-->
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
import { Search, ShoppingCart, Tickets } from '@element-plus/icons-vue'
import {useBookStore, useCategoryStore, useUserStore} from "@/store";
import {
  apiBookListAll,
  apiBookListByCategory,
  apiCartItemList,
  apiCategoryList,
  apiDeleteCartItem, apiOrderRefund, apiPurchaseList, apiUpdate, apiUserOrderList,
} from "@/api";
import {useRoute, useRouter} from "vue-router/dist/vue-router";
import {ElMessage} from "element-plus";
const router = useRouter()
const route = useRoute()


//Pinia
let userStore = useUserStore()
let categoryStore = useCategoryStore()
let bookStore = useBookStore()


//分类菜单数据
let categoryMenuData = ref([])


//购物车数据
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
let selectionBookList = ref()


//订单列表
const parentBorder = ref(false)
const childBorder = ref(false)
let orderSearch = ref()
let orderList = ref([])
let showOrderList = ref(false)
let filterUserOrderList = computed(() => {
  return orderList.value
})


//用户详情
let dialogVisible = ref(false)
const updateFormRef = ref()
const updateFrom = ref({
  userId: userStore.$state.userId,
  userUsername: '',
  userPassword: '',
  userNickname: ''
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
})

//向后台获取数据
const getCategoryList = async () => {
  console.log('getCategoryList被调用')
  const res = await apiCategoryList()
  if (res.statusCode === 200) {
    categoryStore.$state.categoryList = res.data
  } else {
    ElMessage.error(res.message)
  }
}
const getBookListAll = async () => {
  console.log('getBookListAll被调用')
  const res = await apiBookListAll()
  if (res.statusCode === 200) {
    bookStore.$state.bookList = res.data
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
const getBookListByCategory = async () => {
  console.log('getBookListByCategory被调用')
  const res = await apiBookListByCategory()
  if (res.statusCode === 200) {
    bookStore.$state.bookListByCategory = res.data

  }
}
const getUserOrderList = async () => {
  console.log('getUserOrderList')
  const res = await apiUserOrderList({
    userId: userStore.$state.userId
  })
  if (res.statusCode === 200) {
    orderList.value = res.data
  }
}
const purchaseList = async (data) => {
  console.log('purchaseList被调用')
  const res = await apiPurchaseList(data)
  if (res.statusCode === 200) {
    ElMessage.success(res.message)
  } else {
    ElMessage.error(res.message)
  }
}
const orderRefund = async (data) => {
  console.log('orderRefund被调用')
  const res = await apiOrderRefund(data)
  if (res.statusCode === 200) {
    ElMessage.success(res.message)
    await getUserOrderList()
  } else {
    ElMessage.error(res.message)
  }
}

const getAllInfo = async () => {
  await getCategoryList()
  await getCartItemList()
  await getBookListAll()
  await getBookListByCategory()
  await getUserOrderList()
}
const generateCategoryMenu = async () => {
  await getCategoryList()
  categoryMenuData.value = []
  categoryStore.$state.categoryList.forEach((value,index,array) => {
    categoryMenuData.value.push({
      index: '' + index,
      data: value,
      path: '/category'
    })
  })
}






//事件方法
const selectMenu = (item) => {
  categoryStore.$state.selectCategory = categoryMenuData.value[item].data
  router.push('/category')
}
const handleShowShoppingCart = async () => {
  await getCartItemList()

  showShoppingCart.value = true
}
const handleShowOrderList = async () => {
  await getUserOrderList()
  showOrderList.value = true
}
const handlePurchaseShoppingCart = async () => {
  await purchaseList(selectionBookList)
  await getCartItemList()

}
const handleCartItemDelete = async (scope) => {
  await deleteCartItem({cartItemId: scope.row.cartItemId})
  await getCartItemList()

}
const handleSelectionChange = (selection) => {
  selectionBookList = []
  console.log(selection)
  selection.forEach((value) => {
    selectionBookList.push({
      cartItemId: value.cartItemId,
      bookId: value.bookInfo.bookId,
      bookCount: value.bookCount,
      userId: value.userId,
      price: value.bookInfo.originalPrice

    })
  })
}
const handleUserDetail = () => {
  updateFrom.value = JSON.parse(JSON.stringify(userStore.$state))
  dialogVisible.value = true;
}
const handleUpdateCancel = () => {
  dialogVisible.value = false;
}
const handleUpdateConfirm = () => {
  updateFormRef.value.validate(async (valid) => {
    if (valid) {
      const res = await apiUpdate(updateFrom.value)
      if (res.statusCode === 200) {
        ElMessage.success(res.message)
        dialogVisible.value = false
        userStore.$state = updateFrom.value
      } else {
        ElMessage.error(res.message)
      }
    } else {
      ElMessage.info('请正确输入用户信息')
    }
  })
}
const handleOrderRefund = (row) => {
  if (row.orderStatus === 2) {
    ElMessage.error('订单已经退款')
  }
  else {
    orderRefund({
      userId: userStore.$state.userId,
      orderId: row.orderId,
      totalPrice: row.totalPrice
    })
  }

}



onMounted(async () => {
  await getAllInfo()
  await generateCategoryMenu()

})
const TestButton = () => {

}
</script>

<style scoped>

</style>