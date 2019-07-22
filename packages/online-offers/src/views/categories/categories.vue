<script>
import categoriesTable from './categories.table.js'

import CategoryModal from './category-modal'

export default {
  components: { CategoryModal },
  data() {
    return {
      table: categoriesTable(this),
      showAddModal: false,
    }
  },
  methods: {
    closeModal() {
      this.showAddModal = false
    },
  },
}
</script>

<template>
  <main-layout
    v-if="table.processor"
    title="Categories"
  >
    <table-layout
      table-name="categories"
      :processor="table.processor"
      :filters="false"
      :columns="table.columns"
      :fragments="false"
      :quantity="[25, 50, 100, 200]"
      :hider="false"
    />

    <el-button
      slot="header"
      type="primary"
      class="el-button--wide"
      @click="showAddModal = true"
    >
      Add Category
    </el-button>

    <category-modal
      v-if="showAddModal"
      slot="header"
      :processor="table.processor"
      :visible.sync="showAddModal"
      @close-modal="closeModal"
    />
  </main-layout>
</template>
