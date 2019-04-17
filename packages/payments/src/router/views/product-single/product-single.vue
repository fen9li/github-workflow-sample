<script>
import appConfig from '@src/app.config'
import MainLayout from '@layouts/main/main-layout.vue'
import productDetails from '@mock-api/resources/single-product-details'
import formatDollar from '@utils/format-dollar'
import ProductSingleEdit from './product-single-edit.vue'

export default {
  name: 'ProductSingle',
  page: {
    title: 'Single Product',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: {
    MainLayout,
    ProductSingleEdit,
  },
  data() {
    return {
      productDetails,
      modal: {
        singleEdit: false,
      },
    }
  },
  methods: {
    formatDollar(value) {
      return formatDollar(value)
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
        />
      </div>
      <dl class="datalist">
        <dt>Name</dt>
        <dd>{{ productDetails.productName }}</dd>

        <dt>Product Code</dt>
        <dd>{{ productDetails.productCode }}</dd>

        <dt>Effective Start Date</dt>
        <dd>{{ productDetails.effectiveStartDate }}</dd>

        <dt>End Date</dt>
        <dd>{{ productDetails.endDate }}</dd>

        <dt>Amount</dt>
        <dd>{{ formatDollar(productDetails.amount) }}</dd>

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
