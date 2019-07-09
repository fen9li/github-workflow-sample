<script>
import { mapActions } from 'vuex'
import merchantDetails from './details/merchant-details'
import merchantEdit from './edit/merchant-edit'

export default {
  name: 'MerchantDetails',
  components: {
    merchantDetails,
    merchantEdit,
  },
  data() {
    return {
      loading: true,
      merchant: {},
      merchantFeeds: [],
      categories: [],
      edit: false,
    }
  },
  computed: {
    merchantId() {
      return this.$route.params.id
    },
  },
  created() {
    this.fetchMerchant()
  },
  methods: {
    ...mapActions('merchants', [
      'getMerchantFeeds',
      'getGlobalMerchant',
    ]),
    ...mapActions('categories', [
      'getCategories',
    ]),
    async fetchMerchant() {
      const [, merchant] = await this.getGlobalMerchant(this.merchantId)
      const [, { items: merchantFeeds }] = await this.getMerchantFeeds(this.merchantId)
      // get all categories
      this.categories = await this.getCategories()
      this.merchant = merchant
      this.merchant.commission = merchantFeeds[0].map.feed
      this.merchantFeeds = merchantFeeds
      this.loading = false
    },
    onUpdate(response) {
      response.commission = this.merchantFeeds[0].map.feed
      this.merchant = response
    },
  },
}
</script>

<template>
  <main-layout
    :title="merchant.name"
    :back="{ name: 'merchants' }"
  >
    <base-loader
      v-if="loading"
      theme="state"
      size="large"
    />
    <el-card v-else>
      <merchant-edit
        v-if="edit"
        :merchant="merchant"
        :feeds="merchantFeeds"
        :categories="categories"
        @update="onUpdate"
        @cancel="edit = false"
      />
      <merchant-details
        v-else
        :merchant="merchant"
        :feed="merchantFeeds[0]"
        @editMerchant="edit = true"
      />
    </el-card>
  </main-layout>
</template>
