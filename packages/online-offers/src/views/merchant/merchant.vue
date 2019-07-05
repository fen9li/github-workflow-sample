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
    async fetchMerchant() {
      const [, { items }] = await this.getMerchantFeeds(this.merchantId)
      if (Array.isArray(items)) {
        this.details = items[0]
        this.loading = false
      }
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
