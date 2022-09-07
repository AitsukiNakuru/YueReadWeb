<template>
  <el-table
      ref="tableRef"
      :data="filterTableData.slice((currentPage-1)*PageSize,currentPage*PageSize)"
      style="width: 100%; height: 85%"
      @row-click="rowClick"
  >
<!--书名-->
    <el-table-column
        label="书名"
        prop="bookName"
        width="200"
    >
      <template #header>
        <slot>书名</slot>
        <el-input v-model="searchBookName" placeholder="请输入书名" size="small"
                  style="margin-left: 5px; width: 140px"></el-input>
      </template>
    </el-table-column>
<!--作者-->
    <el-table-column align="left"
                     label="作者"
                     prop="bookAuthor"
                     width="160"
    >

      <template #header>
        <slot>作者</slot>
        <el-input v-model="searchAuthor" placeholder="请输入作者" size="small"
                  style="margin-left: 5px;width: 100px;"></el-input>
      </template>
    </el-table-column>
<!--封面-->
<!--    <el-table-column-->
<!--        label="封面"-->
<!--        prop="bookCover"-->
<!--        width="200"-->
<!--    >-->
<!--      <el-image style="width: 100px; height: 100px" :src="bookCover" fit="cover" />-->
<!--    </el-table-column>-->
<!--分类-->
    <el-table-column
        label="分类"
        prop="bookCategoryName" width="160"
    >
      <template #header>
        <slot>分类</slot>
        <el-input v-model="searchCategory" placeholder="请输入分类" size="small"
                  style="margin-left: 5px;width: 80px;"></el-input>
      </template>
    </el-table-column>
<!--价格-->
    <el-table-column
        label="价格"
        prop="originalPrice" sortable
        width="160"
    >

    </el-table-column>
<!--出版社-->
    <el-table-column
        label="出版社"
        prop="publisher"
        width="200"
    >
      <template #header>
        <slot>出版社</slot>
        <el-input v-model="searchPublisher" placeholder="请输入出版社" size="small"
                  style="margin-left: 5px;width: 120px;"></el-input>
      </template>
    </el-table-column>
<!--出版日期-->
    <el-table-column
        :formatter="timeFormatter"
        label="出版日期"
        prop="publishDate"
        sortable
        width="120"
    />
<!--库存-->
    <el-table-column
        label="库存"
        prop="bookStock" sortable
        width="100"
    >

    </el-table-column>
<!--销量-->
    <el-table-column
        label="销量"
        prop="bookSale" sortable
        width="100"
    >

    </el-table-column>
<!--销售状态-->
    <el-table-column
        :filter-method="statusFilter"
        :filters="[
        { text: '已上架', value: 1 },
        { text: '未上架', value: 0 }
        ]"
        filter-placement="bottom-end"
        label="销售状态"
        prop="bookStatus"
        width="100"

    >
      <template #default="scope">
        <el-tag
            :type="scope.row.bookStatus === 1 ? '' : 'danger'"
            disable-transitions
        >{{ statusTag(scope.row.bookStatus) }}
        </el-tag
        >
      </template>
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



  <el-button type="primary" class="AddBookButton" @click="addBookButton" >添加书籍</el-button>

  <book-detail
      v-model='bookDetailVisible'
      :bookDetailForm="bookDetailForm"
      @handleDetailCancel="handleDetailCancel"
      @handleDetailConfirm="handleDetailConfirm"

  ></book-detail>

  <add-book
    v-model='addBookVisible'
    :addBookForm="addBookForm"
    @handleAddCancel="handleAddCancel"
    @handleAddConfirm="handleAddConfirm"
  ></add-book>


</template>

<script setup>
import {computed, onBeforeMount, onMounted, ref, toRefs, watch} from 'vue';
import {ElMessage} from "element-plus";
import router from "@/router";
import {apiAddBook, apiBookListAll, apiCategoryList, apiLogin, apiUpdateBook} from "@/api";
import {useAdminStore, useBookStore, useCategory} from "@/store";
import {storeToRefs} from "pinia/dist/pinia";
import BookDetail from '@/components/BookDetail'
import AddBook from '@/components/AddBook'


