<template>
  <el-table
      ref="tableRef"
      :data="filterTableData"
      :default-sort="{ prop: 'bookName', order: 'descending' }"
      style="width: 100%"
      @row-click="rowClick"
  >
    <el-table-column
        label="书名"
        prop="bookName"
        sortable
        width="250"
    >
      <template #header>
        <slot>书名</slot>
        <el-input v-model="searchBookName" placeholder="请输入书名" size="small"
                  style="margin-left: 5px;width: 140px;"></el-input>
      </template>
    </el-table-column>

    <el-table-column align="left"
                     label="作者"
                     prop="bookAuthor"
                     width="250"
    >

      <template #header>
        <slot>作者</slot>
        <el-input v-model="searchAuthor" placeholder="请输入作者" size="small"
                  style="margin-left: 5px;width: 140px;"></el-input>
      </template>
    </el-table-column>


    <el-table-column
        label="封面"
        prop="bookCover"
        width="200"
    />

    <el-table-column
        label="分类"
        prop="bookCategoryName" width="150"
    >
      <template #header>
        <slot>分类</slot>
        <el-input v-model="searchCategory" placeholder="请输入分类" size="small"
                  style="margin-left: 5px;width: 80px;"></el-input>
      </template>
    </el-table-column>

    <el-table-column
        label="售价"
        prop="originalPrice" sortable
        width="150"
    >

    </el-table-column>

    <el-table-column
        label="出版社"
        prop="publisher"
        width="300"
    >
      <template #header>
        <slot>出版社</slot>
        <el-input v-model="searchPublisher" placeholder="请输入出版社" size="small"
                  style="margin-left: 5px;width: 160px;"></el-input>
      </template>
    </el-table-column>

    <el-table-column
        :formatter="timeFormatter"
        label="出版日期"
        prop="publishDate"
        sortable
        width="200"
    />

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
      v-model:currentPage="bookListParams.pageNumber"
      v-model:page-size="bookListParams.pageSize"

      :total='bookStore.$state.totalCount'
      class="BookPage"
      layout="prev, pager, next, jumper"
      @current-change="handleCurrentChange"
  />

</template>

<script setup>
import {computed, onBeforeMount, onMounted, ref, toRefs} from 'vue';
import {ElMessage} from "element-plus";
import router from "@/router";
import {apiBookList, apiCategoryList} from "@/api";
import {useAdminStore, useBookStore, useCategory} from "@/store";
import {storeToRefs} from "pinia/dist/pinia";

let adminStore = useAdminStore()
let bookStore = useBookStore()
let categoryStore = useCategory()

const bookListParams = ref({
  pageNumber: 1,
  pageSize: 10,

})

const getBookList = async () => {
  console.log("getBookList")
  const res = await apiBookList(bookListParams.value)
  if (res.statusCode === 200) {
    bookStore.$state = res.data
  } else {
    ElMessage.error(res.message)
  }
}
const getCategoryList = async () => {
  console.log("getCategoryList")
  const res = await apiCategoryList()
  if (res.statusCode === 200) {
    categoryStore.$state = res.data
  } else {
    ElMessage.error(res.message)
  }
}
const getAllInfo = async () => {
  await getBookList()
  await getCategoryList()

}
onMounted(() => {
  getAllInfo()
  console.log(categoryStore.$state)
})

const tableRef = ref()
const tableData = ref(bookStore.$state.list)

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

const searchAuthor = ref('')
const searchBookName = ref('')
const searchCategory = ref('')
const searchPublisher = ref('')

const filterTableData = computed(() =>
    tableData.value.filter(
        (data) => (
            (!searchAuthor.value || data.bookAuthor.toLowerCase().match(searchAuthor.value.toLowerCase())) &&
            (!searchBookName.value || data.bookName.toLowerCase().match(searchBookName.value.toLowerCase())) &&
            (!searchCategory.value || data.bookCategoryName.toLowerCase().match(searchCategory.value.toLowerCase())) &&
            (!searchPublisher.value || data.publisher.toLowerCase().match(searchPublisher.value.toLowerCase()))

        )
    )
)

const handleCurrentChange = () => {

}

const rowClick = () => {

}

</script>

<style scoped>

</style>