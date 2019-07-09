<script>
import { mapActions } from 'vuex'
import offerDetails from './details/merchant-offer-details'
import editOffer from './edit/merchant-offer-edit'

export default {
  name: 'MerchantOffer',
  components: {
    offerDetails,
    editOffer,
  },
  data() {
    return {
      loading: true,
      details: {},
      edit: false,
    }
  },
  computed: {
    merchantId() {
      return this.$route.params.id
    },
    offerId() {
      return this.$route.params.offerId
    },
    showEdit() {
      return this.details.status === 'active' || this.edit
    },
    title() {
      const { details, showEdit } = this
      if (Object.keys(details).length) {
        return `${details.name} ${showEdit ? 'Edit Offers Details' : '' }`
      }
      return 'Offers Details'
    },
  },
  created() {
    this.getMerchant()
  },
  methods: {
    ...mapActions('merchants', ['getMerchantOffers']),
    async getMerchant() {
      const [, { items }] = await this.getMerchantOffers(this.merchantId)

      if (Array.isArray(items)) {
        this.details = items.filter(item => item.id === this.offerId)[0]
        this.loading = false
      }
    },
  },
}
</script>

<template>
  <main-layout
    :title="title"
    :back="{name: 'merchant-offers'}"
    :loading="loading"
  >
    <edit-offer
      v-if="showEdit"
      :details="details"
    />
    <offer-details
      v-else
      :details="details"
      @editOffer="edit = true"
    />
  </main-layout>
</template>

<style lang="scss" module>
.wrapper {
  display: flex;
  justify-content: space-between
}

.grey {
  color: gray;
}

.title {
  display: block;
  margin-bottom: 1.8rem;
  font-size: 1.5rem;
}

.dataList {
  max-width: 80%;
}

.editBtn {
  margin-top: 2rem;
}
</style>
