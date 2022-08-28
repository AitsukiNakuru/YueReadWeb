<template>
  <el-dialog v-model="bookDetailVisible" title="书籍详情">

    <el-form :model="bookDetailForm" ref="bookDetailFormRef">

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
        <el-select v-model="bookDetailForm.bookCategoryName" placeholder="Select" @change="changeCategory">
          <el-option
              v-for="item in categoryList"
              :key="item.categoryId"
              :label="item.categoryName"
              :value="item.categoryName"

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
        <el-input v-model="bookDetailForm.originalPrice" />
      </el-form-item>

      <el-form-item label="出版社" prop="publisher">
        <el-input v-model="bookDetailForm.publisher" />
      </el-form-item>

      <el-form-item label="销售状态" prop="publishDate">
        <el-date-picker
            v-model="bookDetailForm.publishDate"
            type="date"
            placeholder="Pick a day"
        />
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

const categoryList = categoryStore.$state.list



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

const log = () => {
  console.log(props.bookDetailForm)
  console.log(categoryList)
}

</script>

<style scoped>

</style>