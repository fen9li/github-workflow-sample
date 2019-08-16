<script>
export default {
  name: 'SubscriptionCustomerDetails',
  props: {
    customer: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<template>
  <div class="info-block__wrapper">
    <div class="info-block">
      <span class="info-block__title">
        Customer Details
      </span>
      <dl
        v-if="customer"
        :class="['datalist', 'info-block__flex-list']"
      >
        <dt>Customer ID</dt>
        <dd>{{ customer.id }}</dd>

        <dt>First Name</dt>
        <dd>{{ customer.first_name }}</dd>

        <dt>Last Name</dt>
        <dd>{{ customer.last_name }}</dd>

        <dt>Customer Email</dt>
        <dd>{{ customer.email }}</dd>
      </dl>

      <span
        v-else
        class="info-block__empty"
      >
        No information provided
      </span>
    </div>

    <div
      v-if="customer && customer.id"
      class="info-block__actions"
    >
      <el-button
        type="primary"
        data-test="details"
        @click="$router.push({name: 'customer-details', params: { id: customer.id }})"
      >
        View Customer Information
      </el-button>
    </div>
  </div>
</template>
