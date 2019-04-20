<script>
import appConfig from '@src/app.config'
import MainLayout from '@layouts/main/main-layout.vue'
import MockData from '@mock-api/resources/customer'

export default {
  name: 'CustomerProfile',
  page: {
    title: 'Customer Profile',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: {
    MainLayout,
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
    tabs() {
      return [
        {
          label: 'Information',
          route: {
            name: 'customer-information',
          },
        },
        {
          label: 'Transactions',
          route: {
            name: 'customer-transactions',
          },
        },
      ]
    },
  },
}
</script>

<template>
  <main-layout
    title="Customer Details"
    :tabs="tabs"
    back
  >
    <div
      slot="header"
      :class="$style.balance"
    >
      <div :class="$style.owing">
        <big :class="$style.balanceCount">
          - {{ subscription.owing | dollar }}
        </big>
        <small :class="$style.balanceLabel">
          Subscriptions Owing
        </small>
      </div>
      <div :class="$style.total">
        <big :class="$style.balanceCount">
          {{ subscription.total | dollar }}
        </big>
        <small :class="$style.balanceLabel">
          Total Amount Transacted
        </small>
      </div>
    </div>
    <router-view />
  </main-layout>
</template>

<style lang="scss" module>
@import '@design';

.balance {
  display: flex;
}

.total,
.owing {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 2rem;
  margin-left: 5rem;
  text-align: right;
}

.owing {
  color: var(--color-error);
}

.balanceCount {
  margin-bottom: .5rem;
  font-size: 1.5rem;
}
</style>
