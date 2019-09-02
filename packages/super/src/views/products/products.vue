<script>
import table from './products.table'
import CreateProductModal from './create-product-modal'

export default {
  name: 'Products',
  page: {
    title: 'Products',
  },
  components: { CreateProductModal },
  data() {
    return {
      table: table(this),
      showCreateModal: false,
    }
  },
  methods: {
    onRowClick(row) {
      this.$router.push({
        name: 'product-details',
        params: { id: row.id },
      })
    },
  },
}
</script>

<template>
  <main-layout title="Products">
    <table-layout
      table-name="products"
      :processor="table.processor"
      :filters="table.filters"
      :columns="table.columns"
      :fragments="false"
      @row-click="onRowClick"
    />

    <el-button
      slot="header"
      type="primary"
      class="el-button--wide"
      @click="showCreateModal = true"
    >
      Create Product
    </el-button>

    <create-product-modal
      v-if="showCreateModal"
      slot="header"
      :processor="table.processor"
      :visible.sync="showCreateModal"
      @close-modal="showCreateModal = false"
    />
  </main-layout>
</template>
