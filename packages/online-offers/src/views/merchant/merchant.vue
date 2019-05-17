<script>
import merchantDetails from './details/merchant-details'
import merchantEdit from './edit/merchant-edit'
import details from '@tests/__fixtures__/merchant-details.js'


export default {
  name: 'MerchantDetails',
  components: {
    merchantDetails,
    merchantEdit,
  },
  data() {
    return {
      details,
      edit: false,
    }
  },
}
</script>

<template>
  <main-layout
    :title="details.name"
    back
  >
    <el-card>
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