//Pinia
let adminStore = useAdminStore()
let bookStore = useBookStore()
let categoryStore = useCategory()


//子组件数据
let bookDetailVisible = ref(false)
let addBookVisible = ref(false)
let bookDetailForm = ref({})
let addBookForm = ref({})


//书籍列表数据
const tableRef = ref()
let tableData = ref([])
let currentPage = ref(1)
const PageSize = ref(15)
let filterTableData = computed(() => {
  return tableData.value.filter(
      (data) => (
          (!searchAuthor.value || data.bookAuthor.toLowerCase().match(searchAuthor.value.toLowerCase())) &&
          (!searchBookName.value || data.bookName.toLowerCase().match(searchBookName.value.toLowerCase())) &&
          (!searchCategory.value || data.bookCategoryName.toLowerCase().match(searchCategory.value.toLowerCase())) &&
          (!searchPublisher.value || data.publisher.toLowerCase().match(searchPublisher.value.toLowerCase()))

      )
  )
})
let totalCount = computed(() => {
  return filterTableData.value.length
})


//搜索数据
const searchAuthor = ref('')
const searchBookName = ref('')
const searchCategory = ref('')
const searchPublisher = ref('')


//向后台获取数据
const getBookList = async () => {
  console.log('getBookList被调用')
  const res = await apiBookListAll()
  if (res.statusCode === 200) {
    bookStore.$state.bookList = res.data
    tableData.value = res.data
  } else {
    ElMessage.error(res.message)
  }
}
const getCategoryList = async () => {
  console.log('getCategoryList被调用')
  const res = await apiCategoryList()
  if (res.statusCode === 200) {
    categoryStore.$state.categoryList = res.data
  } else {
    ElMessage.error(res.message)
  }
}
const getAllInfo = async () => {
  await getBookList()
  await getCategoryList()

}
const updateBook = async () => {
  console.log('updateBook被调用')
  const res = await apiUpdateBook(bookDetailForm.value)
  console.log(bookDetailForm.value)
  if (res.statusCode === 200) {
    ElMessage.success(res.message)
    await getAllInfo()
    bookDetailVisible.value = false

  } else {
    ElMessage.error(res.message)
  }
}
const addBooK = async () => {
  console.log('addBook被调用')
  const res = await apiAddBook(addBookForm.value)
  if (res.statusCode === 200) {
    ElMessage.success(res.message)
    await getAllInfo()
    addBookVisible.value = false
  } else {
    ElMessage.error(res.message)
  }
}





//对表格数据修饰
const timeFormatter = (row, column, cellValue, index) => {
  let date = new Date(cellValue);
  let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
  let currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  let hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  let mm = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  return date.getFullYear() + "-" + month + "-" + currentDate
}
const statusTag = (cellValue) => {
  if (cellValue === 0) {
    return '未上架'
  }
  if (cellValue === 1) {
    return '已上架'
  }
}
const statusFilter = (value, row) => {
  return row.bookStatus === value
}


//事件方法
const handleCurrentChange = (val) => {
  currentPage.value = val
}
const handleSizeChange = (val) => {
  // 改变每页显示的条数
  PageSize.value=val
  // 注意：在改变每页显示的条数时，要将页码显示到第一页
  currentPage.value=1
}
const rowClick = (row, column, cell, event) => {
  bookDetailVisible.value = true
  bookDetailForm.value = JSON.parse(JSON.stringify(row))
}
const handleDetailCancel = () => {
  bookDetailVisible.value = false
  getAllInfo()

}
const handleDetailConfirm = () => {
  updateBook(bookDetailForm)
}
const handleAddCancel = () => {
  addBookVisible.value = false;
}
const handleAddConfirm = () => {
  addBooK(addBookForm)
}
const addBookButton = () => {
  addBookForm.value = {}
  addBookVisible.value = true
}

onMounted(async() => {
  await getAllInfo()
})
const Test = () => {

}

</script>

<style scoped>

</style>