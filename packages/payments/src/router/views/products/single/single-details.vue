<script>
import appConfig from '@src/app.config'
import MainLayout from '@layouts/main/main-layout.vue'
import productDetails from '@/tests/mock-api/resources/single-product-details'
import formatDollar from '@utils/format-dollar'

export default {
  name: 'ProductsSingleDetails',
  page: {
    title: 'Single Product',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: {
    MainLayout,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      productDetails,
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
          size="small"
        >
          Edit
        </el-button>
      </div>
      <dl class="datalist">
        <dt>Name</dt>
        <dd>{{ productDetails.name }}</dd>

        <dt>Product Code</dt>
        <dd>{{ productDetails.product_code }}</dd>

        <dt>Effective Start Date</dt>
        <dd>{{ productDetails.effective_start_date }}</dd>

        <dt>End Date</dt>
        <dd>{{ productDetails.end_date }}</dd>

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
