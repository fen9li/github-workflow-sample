<script>
import appConfig from '~/app.config'
import StaticProcessor from '@lib/processors/static-processor'
import tableConfig from './product-subscription-table'
import subscriptionProductMock
  from '@tests/__fixtures__/subscription-product-details'
import ProductSubscriptionAddPlan from './product-subscription-add-plan'
import ProductSubscriptionDeletePlan from './product-subscription-delete-plan'
import ProductSubscriptionEdit from './product-subscription-edit'
import capitalize from 'lodash/capitalize'

export default {
  name: 'ProductSubscription',
  page: {
    title: 'Subscription Product',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: {
    ProductSubscriptionAddPlan,
    ProductSubscriptionDeletePlan,
    ProductSubscriptionEdit,
  },
  data() {
    return {
      details: subscriptionProductMock.details,
      processor: new StaticProcessor({
        data: subscriptionProductMock.table,
        component: this }),
      columns: tableConfig.columns,
      modal: {
        delete: false,
        edit: false,
        add: false,
      },
    }
  },
  methods: {
    formatBillingCycle(name) {
      return name.split('-').map(elem => {
        return capitalize(elem)
      }).join('-')
    },
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
          icon="el-icon-edit"
          circle
          @click="modal.edit = true"
        />
        <product-subscription-edit
          :visible.sync="modal.edit"
          :current-product="details"
        />
      </div>
      <dl class="datalist">
        <dt>Name</dt>
        <dd>{{ details.productName }}</dd>

        <dt>Product Code</dt>
        <dd>{{ details.productCode }}</dd>

        <dt>Effective Start Date</dt>
        <dd>{{ details.effectiveStartDate }}</dd>

        <dt>End Date</dt>
        <dd>{{ details.endDate }}</dd>

        <dt>Billing Cycle</dt>
        <dd>{{ formatBillingCycle(details.billingCycle) }}</dd>

        <dt>Anchor Date</dt>
        <dd>{{ details.anchorDate }}</dd>
      </dl>
    </el-card>
    <table-layout
      title="Plans"
      table-name="plans"
      :processor="processor"
      :columns="columns"
      :table-controls="false"
    >
      <div
        slot="header"
        :class="$style.detailsHeader"
      >
        <span>Plans</span>
        <el-button
          type="primary"
          size="small"
          @click="modal.add = true"
        >
          Add
        </el-button>
        <product-subscription-add-plan :visible.sync="modal.add" />
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
    <product-subscription-delete-plan
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
