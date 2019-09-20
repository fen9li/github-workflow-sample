<script>
import { formatDate } from '@lib/utils/format-date'
import DataBox from '@lib/components/data-box'
import DataList from '@lib/components/data-list'

export default {
  name: 'SupplierInformationTab',
  components: {
    DataBox,
    DataList,
  },
  props: {
    supplier: {
      type: Object,
      required: true,
    },
    loading: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    status() {
      return this.supplier.active ? 'active' : 'inactive'
    },
  },
  methods: {
    formatDate(value, format) {
      return formatDate(value, format || 'DD/MM/YYYY hh:mm A')
    },
  },
}
</script>

<template>
  <div>
    <data-box
      v-if="!loading"
      header="Supplier Details"
      :status="status"
    >
      <data-list>
        <dt>Date Created</dt>
        <dd>{{ formatDate(supplier.created_at) }}</dd>

        <dt>Supplier ID</dt>
        <dd>{{ supplier.id }}</dd>

        <dt>Supplier Name</dt>
        <dd>{{ supplier.name }}</dd>

        <dt>Default Currency</dt>
        <dd>{{ supplier.currency }}</dd>

        <dt>Last Updated</dt>
        <dd>{{ formatDate(supplier.updated_at) }}</dd>
      </data-list>
    </data-box>
  </div>
</template>

