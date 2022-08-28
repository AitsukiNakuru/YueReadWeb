<template>
  <el-input v-model="categorySearch" placeholder="请输入分类进行搜索或添加" style="width: 200px;"></el-input>
  <el-button
      @click="handleAddCategory"
      :disabled="addCategoryDisable"
      style="margin-left: 10px"
      type="primary"
  >添加分类</el-button>
  <el-table
      :border="parentBorder"
      :data="filterTableData.slice((currentPage-1)*PageSize,currentPage*PageSize)"
      style="width: 100%; height:85%"
      @row-dblclick="rowClick"
  >
    <el-table-column type="expand" class="infinite-list">
      <template #default="props">
        <div>
          <el-table :border="childBorder" :data="props.row.books">
            <el-table-column label="书籍名称" prop="bookName"/>
            <el-table-column label="作者" prop="bookAuthor"/>
            <el-table-column label="价格" prop="originalPrice"/>
            <el-table-column label="出版社" prop="publisher"/>
            <el-table-column :formatter="timeFormatter" label="出版日期" prop="publishDate"/>
            <el-table-column label="销售状态" prop="bookStatus">
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
        </div>
      </template>
    </el-table-column>

    <el-table-column label="分类" prop="categoryName"/>

  </el-table>
  <el-pagination
      :currentPage="currentPage"
      :total="totalCount"
      :page-size="PageSize"
      class="BookPage"
      layout="prev, pager, next, jumper"
      @current-change="handleCurrentChange"
  />
  <el-button @click="TestButton">TestButton</el-button>

</template>

<script setup>
import {onMounted, ref, computed} from 'vue';
import {apiBookCategoryList, apiCategoryList, apiBookList, apiAddBook, apiBookListAll, apiAddCategory} from "@/api";
import {ElMessage} from "element-plus";
import {useAdminStore, useBookStore, useCategory} from "@/store";



let adminStore = useAdminStore()
let bookStore = useBookStore()
let categoryStore = useCategory()
const tableData = ref([])
const parentBorder = ref(false)
const childBorder = ref(false)
let categoryList = ref()
let bookList = ref()
let categorySearch = ref()

let currentPage = ref(1)
const PageSize = ref(10)

const getBookListAll = async () => {
  console.log('getBookListAll被调用')
  const res = await apiBookListAll()
  if (res.statusCode === 200) {
    bookList.value = res.data
  } else {
    ElMessage.error(res.message)
  }
}
const getCategoryList = async () => {
  console.log('getCategoryList被调用')
  const res = await apiCategoryList()
  if (res.statusCode === 200) {
    categoryStore.$state.list = res.data
    categoryList.value = res.data
  } else {
    ElMessage.error(res.message)
  }
}
const generateTableData = async () => {
  await getBookListAll()
  await getCategoryList()
  console.log('generateTableData被调用')
  categoryList.value.forEach(item => {
    let temp = bookList.value.filter((data) => (data.bookCategoryId === item.categoryId))
    tableData.value.push({
      categoryId: item.categoryId,
      categoryName: item.categoryName,
      books: temp

    })
  })
  console.log(tableData)

}
const addCategory = async () => {
  console.log('addCategory被调用')
  const res = await apiAddCategory({"categoryName":categorySearch.value})
  if (res.statusCode === 200) {
    ElMessage.success(res.message)
    await generateTableData()

  } else {
    ElMessage.error(res.message)
  }
}

onMounted(() => {
  generateTableData()
})

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

let filterTableData = computed(() => {
  return tableData.value.filter((data) => (data.categoryName.match(categorySearch.value)))
})
let addCategoryDisable = computed(() => {
  return !(filterTableData.value.length===0)
})
let totalCount = computed(() => {
  return filterTableData.value.length
})
const handleAddCategory = () => {
  if (categorySearch.value != null) {
    addCategory()
  }
}

const handleCurrentChange = (val) => {
  currentPage.value = val
}

const rowClick = (row, column) => {

}

const TestButton = () => {
  console.log(totalCount)
}
</script>

<style scoped>

</style>