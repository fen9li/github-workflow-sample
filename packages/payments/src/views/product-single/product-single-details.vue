<script>
import { formatDate } from '@lib/utils/format-date'
import capitalize from 'lodash/capitalize'
import formatDollar from '@lib/utils/format-dollar'
import formatFrequency from '@lib/utils/format-frequency'

export default {
  name: 'SingleProductDetails',
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    capitalize,
    formatDollar,
    formatFrequency,
    formatDate(value, format) {
      return formatDate(value, format || 'DD/MM/YYYY')
    },
  },
}
</script>

<template>
  <div
    class="info-block__wrapper"
  >
    <div class="info-block">
      <span class="info-block__title">
        {{ 'Single Product Details' }}
      </span>

      <dl
        v-if="product"
        :class="['datalist', 'info-block__flex-list']"
      >
        <dt>Product Name</dt>
        <dd>{{ product.name }}</dd>

        <dt>Product Code</dt>
        <dd>{{ product.id }}</dd>

        <dt>Amount</dt>
        <dd>{{ `${formatDollar(product.price.total)}` }}</dd>
      </dl>

      <span
        v-if="!product.id"
        class="info-block__empty"
      >
        No information provided
      </span>
    </div>

    <div>
      <div
        class="info-block__actions"
      >
        <el-button
          type="primary"
          data-test="details"
          @click="$router.push({name: 'products-single-details', params: {id: product.id}})"
        >
          View Product Information
        </el-button>
      </div>
    </div>
  </div>
</template>
