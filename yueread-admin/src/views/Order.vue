<template>
  <el-input v-model="orderSearch" placeholder="请输入搜索条件" style="width: 200px;"></el-input>

  <el-table
      :border="parentBorder"
      :data="filterTableData.slice((currentPage-1)*PageSize,currentPage*PageSize)"
      style="width: 100%; height:85%"
      @cell-click=""
  >

    <el-table-column class="infinite-list" type="expand">
      <template #default="props">

        <el-table :border="parentBorder" :data="props.row.userOrderList" style="margin-left:20px">
          <el-table-column class="infinite-list" type="expand">

            <template #default="props">
              <el-table :border="childBorder" :data="props.row.bookList" style="margin-left: 40px">
                <el-table-column label="数量" prop="bookCount" sortable></el-table-column>

                <el-table-column label="购买价格" prop="sellingPrice" sortable></el-table-column>

                <el-table-column
                    label="书名"
                    prop="bookInfo.bookName"
                    width="auto"
                >
                  <template #header>
                    <slot>书名</slot>
                  </template>
                </el-table-column>
                <!--作者-->
                <el-table-column align="left"
                                 label="作者"
                                 prop="bookInfo.bookAuthor"
                                 width="auto"
                >

                  <template #header>
                    <slot>作者</slot>

                  </template>
                </el-table-column>
                <!--封面-->
<!--                <el-table-column-->
<!--                    label="封面"-->
<!--                    prop="bookInfo.bookCover"-->
<!--                    width="auto"-->
<!--                />-->
                <!--分类-->
                <el-table-column
                    label="分类"
                    prop="bookInfo.bookCategoryName" width="auto"
                >
                  <template #header>
                    <slot>分类</slot>

                  </template>
                </el-table-column>
                <!--价格-->
                <el-table-column
                    label="价格"
                    prop="bookInfo.originalPrice" sortable
                    width="auto"
                >

                </el-table-column>
                <!--出版社-->
                <el-table-column
                    label="出版社"
                    prop="bookInfo.publisher"
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
                    prop="bookInfo.publishDate"
                    sortable
                    width="auto"
                />
                <!--库存-->
                <el-table-column
                    label="库存"
                    prop="bookInfo.bookStock" sortable
                    width="auto"
                >

                </el-table-column>
                <!--销量-->
                <el-table-column
                    label="销量"
                    prop="bookInfo.bookSale" sortable
                    width="auto"
                >

                </el-table-column>
                <!--销售状态-->
                <el-table-column
                    :filters="[{ text: '已上架', value: 1 },{ text: '未上架', value: 0 }]"
                    filter-placement="bottom-end"
                    label="销售状态"
                    prop="bookInfo.bookStatus"
                    width="auto"
                >
                  <template #default="scope">
                    <el-tag
                        :type="scope.row.bookInfo.bookStatus === 1 ? '' : 'danger'"
                        disable-transitions
                    >{{ bookStatusTag(scope.row.bookInfo.bookStatus) }}
                    </el-tag>
                  </template>
                </el-table-column>
              </el-table>
            </template>

          </el-table-column>

          <el-table-column label="订单号" prop="orderId"/>
          <el-table-column label="订单金额" prop="totalPrice" sortable/>
          <el-table-column label="书籍数量" prop="bookList.length" sortable/>
          <el-table-column label="订单日期" prop="orderDate" sortable :formatter="orderTimeFormatter"/>
          <el-table-column label="订单状态"
                           :filters="[{ text: '已完成', value: 1 },{ text: '已退款', value: 2 }]"
                           prop="orderStatus">
            <template #default="scope">
              <el-tag
                  :type="scope.row.orderStatus === 1 ? '' : 'danger'"
                  disable-transitions
              >{{ orderStatusTag(scope.row.orderStatus) }}
              </el-tag>
            </template>
          </el-table-column>


        </el-table>

      </template>
    </el-table-column>

    <el-table-column label="用户名" prop="user.userUsername"/>
    <el-table-column label="订单数量" prop="userOrderList.length" sortable/>
    <el-table-column label="购买金额" prop="user.userPurchase" sortable/>
  </el-table>

  <el-pagination
      :currentPage="currentPage"
      :page-size="PageSize"
      :total="totalCount"
      class="BookPage"
      layout="prev, pager, next, jumper"
      @current-change="handleCurrentChange"
  />
</template>

<script setup>
import {onMounted, ref, computed} from 'vue';
import {apiOrderList} from "@/api";


//搜索
let orderSearch = ref()


//表格数据
const parentBorder = ref(false)
const childBorder = ref(false)
let tableData = ref([])
let filterTableData = computed(() => {
  return tableData.value.filter((data) => (data.user.userUsername.match(orderSearch.value) ||
          data.user.userNickname.match(orderSearch.value)
  ))
})
let categorySearch = ref()
let currentPage = ref(1)
const PageSize = ref(10)
let totalCount = computed(() => {
  return filterTableData.value.length
})


//向后台获取数据
const getOrderList = async () => {
  console.log('getOrderList被调用')
  const res = await apiOrderList()
  if (res.statusCode === 200) {
    tableData.value = res.data
    console.log(res.data)
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
const orderTimeFormatter = (row, column, cellValue, index) => {
  let date = new Date(cellValue);
  let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
  let currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  let hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  let mm = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  let ss = date.getSeconds()
  return date.getFullYear() + "-" + month + "-" + currentDate + " " + hh + ":" + mm + ":" + ss
}
const orderStatusTag = (cellValue) => {
  if (cellValue === 1) {
    return '已完成'
  }
  if (cellValue === 2) {
    return '已退款'
  }
}
const bookStatusTag = (cellValue) => {
  if (cellValue === 0) {
    return '未上架'
  }
  if (cellValue === 1) {
    return '已上架'
  }
}

onMounted(() => {
  getOrderList()
})


</script>

<style scoped>

</style>