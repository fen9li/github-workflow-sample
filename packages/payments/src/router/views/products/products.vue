<script>
import MainLayout from '@layouts/main/main-layout'
import createProduct from './create/create-product'

export default {
  name: 'Products',
  page: {
    title: 'Products',
  },
  components: {
    MainLayout,
    createProduct,
  },
  computed: {
    tabKey() {
      return this.$route.name
    },
    tabs() {
      return [
        {
          label: 'Subscription Products',
          route: {
            name: 'products-subscription',
          },
        },
        {
          label: 'Single Products',
          route: {
            name: 'products-single',
          },
        },
      ]
    },
  },
}
</script>

<template>
  <main-layout title="Products">
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

    <template slot="header">
      <create-product />
    </template>
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
</style>
