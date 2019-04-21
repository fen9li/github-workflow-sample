<script>
import ElasticProcessor from '@lib/processors/elastic-processor'
import tableConfig from './products-table'
import addProduct from './product-add'

export default {
  name: 'CustomerProducts',
  components: {
    addProduct,
  },
  data() {
    return {
      processor: new ElasticProcessor({
        component: this,
        index: 'subscription-product-groups',
        disableQueryString: true,
      }),
      columns: tableConfig.columns,
      modal: {
        add: false,
      },
    }
  },
  methods: {
    onRowClick(row) {
      this.$router.push({
        name: 'subscription-details',
        params: { id: row.externalId },
      })
    },
  },
}
</script>

<template>
  <el-card>
    <el-row
      slot="header"
      type="flex"
      justify="space-between"
      align="middle"
    >
      <span>Products</span>
      <el-button
        type="primary"
        size="small"
        class="wide-button"
        @click="modal.add = true"
      >
        Add
      </el-button>
      <add-product
        v-if="modal.add"
        :visible.sync="modal.add"
      />
    </el-row>

    <data-table
      title="Subscriptions"
      :processor="processor"
      :columns="columns"
      @row-click="onRowClick"
    />
  </el-card>
</template>
