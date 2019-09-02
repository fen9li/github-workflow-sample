<script>
import StaticProcessor from '@lib/processors/static-processor'
import productsTable from './provider-products.table'
export default {
  name: 'ProviderProducts',
  props: {
    products: {
      type: Array,
      default: () => [],
      required: true
    },
  },
  data() {
    return {
      progress: false,
      table: productsTable,
    }
  },
  watch: {
    items() {
      this.getData()
    },
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.table.processor = new StaticProcessor({
        component: this,
        data: this.products,
        disableQueryString: true,
      })
    },
  },
}
</script>

<template>
  <div :class="$style.products">
    <div :class="$style.title">
      Products
    </div>
    <table-layout
      :class="$style.table"
      shadow="never"
      table-name="provider-products"
      :processor="table.processor"
      :columns="table.columns"
      :fragments="false"
      :hider="false"
      :table-controls="false"
    />
  </div>
</template>

<style lang="scss" module>
.products {
  padding: 0;
  margin: 0;
}

.title {
  margin: rem(0 0 40px);
  font-size: rem(22px);
  font-weight: 600;
}

.table {
  max-width: 30rem;
  border: none !important;
  box-shadow: none !important;

  :global {
    .el-card__body > div {
      padding: 0;
    }
  }
}
</style>
