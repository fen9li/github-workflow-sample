<script>
import appConfig from '@src/app.config'
import MainLayout from '@layouts/main/main-layout.vue'
import TableLayout from '@layouts/table/table-layout'
import StaticProcessor from '@core/static-processor'
import tableConfig from './subscription-product-plans-table'
import subscriptionProduct
  from '@/tests/mock-api/resources/subscription-product-details'
import addPlanModal from './add-plan'
import deletePlanModal from './delete-plan.vue'

export default {
  name: 'ProductsSubscriptionDetails',
  page: {
    title: 'Subscription Product',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: {
    MainLayout,
    TableLayout,
    addPlanModal,
    deletePlanModal,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      details: subscriptionProduct.details,
      processor: new StaticProcessor({
        data: subscriptionProduct.tableData,
        component: this }),
      columns: tableConfig.columns,
      modal: {
        delete: false,
      },
    }
  },
}
</script>

<template>
  <main-layout
    title="Subscription Product"
    back
  >
    <el-card
      :class="$style.detailsBlock"
    >
      <div
        slot="header"
        :class="$style.detailsHeader"
      >
        <span>Product Details</span>
        <el-button
          type="primary"
          size="small"
        >
          Edit
        </el-button>
      </div>
      <dl class="datalist">
        <dt>Name</dt>
        <dd>{{ details.name }}</dd>

        <dt>Product Code</dt>
        <dd>{{ details.product_code }}</dd>

        <dt>Effective Start Date</dt>
        <dd>{{ details.effective_start_date }}</dd>

        <dt>End Date</dt>
        <dd>{{ details.end_date }}</dd>

        <dt>Billing Cycle</dt>
        <dd>{{ details.billing_cycle }}</dd>

        <dt>Anchor Date</dt>
        <dd>{{ details.anchor_date }}</dd>
      </dl>
    </el-card>
    <table-layout
      :processor="processor"
      :columns="columns"
      :table-controls="false"
      title="Plans"
    >
      <div
        slot="header"
        :class="$style.detailsHeader"
      >
        <span>Plans</span>
        <add-plan-modal />
      </div>
      <el-table-column
        slot="column"
        class-name="fixed-column"
        fixed="right"
        width="30"
      >
        <el-button
          class="flat-icon-button"
          type="danger"
          icon="el-icon-delete"
          plain
          @click="modal.delete = true"
        />
      </el-table-column>
    </table-layout>
    <delete-plan-modal
      v-if="modal.delete"
      :visible.sync="modal.delete"
    />
  </main-layout>
</template>

<style lang="scss" module>
.detailsBlock {
  margin-bottom: 2rem;
}

.detailsHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
