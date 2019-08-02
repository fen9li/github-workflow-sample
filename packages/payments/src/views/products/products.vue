<script>
import ProductsCreate from './products-create.vue'

export default {
  name: 'Products',
  page: {
    title: 'Products',
  },
  components: {
    ProductsCreate,
  },
  data() {
    return {
      modal: {
        create: false,
      },
      shouldUpdate: false,
    }
  },
  computed: {
    tabKey() {
      return this.$route.name
    },
    tabs() {
      return [
        {
          label: 'Subscription Products',
          route: {
            name: 'products-subscription',
          },
        },
        {
          label: 'Single Products',
          route: {
            name: 'products-single',
          },
        },
      ]
    },
  },
}
</script>

<template>
  <main-layout
    title="Products"
    :tabs="tabs"
  >
    <template slot="header">
      <el-button
        type="primary"
        data-test="create"
        @click="modal.create = true"
      >
        Create Product
      </el-button>
      <products-create
        v-if="modal.create"
        :visible.sync="modal.create"
        :should-update.sync="shouldUpdate"
      />
    </template>
    <router-view
      :should-update.sync="shouldUpdate"
    />
  </main-layout>
</template>

<style lang="scss" module>

.tabs {
  margin-bottom: 1.5rem;
}

.tab {
  display: block;
  height: 100%;
  color: inherit !important;
  text-decoration: none;
}
</style>
