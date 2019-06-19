<script>
import appConfig from '~/app.config'
import ElasticProcessor from '@lib/processors/elastic-processor'
import tableConfig from './product-subscription-table'
import ProductSubscriptionAddPlan from './product-subscription-add-plan'
import ProductSubscriptionDeletePlan from './product-subscription-delete-plan'
import ProductSubscriptionEdit from './product-subscription-edit'
import capitalize from 'lodash/capitalize'
import { formatDate } from '@lib/utils/format-date'


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
  props: {
    id: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      details: {
        name: '',
        id: '',
        start_on: '',
        end_on: '',
        group: {
          billing_type: '',
          anchor_on: '',
        },
      },
      processor: new ElasticProcessor({
        component: this,
        index: 'subscription-product-pricing-plans',
        // TODO: Add filtering by productId (currently PP productId and subsc. id do not match: UUID vs user-input-id )
      }),
      columns: tableConfig.columns,
      modal: {
        delete: false,
        edit: false,
        add: false,
      },
    }
  },
  mounted() {
    this.getSubscriptionDetails()
  },
  methods: {
    // TODO: Adjust the formatter
    formatBillingCycle(name) {
      return name === 'anniversary' ? capitalize(name) : 'Pro rata'
    },
    formatDate(value, format) {
      return formatDate(value, format || 'DD/MM/YYYY')
    },
    async getSubscriptionDetails() {
      const [error, response] = await this.$api.get(`/products/${this.id}`)
      if (response) {
        this.details = { ...this.details, ...response }
      }
      console.warn(error, response)
    },
  },
}
</script>

<template>
  <main-layout
    title="Products"
    back
  >
    <el-card
      :class="$style.detailsBlock"
    >
      <div
        slot="header"
        :class="$style.detailsHeader"
      >
        <span>Subscription Product Details</span>
        <el-button
          type="primary"
          icon="el-icon-edit"
          :class="$style.editBtn"
          circle
          @click="modal.edit = true"
        />
        <product-subscription-edit
          :visible.sync="modal.edit"
          :current-product="details"
          @edited="getSubscriptionDetails"
        />
      </div>
      <dl class="datalist">
        <dt>Name</dt>
        <dd>{{ details.name }}</dd>

        <dt>Product Code</dt>
        <dd>{{ details.id }}</dd>

        <dt>Start Date</dt>
        <dd>{{ formatDate(details.start_on) }}</dd>

        <dt>End Date</dt>
        <dd>{{ formatDate(details.end_on) }}</dd>

        <dt>Billing Cycle</dt>
        <dd>{{ formatBillingCycle(details.group.billing_type) }}</dd>

        <dt>Anchor Date</dt>
        <dd>{{ formatDate(details.group.anchor_on, 'DD/MM') }}</dd>
      </dl>
    </el-card>
    <table-layout
      title="Pricing Plans"
      table-name="plans"
      :processor="processor"
      :columns="columns"
      :table-controls="false"
    >
      <div
        slot="header"
        :class="$style.detailsHeader"
      >
        <span>Pricing Plans</span>
        <el-button
          type="primary"
          size="small"
          class="wide-button"
          @click="modal.add = true"
        >
          Add
        </el-button>
        <product-subscription-add-plan
          :visible.sync="modal.add"
          :product-id="id"
        />
      </div>
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

  :global{
    .el-card__body {
      padding-top: 0;
    }
  }
}

.detailsHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.editBtn {
  :global {
    .el-icon-edit {
      font-weight: 700;
    }
  }
}
</style>
