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
      @cell-click="cellClick"
  >

    <el-table-column type="expand" class="infinite-list">
      <template #default="props">
        <div>
          <el-table :border="childBorder" :data="props.row.bookList">
            <!--书名-->
            <el-table-column
                label="书名"
                prop="bookName"
                width="250"
            >
              <template #header>
                <slot>书名</slot>
              </template>
            </el-table-column>
            <!--作者-->
            <el-table-column align="left"
                             label="作者"
                             prop="bookAuthor"
                             width="auto"
            >

              <template #header>
                <slot>作者</slot>

              </template>
            </el-table-column>
            <!--封面-->
            <el-table-column
                label="封面"
                prop="bookCover"
                width="auto"
            />
            <!--分类-->
            <el-table-column
                label="分类"
                prop="bookCategoryName" width="auto"
            >
              <template #header>
                <slot>分类</slot>

              </template>
            </el-table-column>
            <!--价格-->
            <el-table-column
                label="价格"
                prop="originalPrice" sortable
                width="auto"
            >

            </el-table-column>
            <!--出版社-->
            <el-table-column
                label="出版社"
                prop="publisher"
                width="auto"
            >
              <template #header>
                <slot>出版社</slot>
              </template>
            </el-table-column>
            <!--出版日期-->
            <el-table-column
                :formatter="timeFormatter"
                label="出版日期"
                prop="publishDate"
                sortable
                width="auto"
            />
            <!--库存-->
            <el-table-column
                label="库存"
                prop="bookStock" sortable
                width="auto"
            >

            </el-table-column>
            <!--销量-->
            <el-table-column
                label="销量"
                prop="bookSale" sortable
                width="auto"
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
                width="auto"

            >
              <template #default="scope">
                <el-tag
                    :type="scope.row.bookStatus === 1 ? '' : 'danger'"
                    disable-transitions
                >{{ statusTag(scope.row.bookStatus) }}
                </el-tag>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="分类" prop="categoryName"/>
    <el-table-column label="书籍数量" prop="bookList.length"/>

  </el-table>

  <el-pagination
      :currentPage="currentPage"
      :total="totalCount"
      :page-size="PageSize"
      class="BookPage"
      layout="prev, pager, next, jumper"
      @current-change="handleCurrentChange"
  />

  <el-dialog v-model="categoryDetailVisible" title="分类修改">
    <el-form :model="categoryDetailForm">
      <el-form-item label="分类名称" >
        <el-input v-model="categoryDetailForm.categoryName" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="categoryDetailVisible = false">取消</el-button>
        <el-button type="primary" @click="handleUpdateConfirm">确认修改</el-button>
      </span>
    </template>
  </el-dialog>

  <el-button @click="TestButton">TestButton</el-button>

</template>

<script setup>
import {onMounted, ref, computed} from 'vue';
import {
  apiBookListByCategory,
  apiCategoryList,
  apiAddBook,
  apiBookListAll,
  apiAddCategory,
  apiUpdateCategory
} from "@/api";
import {ElMessage} from "element-plus";
import {useAdminStore, useBookStore, useCategory} from "@/store";


//Pinia
let adminStore = useAdminStore()
let bookStore = useBookStore()
let categoryStore = useCategory()

//表格数据
const parentBorder = ref(false)
const childBorder = ref(false)
let bookListByCategory = ref([])
let filterTableData = computed(() => {
  return bookListByCategory.value.filter((data) => (data.categoryName.match(categorySearch.value)))
})
let categorySearch = ref()
let currentPage = ref(1)
let totalCount = computed(() => {
  return filterTableData.value.length
})
const PageSize = ref(10)

//子组件数据
let categoryDetailVisible = ref(false)
let categoryDetailForm = ref({
  categoryId: null,
  categoryName: ''
})

//向后台获取数据
const getBookListByCategory = async () => {
  console.log('apiBookListByCategory被调用')
  const res = await apiBookListByCategory()
  if (res.statusCode === 200) {
    bookStore.$state.bookListByCategory = res.data
    bookListByCategory.value = res.data
    console.log(bookListByCategory.value)
  }
}
const addCategory = async () => {
  console.log('addCategory被调用')
  const res = await apiAddCategory({"categoryName":categorySearch.value})
  if (res.statusCode === 200) {
    ElMessage.success(res.message)
    await getBookListByCategory()

  } else {
    ElMessage.error(res.message)
  }
}
const updateCategory = async () => {
  console.log('updateCategory被调用')
  const res = await apiUpdateCategory(categoryDetailForm.value)
  if (res.statusCode === 200) {
    ElMessage.success(res.message)
    categoryDetailVisible.value = false
    await getBookListByCategory()
  } else {
    ElMessage.error(res.message)
  }
}


//表格数据修饰
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


//事件方法
let addCategoryDisable = computed(() => {
  return !(filterTableData.value.length===0)
})
const handleAddCategory = () => {
  if (categorySearch.value != null) {
    addCategory()
  }
}
const handleCurrentChange = (val) => {
  currentPage.value = val
}
const handleUpdateConfirm = () => {
 updateCategory()
}
const cellClick = (row, column, cell, event) => {
  categoryDetailForm.value.categoryName = JSON.parse(JSON.stringify(row.categoryName))
  categoryDetailForm.value.categoryId = JSON.parse(JSON.stringify(row.categoryId))
  console.log(categoryDetailForm.value)
  categoryDetailVisible.value = true
}


onMounted(async () => {
  await getBookListByCategory()
})
const TestButton = () => {
  console.log(tableData.value)
}
</script>

<style scoped>

</style>