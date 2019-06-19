<script>
import appConfig from '~/app.config'
import formatDollar from '@lib/utils/format-dollar'
import { formatDate } from '@lib/utils/format-date'
import ProductSingleEdit from './product-single-edit.vue'


export default {
  name: 'ProductSingle',
  components: {
    ProductSingleEdit,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  page: {
    title: 'Single Product',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  data() {
    return {
      productDetails: {
        id: '',
        name: '',
        active: '',
        end_on: '',
        price: '',
        start_on: '',
      },
      modal: {
        singleEdit: false,
      },
    }
  },
  created() {
    this.getProductDetails()
  },
  methods: {
    formatDollar(value) {
      return formatDollar(value)
    },
    formatDate(value, format) {
      return formatDate(value, format || 'DD/MM/YYYY')
    },
    async getProductDetails() {
      const [error, response] = await this.$api.get(`/single-products/${this.id}`)
      if (response) {
        this.productDetails = { ...this.productDetails, ...response }
      }
      console.warn(error, response)
    },
  },

}
</script>

<template>
  <main-layout
    title="Single Product"
    back
  >
    <el-card>
      <div
        slot="header"
        :class="$style.detailsHeader"
      >
        <span>Product Details</span>
        <el-button
          type="primary"
          icon="el-icon-edit"
          circle
          @click="modal.singleEdit = true"
        />
        <product-single-edit
          :visible.sync="modal.singleEdit"
          :edit="true"
          :current-product="productDetails"
          @updated="getProductDetails"
        />
      </div>
      <dl
        v-if="productDetails"
        class="datalist"
      >
        <dt>Name</dt>
        <dd>{{ productDetails.name }}</dd>

        <dt>Product Code</dt>
        <dd>{{ productDetails.id }}</dd>

        <dt>Effective Start Date</dt>
        <dd>{{ formatDate(productDetails.start_on) }}</dd>

        <dt>End Date</dt>
        <dd>{{ formatDate(productDetails.end_on) }}</dd>

        <dt>Amount</dt>
        <dd>{{ formatDollar(productDetails.price.total) }}</dd>
      </dl>
    </el-card>
  </main-layout>
</template>

<style lang="scss" module>
.detailsHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
