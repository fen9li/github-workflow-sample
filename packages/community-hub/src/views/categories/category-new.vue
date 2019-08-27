<script>
import categoryForm from './category-form'

export default {
  name: 'CategoryNew',
  page: {
    title: 'New Category',
  },
  components: {
    categoryForm
  }
}
</script>

<template>
  <main-layout
    title="New Category"
    :back="{ name: 'categories' }"
  >
    <el-card>
      <category-form />
    </el-card>
  </main-layout>
</template>
