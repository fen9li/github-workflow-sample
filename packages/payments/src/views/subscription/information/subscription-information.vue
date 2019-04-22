<script>
import appConfig from '~/app.config'
import MockData from '@tests/__fixtures__/subscription'
import EditModal from './subscription-edit'
import EndDateModal from './subscription-end-date'
import DeleteModal from './subscription-delete'

export default {
  name: 'SubscriptionInformation',
  page: {
    title: 'Subscription Information',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: {
    EditModal,
    EndDateModal,
    DeleteModal,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      modal: {
        edit: false,
        end: false,
        delete: false,
      },
    }
  },
  computed: {
    subscription() {
      return MockData.information
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
      <span>Details</span>

      <el-row type="flex">
        <el-button
          type="primary"
          size="small"
          plain
          @click="modal.end = true"
        >
          Set End Date
        </el-button>
        <el-button
          type="info"
          size="small"
          icon="el-icon-edit"
          circle
          @click="modal.edit = true"
        />
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="small"
          circle
          @click="modal.delete = true"
        />
        <end-date-modal
          v-if="modal.end"
          :subscription="subscription"
          :visible.sync="modal.end"
        />
        <edit-modal
          v-if="modal.edit"
          :visible.sync="modal.edit"
          :subscription="subscription"
        />
        <delete-modal
          v-if="modal.delete"
          :visible.sync="modal.delete"
          :subscription="subscription"
        />
      </el-row>
    </el-row>
    <el-container>
      <dl class="datalist">
        <dt>Start Date</dt>
        <dd>{{ subscription.startDate | date }}</dd>

        <dt>End Date</dt>
        <dd>{{ subscription.endDate | date }}</dd>

        <dt>Product Name</dt>
        <dd>{{ subscription.productName }}</dd>

        <dt>Product Code</dt>
        <dd>{{ subscription.productCode }}</dd>

        <dt>Billing Cycle</dt>
        <dd>{{ subscription.billingCycle }}</dd>

        <dt>Pricing Plan</dt>
        <dd>{{ subscription.pricingPlan | dollar }}</dd>

        <dt>Billing Interval</dt>
        <dd>{{ subscription.billingInterval }}</dd>

        <dt>Next Billing Date</dt>
        <dd>{{ subscription.nextBillingDate | date }}</dd>

        <dt>Coupon</dt>
        <dd>{{ subscription.coupon }}</dd>

        <dt>Company Name</dt>
        <dd>{{ subscription.companyName || '-' }}</dd>

        <dt>Company ABN</dt>
        <dd>{{ subscription.companyAbn || '-' }}</dd>

        <dt>First Name</dt>
        <dd>{{ subscription.firstName }}</dd>

        <dt>Last Name</dt>
        <dd>{{ subscription.lastName }}</dd>

        <dt>Customer ID</dt>
        <dd>{{ subscription.customerId }}</dd>

        <dt>Customer Email</dt>
        <dd>{{ subscription.customerEmail }}</dd>
      </dl>
    </el-container>
  </el-card>
</template>
