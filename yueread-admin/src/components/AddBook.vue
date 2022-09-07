<template>
  <el-dialog v-model="addBookVisible" title="添加书籍">
    <el-form :model="addBookForm" ref="addBookFormRef" :rules="rules">

      <el-form-item label="书名" prop="bookName">
        <el-input v-model="addBookForm.bookName" />
      </el-form-item>

      <el-form-item label="ISBN" prop="bookIsbn">
        <el-input v-model="addBookForm.bookIsbn" />
      </el-form-item>

      <el-form-item label="作者" prop="bookAuthor">
        <el-input v-model="addBookForm.bookAuthor" />
      </el-form-item>

      <el-form-item label="分类" prop="bookCategoryName">
        <el-select v-model="addBookForm.bookCategoryName" placeholder="Select" @change="changeCategory">
          <el-option
              v-for="item in categoryStore.$state.categoryList"
              :key="item.categoryId"
              :label="item.categoryName"
              :value="item.categoryName"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="简介" prop="bookIntro">
        <el-input v-model="addBookForm.bookIntro" />
      </el-form-item>

      <el-form-item label="封面" prop="bookCover">
        <el-input v-model="addBookForm.bookCover" />
      </el-form-item>

      <el-form-item label="详细信息" prop="detailContent">
        <el-input v-model="addBookForm.detailContent" />
      </el-form-item>

      <el-form-item label="价格" prop="originalPrice">
        <el-input-number v-model="addBookForm.originalPrice" />
      </el-form-item>

      <el-form-item label="出版社" prop="publisher">
        <el-input v-model="addBookForm.publisher" />
      </el-form-item>

      <el-form-item label="出版日期" prop="publishDate">
        <el-date-picker
            v-model="addBookForm.publishDate"
            type="date"
            placeholder="Pick a day"
        />
      </el-form-item>

      <el-form-item label="库存" prop="bookStock">
        <el-input v-model="addBookForm.bookStock" />
      </el-form-item>


      <el-form-item label="首页展示" prop="carousel">
        <el-radio-group v-model="addBookForm.carousel">
          <el-radio label='1' border>展示</el-radio>
          <el-radio label='0' border>不展示</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="销售状态" prop="bookStatus">
        <el-radio-group v-model="addBookForm.bookStatus">
          <el-radio label='1' border>已上架</el-radio>
          <el-radio label='0' border>未上架</el-radio>
        </el-radio-group>
      </el-form-item>



    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="$emit('handleAddCancel')">取消</el-button>
        <el-button type="primary" @click="$emit('handleAddConfirm')">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import {onMounted, ref, watch} from 'vue';
import {useAdminStore, useBookStore, useCategory} from "@/store";
import {apiLogin} from "@/api";
import {ElMessage} from "element-plus";
import router from "@/router";

let categoryStore = useCategory()

let categoryList = categoryStore.$state.categoryList

let props = defineProps({
  addBookVisible: Boolean,
  addBookForm: Object,

})

const emits = defineEmits({
  handleAddCancel: Function,
  handleAddConfirm: Function
})

const addBookFormRef = ref()

const rules = ref({
  bookName: [
    { required: true, message: '请输入书名', trigger: 'blur' },
  ],
  bookIsbn: [
    { required: true, message: '请输入ISBN', trigger: 'blur' },
  ],
  bookAuthor: [
    { required: true, message: '请输入作者', trigger: 'blur' },
  ],
  bookIntro: [
    { required: true, message: '请输入简介', trigger: 'blur' },
  ],
  bookCover: [
    { required: true, message: '请输入封面', trigger: 'blur' },
  ],
  detailContent: [
    { required: true, message: '请输入详细信息', trigger: 'blur' },
  ],
  originalPrice: [
    { required: true, message: '请输入价格', trigger: 'blur' },
    { pattern: /^(\-|\+)?\d+(\.\d+)?$/, message: '请输入数字', trigger: 'blur'}
  ],
  publisher: [
    { required: true, message: '请输入出版社', trigger: 'blur' },
  ],
  publishDate: [
    { required: true, message: '请输入出版日期', trigger: 'blur' },
  ],
  bookStock: [
    { required: true, message: '请输入库存', trigger: 'blur' },
    { pattern: /^(\-|\+)?\d+(\.\d+)?$/, message: '请输入数字', trigger: 'blur'}
  ],
  carousel: [
    { required: true, message: '首页展示', trigger: 'blur' },
  ],
  bookStatus: [
    { required: true, message: '销售状态', trigger: 'blur' },
  ],
})




const changeCategory = (val) => {
  categoryList.forEach(item => {
    if (item.categoryName === val) {
      props.addBookForm.bookCategoryId = item.categoryId
    }
  })
}

onMounted(() => {
  let categoryList = categoryStore.$state.categoryList
})

</script>

<style scoped>

</style>