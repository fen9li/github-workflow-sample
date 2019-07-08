<script>
import { mapActions } from 'vuex'
import set from 'lodash/set'
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
      details: {
        map: {
          name: '',
        },
      },
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
    ]),
    ...mapActions('categories', [
      'getCategories',
    ]),
    async fetchMerchant() {
      const [, { items }] = await this.getMerchantFeeds(this.merchantId)
      // get all categories
      const categories = await this.getCategories()
      items[0].map.categories = categories.map(el => ({
        id: el.id,
        label: el.name,
      }))
      if (Array.isArray(items)) {
        this.details = items[0]
        set(this.details, 'merchant.categories', [])
        set(this.details, 'merchant.commission', 'commission_factory')
        this.loading = false
      }
    },
    onUpdate(response) {
      // TODO: remove
      set(response, 'categories', this.details.merchant.categories)
      this.details.merchant = response
    },
  },
}
</script>

<template>
  <main-layout
    :title="details.map.name"
    :back="{name: 'merchants'}"
  >
    <base-loader
      v-if="loading"
      theme="state"
      size="large"
    />
    <el-card v-else>
      <merchant-edit
        v-if="edit"
        :details="details"
        @update="onUpdate"
        @cancel="edit = false"
      />
      <merchant-details
        v-else
        :details="details"
        @editMerchant="edit = true"
      />
    </el-card>
  </main-layout>
</template>
