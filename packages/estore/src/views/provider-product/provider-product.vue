<script>
import { formatDate } from '@lib/utils/format-date'
import DataBox from '~/components/data-box'
import DataList from '~/components/data-list'
import DeleteModal from './modals/delete-modal'
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    DataBox,
    DataList,
    DeleteModal,
  },
  props: {
    id: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      loading: false,
      modals: {
        delete: false,
      },
      commands: [
        {
          name: 'editProviderProduct',
          label: 'Edit Provider Product',
        },
        {
          name: 'deleteProviderProduct',
          label: 'Delete Provider Product',
        },
      ]
    }
  },
  computed: {
    ...mapState('providerProduct', ['product']),
    status(){
      return this.product && this.product.availability.enabled ? 'aviable' : 'not aviable'
    },
  },
  created() {
    this.getData()
  },
  methods: {
    ...mapActions('providerProduct', ['getProviderProduct']),
    async getData() {
      this.loading = true
      await this.getProviderProduct()
      this.loading = false
    },
    formatDate(value, format) {
      return formatDate(value, format || 'DD/MM/YYYY')
    },
    onMenuSelect(name) {
      switch (name) {
        case 'editProviderProduct':
          this.$router.push({
            name: 'provider-product-edit',
            params: {
              id: this.id,
            },
          })
          break
        case 'deleteProviderProduct':
          this.modals.delete = true
          break
      }
    },
    onDeleted() {
      this.modals.delete = false
      this.$router.push({
        name: 'provider-products'
      })
    }
  },
}
</script>

<template>
  <main-layout
    :title="'Product Name ' + product.name"
    :loading="loading"
    back
  >
    <el-dropdown
      slot="header"
      trigger="click"
      @command="onMenuSelect"
    >
      <el-button
        :class="$style.button"
        size="small"
      >
        <i
          class="el-icon-more"
          :class="$style.buttonIcon"
        />
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="(command, index) in commands"
          :key="index"
          :command="command.name"
        >
          {{ command.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <data-box
      header="Product"
      :status="status"
    >
      <data-list>
        <dt>Date Created</dt>
        <dd>{{ formatDate(product.created_at, 'DD/MM/YYYY HH:mm') || '-' }}</dd>

        <dt>Product Id</dt>
        <dd>{{ product.id || '-' }}</dd>

        <dt>Contract Id</dt>
        <dd>{{ product.contractId || '-' }}</dd>

        <dt>Supplier Name</dt>
        <dd>{{ product.supplierName || '-' }}</dd>

        <dt>Original Supplier Product</dt>
        <dd>{{ product.original || '-' }}</dd>

        <dt>Product Name</dt>
        <dd>{{ product.name || '-' }}</dd>

        <dt>Description</dt>
        <dd>{{ product.description || '-' }}</dd>

        <dt>Product Aviable</dt>
        <dd>{{ product.availability && product.availability.enabled ? 'Yes' : 'No' || '-' }}</dd>

        <dt>Availability Status</dt>
        <dd>{{ product.availability && product.availability.status || '-' }}</dd>

        <dt>Availability Start Date</dt>
        <dd>{{ formatDate(product.availability && product.availability.start_at) || '-' }}</dd>

        <dt>Availability End Date</dt>
        <dd>{{ formatDate(product.availability && product.availability.end_at) || '-' }}</dd>

        <dt>Image URL/s</dt>
        <dd>{{ product.images.length && product.images.join(', ') || '-' }}</dd>

        <dt>Brand</dt>
        <dd>{{ product.brand || '-' }}</dd>

        <dt>SKU</dt>
        <dd>{{ product.sku || '-' }}</dd>

        <dt>GTIN</dt>
        <dd>{{ product.gtin || '-' }}</dd>

        <dt>Model</dt>
        <dd>{{ product.model || '-' }}</dd>

        <dt>MPN</dt>
        <dd>{{ product.mpn || '-' }}</dd>

        <dt>Categories</dt>
        <dd>{{ product.categories || '-' }}</dd>

        <dt />
        <dd>{{ product.categories || '-' }}</dd>

        <dt />
        <dd>{{ product.categories || '-' }}</dd>

        <dt>Last Updated</dt>
        <dd>{{ formatDate(product.updated_at, 'DD/MM/YYYY HH:mm') || '-' }}</dd>
      </data-list>

      <hr :class="['divider-primary', 'info-block__divider']">

      <h3 :class="$style.header">
        Price
      </h3>
      <data-list>
        <dt>Currency</dt>
        <dd>{{ product.currency || '-' }}</dd>

        <dt>Sales Tax</dt>
        <dd>{{ product.noData || '-' }}</dd>

        <dt>Cost Price</dt>
        <dd>{{ product.noData || '-' }}</dd>

        <dt>Price Before Tax</dt>
        <dd>{{ product.pricing && product.pricing.priceBeforeTax || '-' }}</dd>

        <dt>Price AIer Tax</dt>
        <dd>{{ product.pricing && product.pricing.priceAfterTax || '-' }}</dd>

        <dt>RRP Before Tax</dt>
        <dd>{{ product.noData || '-' }}</dd>

        <dt>RRP AIer Tax</dt>
        <dd>{{ product.noData || '-' }}</dd>
      </data-list>

      <hr :class="['divider-primary', 'info-block__divider']">

      <h3 :class="$style.header">
        Dimensions
      </h3>
      <data-list>
        <dt>Dimensions Unit</dt>
        <dd>{{ product.noData || '-' }}</dd>

        <dt>Length</dt>
        <dd>{{ product.noData || '-' }}</dd>

        <dt>Height</dt>
        <dd>{{ product.noData || '-' }}</dd>

        <dt>Depth</dt>
        <dd>{{ product.noData || '-' }}</dd>

        <dt>Weight Unit</dt>
        <dd>{{ product.noData || '-' }}</dd>

        <dt>Weight</dt>
        <dd>{{ product.noData || '-' }}</dd>
      </data-list>

      <hr :class="['divider-primary', 'info-block__divider']">

      <h3 :class="$style.header">
        Shipping
      </h3>
      <data-list>
        <dt>Shipping Cost Before Tax</dt>
        <dd>{{ product.shipping && product.shipping.shippingPrice || '-' }}</dd>

        <dt>Shipping Cost AIer Tax</dt>
        <dd>{{ product.shipping && product.shipping.shippingPrice || '-' }}</dd>

        <dt>Dimensions Unit</dt>
        <dd>{{ product.noData || '-' }}</dd>

        <dt>Length</dt>
        <dd>{{ product.noData || '-' }}</dd>

        <dt>Height</dt>
        <dd>{{ product.noData || '-' }}</dd>

        <dt>Depth</dt>
        <dd>{{ product.noData || '-' }}</dd>

        <dt>Weight Unit</dt>
        <dd>{{ product.noData || '-' }}</dd>

        <dt>Weight</dt>
        <dd>{{ product.noData || '-' }}</dd>
      </data-list>
    </data-box>

    <delete-modal
      v-if="modals.delete"
      :id="id"
      :visible.sync="modals.delete"
      @close-modal="onDeleted"
    />
  </main-layout>
</template>

<style lang="scss" module>
.button {
  height: 2rem;

  :global {
    .el-icon--right {
      margin-left: 0.6rem;
    }
  }
}

.buttonIcon {
  transform: rotate(90deg);
}

.header {
  margin-bottom: rem(44px);
}

</style>
