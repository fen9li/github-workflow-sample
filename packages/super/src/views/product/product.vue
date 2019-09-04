<script>
import { mapActions, mapState } from 'vuex'
import ProductInformationTab from './tabs/product-information-tab.vue'
import ProductRolesTab from './tabs/product-roles-tab.vue'
import ProductVersionsTab from './tabs/product-versions-tab.vue'

import EditProductModal from './modals/edit-product-modal.vue'
import CreateVersionModal from './modals/create-version-modal.vue'

// import ProductMock from './product.mock.js'

export default {
  name: 'ProductDetail',
  components: {
    ProductInformationTab,
    ProductRolesTab,
    ProductVersionsTab,
    EditProductModal,
    CreateVersionModal,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    activeTab: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      loading: true,
      modal: {
        editProduct: false,
        createVersion: false,
      },
    }
  },
  computed: {
    ...mapState('product', ['product'])
  },
  async created() {
    this.loading = true
    const [error,] = await this.getProduct(this.id)
    if (error) {
      this.$router.replace({ name: 'product' })
      console.error(error)
    }
    this.loading = false
  },
  methods: {
    ...mapActions('product', ['getProduct']),
    onTabChanged(tabName) {
      this.$router.push({
        name: 'product-details',
        params: {
          id: this.id,
          activeTab: tabName,
        },
      })
    },
    refreshTable(tabName) {
      if (this.activeTab !== tabName) {
        return
      }

      const tabRef = this.$refs[`${tabName}Tab`]

      tabRef.table.processor.getData()
    },
  },
}
</script>

<template>
  <main-layout
    title="Product"
    :back="{ name: 'products' }"
    :loading="loading"
  >
    <template #header>
      <edit-product-modal
        v-if="modal.editProduct"
        :product="product"
        :visible.sync="modal.editProduct"
        @close-modal="modal.editProduct = false"
        @refresh-table="refreshTable('role')"
      />
      <create-version-modal
        v-if="modal.createVersion"
        :product="product"
        :visible.sync="modal.createVersion"
        @close-modal="modal.createVersion = false"
        @refresh-table="refreshTable('versions')"
      />

      <el-button
        type="primary"
        class="el-button--wide"
        plain
        @click="modal.editProduct = true"
      >
        Edit Product
      </el-button>
      <el-button
        type="primary"
        class="el-button--wide"
        @click="modal.createVersion = true"
      >
        Create Version
      </el-button>
    </template>

    <el-tabs
      :value="activeTab"
      @input="onTabChanged"
    >
      <el-tab-pane
        label="Product Information"
        name="info"
        lazy
      >
        <product-information-tab :product="product" />
      </el-tab-pane>

      <el-tab-pane
        label="Roles"
        name="roles"
        lazy
      >
        <product-roles-tab ref="rolesTab" />
      </el-tab-pane>

      <el-tab-pane
        label="Versions"
        name="versions"
        lazy
      >
        <product-versions-tab
          ref="versionsTab"
          :product-id="id"
        />
      </el-tab-pane>
    </el-tabs>
  </main-layout>
</template>
