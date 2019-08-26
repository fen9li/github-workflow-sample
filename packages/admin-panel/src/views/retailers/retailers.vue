<script>
import ApiProcessor from '@lib/processors/mock-processor'
import tableConfiguration from './retailers.table'
import { table as mocks } from '@fixtures/retailers'

export default {
  name: 'Retailers',
  page: {
    title: 'Retailers',
  },
  computed: {
    table: function() {
      return {
        ...tableConfiguration,
        processor: new ApiProcessor({
          component: this,
          mocks,
        })
      }
    },
  },
  created: function() {
    this.table.processor.sendRequest()
  },
}
</script>

<template>
  <table-layout
    :processor="table.processor"
    :filters="table.filters"
    :columns="table.columns"
    :fragments="false"
    :hider="false"
    :quantity="[25, 50, 100, 200]"
  >
    <el-table-column
      v-if="table.processor.data.length"
      type="selection"
      fixed="left"
      width="55"
    />
    <div v-else />
  </table-layout>
</template>

<style lang="scss" module>
  .backButton {
    position: absolute;
    left: 0;
    padding: 0.2rem !important;
    border-color: var(--color-primary);
    border-width: 2px;

    i {
      font-size: 1.2rem;
      font-weight: bold;
      color: var(--color-primary);
    }
  }

  .card {
    width: 100%;
    margin: 0 0 1.25rem;
  }
  .table {
    padding: 0;
    margin-bottom: rem(16px);
    border: none;
    box-shadow: none !important;
  }

  .tabs {
    :global {
      .el-tabs__header {
        padding: 0 var(--size-card-spacing) calc(var(--size-card-spacing) / 2);
      }
    }
  }
</style>
