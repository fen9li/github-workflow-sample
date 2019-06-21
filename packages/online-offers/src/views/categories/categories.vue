<script>
import table from './categories.table.js'
import ApiProcessor from '@lib/processors/api-processor'
import CategoryModal from './category-modal'
import { mapGetters, mapMutations } from 'vuex'

export default {
  components: { CategoryModal },
  data() {
    return {
      table,
      showAddModal: false,
    }
  },
  computed: {
    ...mapGetters('categories', ['tableUpdate']),
  },
  watch: {
    tableUpdate() {
      this.getCategories()
    },
  },
  created() {
    this.getCategories()
  },
  methods: {
    ...mapMutations('categories', {
      updateTable: 'UPDATE_TABLE',
    }),
    getCategories() {
      this.updateTable(false)
      this.table.processor = new ApiProcessor({
        component: this,
        path: `categories`,
      })
    },
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
      table-name="feed-updates"
      :processor="table.processor"
      :filters="false"
      :columns="table.columns"
      :fragments="false"
      :hider="false"
    />

    <el-button
      slot="header"
      type="primary"
      @click="showAddModal = true"
    >
      Add Category
    </el-button>

    <category-modal
      v-if="showAddModal"
      slot="header"
      :visible.sync="showAddModal"
      @close-modal="closeModal"
    />
  </main-layout>
</template>
