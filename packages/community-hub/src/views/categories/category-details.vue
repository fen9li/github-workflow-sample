<script>
import categoryForm from './category-form'
import categoryMock from '@tests/__fixtures__/category'

export default {
  name: 'CategoryDetails',
  page: {
    title: 'Category Details',
  },
  components: {
    categoryForm
  },
  data() {
    return {
      categoryMock,
    }
  },
}
</script>

<template>
  <main-layout
    :title="categoryMock.category_name"
    :back="{ name: 'categories' }"
  >
    <el-card>
      <category-form :category="categoryMock" />
    </el-card>
  </main-layout>
</template>
