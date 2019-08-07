<script>
export default {
  name: 'CustomerDetails',
  props: {
    customer: {
      type: Object,
      default: () => ({}),
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    phone() {
      const { phone_numbers: numbers } = this.customer
      return numbers ? numbers[0] : '-'
    }
  }
}
</script>

<template>
  <div class="info-block">
    <span class="info-block__title">
      Customer Details
    </span>
    <dl
      v-if="customer.id"
      class="datalist"
    >
      <dt>Date Created</dt>
      <dd>{{ customer.created_at | dateTime }}</dd>

      <dt>Customer ID</dt>
      <dd>{{ customer.id }}</dd>

      <dt>First Name</dt>
      <dd>{{ customer.first_name }}</dd>

      <dt>Preferred Name</dt>
      <dd>{{ customer.preferred_name || '-' }}</dd>

      <dt>Last Name</dt>
      <dd>{{ customer.last_name }}</dd>

      <dt>Email</dt>
      <dd>{{ customer.email }}</dd>

      <dt>Telephone</dt>
      <dd>{{ phone }}</dd>

      <dt>Address</dt>
      <dd>{{ customer.address || '-' }}</dd>
    </dl>
  </div>
</template>
