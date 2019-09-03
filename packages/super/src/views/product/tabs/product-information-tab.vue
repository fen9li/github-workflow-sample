<script>
import ProviderStatus from '../../provider/details/provider-status.vue'
import { formatDate } from '@lib/utils/format-date'

export default {
  name: 'ProductInformationTab',
  components: {
    ProviderStatus,
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatDate(value) {
      return formatDate(value, 'DD/MM/YYYY hh:mm')
    },
  },
}
</script>

<template>
  <el-card>
    <div
      slot="header"
      :class="$style.header"
    >
      <div :class="$style.title">
        Product Details
        <provider-status :status="product.status" />
      </div>
    </div>
    <dl :class="['datalist', $style.list]">
      <dt>Date Created</dt>
      <dd>{{ formatDate(product.createdAt) }}</dd>

      <dt>Product ID</dt>
      <dd>{{ product.id }}</dd>

      <dt>Product Name</dt>
      <dd>{{ product.name }}</dd>

      <dt>Product Description</dt>
      <dd>{{ product.description }}</dd>
    </dl>
  </el-card>
</template>

<style lang="scss" module>
.list {
  flex: 1 0 50%;
  margin-top: 0;

  dt {
    color: black;
  }

  h2,
  h3,
  h4,
  h5,
  h6 {
    padding: 0;
    margin: 0 0 1rem;
    font-size: 1rem;
  }
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.title {
  display: flex;
  flex: 1 0 50%;
  align-items: center;
}
</style>
