<script>
import appConfig from '@src/app.config'
import MockData from '@mock-api/resources/subscription'
import EditModal from './edit-modal'
import EndDateModal from './end-date-modal'
import DeleteModal from './delete-modal'

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
        <end-date-modal
          :subscription="subscription"
        />
        <edit-modal
          :subscription="subscription"
        />
        <delete-modal
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

<style lang="scss">
@import '@design';
</style>
