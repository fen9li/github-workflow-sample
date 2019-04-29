<script>
import appConfig from '~/app.config'
import formatDollar from '@lib/utils/format-dollar'
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
        code: '',
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
    async getProductDetails() {
      // TODO: Delete Temporary || 'PROD_1' until api is fully ready
      const [error, response] = await this.$api.get(`/single-products/${this.id || 'PROD_1'}`)
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
        <dd>{{ productDetails.code }}</dd>

        <dt>Effective Start Date</dt>
        <dd>{{ productDetails.start_on }}</dd>

        <dt>End Date</dt>
        <dd>{{ productDetails.end_on }}</dd>

        <dt>Amount</dt>
        <dd>{{ formatDollar(productDetails.price) }}</dd>

        <dt>Image</dt>
        <dd>
          <div
            v-if="productDetails.image"
            class="datalist__image"
          >
            <img
              :src="productDetails.image"
              alt="Product image"
            >
          </div>
          <span
            v-else
          >
            No image attached
          </span>
        </dd>
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
