<template>
  <el-dialog v-model="bookDetailVisible" title="书籍详情">

    <el-form :model="bookDetailForm" ref="bookDetailFormRef" :rules="rules">

      <el-form-item label="书籍Id" prop="bookId">
        <el-input v-model="bookDetailForm.bookId" disabled/>
      </el-form-item>

      <el-form-item label="书名" prop="bookName">
        <el-input v-model="bookDetailForm.bookName" />
      </el-form-item>

      <el-form-item label="ISBN" prop="bookIsbn">
        <el-input v-model="bookDetailForm.bookIsbn" />
      </el-form-item>

      <el-form-item label="作者" prop="bookAuthor">
        <el-input v-model="bookDetailForm.bookAuthor" />
      </el-form-item>

      <el-form-item label="分类" prop="bookCategoryName">
        <el-select v-model="bookDetailForm.bookCategoryName" placeholder="选择分类" @change="changeCategory">
          <el-option
              v-for="item in categoryList"
              :key="item.categoryId"
              :label="item.categoryName"
              :value="item.categoryName"
              :rules="rules"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="简介" prop="bookIntro">
        <el-input v-model="bookDetailForm.bookIntro" />
      </el-form-item>

      <el-form-item label="封面" prop="bookCover">
        <el-input v-model="bookDetailForm.bookCover" />
      </el-form-item>

      <el-form-item label="详细信息" prop="detailContent">
        <el-input v-model="bookDetailForm.detailContent" />
      </el-form-item>

      <el-form-item label="价格" prop="originalPrice">
        <el-input-number v-model="bookDetailForm.originalPrice" />
      </el-form-item>

      <el-form-item label="出版社" prop="publisher">
        <el-input v-model="bookDetailForm.publisher" />
      </el-form-item>

      <el-form-item label="库存" prop="bookStock">
        <el-input-number v-model="bookDetailForm.bookStock" />
      </el-form-item>

      <el-form-item label="出版日期 " prop="publishDate">
        <el-date-picker
            v-model="bookDetailForm.publishDate"
            type="date"
            placeholder="选择日期"
        />
      </el-form-item>

      <el-form-item label="首页展示" prop="carousel">
        <el-radio-group v-model="bookDetailForm.carousel">
          <el-radio label='1' border>展示</el-radio>
          <el-radio label='0' border>不展示</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="上架状态" prop="bookStatus">
        <el-radio-group v-model="bookDetailForm.bookStatus">
          <el-radio label='1' border>已上架</el-radio>
          <el-radio label='0' border>未上架</el-radio>
        </el-radio-group>
      </el-form-item>



    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="$emit('handleDetailCancel')">取消</el-button>
        <el-button type="primary" @click="$emit('handleDetailConfirm')">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import {onMounted, ref, watch} from 'vue';
import {useAdminStore, useBookStore, useCategory} from "@/store";

let categoryStore = useCategory()

const categoryList = categoryStore.$state.categoryList

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
    { pattern: /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/, message: '请输入正数', trigger: 'blur'}
  ],
  publisher: [
    { required: true, message: '请输入出版社', trigger: 'blur' },
  ],
  publishDate: [
    { required: true, message: '请输入出版日期', trigger: 'blur' },
  ],
  bookStock: [
    { required: true, message: '请输入库存', trigger: 'blur' },
    { pattern: /^[1-9]\d*$/, message: '请输入正整数', trigger: 'blur'}
  ],
  carousel: [
    { required: true, message: '首页展示', trigger: 'blur' },
  ],
  bookStatus: [
    { required: true, message: '销售状态', trigger: 'blur' },
  ],
})

let props = defineProps({
  bookDetailVisible: Boolean,
  bookDetailForm: Object,

})

const emits = defineEmits({
  handleDetailCancel: Function,
  handleDetailConfirm: Function
})

const changeCategory = (val) => {
  categoryList.forEach(item => {

    if (item.categoryName === val) {
      props.bookDetailForm.bookCategoryId = item.categoryId
    }
  })
}
const bookDetailFormRef = ref()

const bookDetailValidate = (callback) => {
  bookDetailFormRef.value.validate((valid) => {
    callback(valid);
  });
}

defineExpose({ bookDetailValidate});





</script>

<style scoped>

</style>