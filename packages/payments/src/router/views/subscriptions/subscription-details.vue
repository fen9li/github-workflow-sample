<script>
import appConfig from '@src/app.config'
import MainLayout from '@layouts/main/main-layout.vue'
import MockData from '@mock-api/resources/subscription'

export default {
  name: 'SubscriptionsDetails',
  page: {
    title: 'Subscriptions',
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
    tabKey() {
      return this.$route.name
    },
    tabs() {
      return [
        {
          label: 'Subscription Information',
          route: {
            name: 'subscription-information',
          },
        },
        {
          label: 'Transactions',
          route: {
            name: 'subscription-transactions',
          },
        },
      ]
    },
  },
}
</script>

<template>
  <main-layout
    title="Subscriptions"
    back
  >
    <div
      slot="header"
      :class="$style.balance"
    >
      <big :class="$style.balanceCount">
        {{ subscription.balance | dollar }}
      </big>
      <small :class="$style.balanceLabel">
        Subscription Balance
      </small>
    </div>
    <el-tabs
      slot="subheader"
      :class="$style.tabs"
      :value="tabKey"
    >
      <el-tab-pane
        v-for="tab in tabs"
        :key="tab.route.name"
        :name="tab.route.name"
      >
        <router-link
          slot="label"
          :class="$style.tab"
          :to="tab.route"
        >
          {{ tab.label }}
        </router-link>
      </el-tab-pane>
    </el-tabs>

    <router-view />
  </main-layout>
</template>

<style lang="scss" module>
.tabs {
  margin-bottom: 1.5rem;
}

.tab {
  display: block;
  height: 100%;
  color: inherit !important;
  text-decoration: none;
}

.balance {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 2rem;
  text-align: right;
}

.balanceCount {
  margin-bottom: .5rem;
  font-size: 1.5rem;
}
</style>
