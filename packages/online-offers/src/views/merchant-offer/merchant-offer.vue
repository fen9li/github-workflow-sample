<script>
import details from '@tests/__fixtures__/merchant-offer'
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
      details,
      edit: false,
    }
  },
  computed: {
    showEdit() {
      return this.details.status === 'active' || this.edit
    },
    title() {
      const { details, showEdit } = this
      return `${details.merchantName} ${details.name} ${showEdit ? 'Edit Offers Details' : '' }`
    },
  },
}
</script>

<template>
  <main-layout
    :title="title"
    back
  >
    <el-card>
      <edit-offer
        v-if="showEdit"
        :details="details"
      />
      <offer-details
        v-else
        :details="details"
        @editOffer="edit = true"
      />
    </el-card>
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
