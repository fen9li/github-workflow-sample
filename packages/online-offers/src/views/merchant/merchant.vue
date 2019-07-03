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
      details: {},
      edit: false,
    }
  },
  computed: {
    merchantId() {
      return this.$route.params.id
    },
  },
  watch: {
    details() {
      return Object.keys(this.details).length
    },
  },
  created() {
    this.fetchMerchant()
  },
  methods: {
    ...mapActions('merchants', [
      'getGlobalMerchant',
    ]),
    async fetchMerchant() {
      const [, response] = await this.getGlobalMerchant(this.merchantId)
      if (response) {
        this.details = response
      }
    },
  },
}
</script>

<template>
  <main-layout
    :title="details.name"
    :back="{name: 'merchants'}"
  >
    <base-loader
      v-if="!details"
      theme="state"
      size="large"
    />
    <el-card v-else>
      <merchant-edit
        v-if="edit"
        :details="details"
      />
      <merchant-details
        v-else
        :details="details"
        @editMerchant="edit = true"
      />
    </el-card>
  </main-layout>
</template>
