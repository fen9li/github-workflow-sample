<script>
import table from './log.table'
import getExportedFilename from '@lib/utils/get-exported-filename'
import ExpandedRow from '@lib/layouts/table/features/expanded-row'

export default {
  name: 'Log',
  page: {
    title: 'Log',
  },
  components: {
    ExpandedRow,
  },
  data() {
    return {
      table: table(this)
    }
  },
  methods: {
    getExportedFilename() {
      return getExportedFilename(this.table.tableName)
    }
  }
}
</script>

<template>
  <main-layout title="Log">
    <table-layout
      :table-name="table.tableName"
      :processor="table.processor"
      :filters="table.filters"
      :columns="table.columns"
      :fragments="false"
      :quantity="[25, 50, 100, 200]"
      :export-filename="getExportedFilename"
    >
      <template
        slot="expandedRow"
        slot-scope="{ row, columns }"
      >
        <expanded-row :columns="columns">
          <div slot="expanded-row-cell-1">
            <div :class="$style.subrow">
              Retailer Description
            </div>
            <div :class="$style.subrow">
              Retailer Category
            </div>
          </div>

          <div slot="expanded-row-cell-2">
            <div :class="$style.subrow">
              Boden is a retailer...
            </div>
            <div :class="$style.subrow">
              Fashion
            </div>
          </div>
        </expanded-row>
      </template>
    </table-layout>
  </main-layout>
</template>

<style lang="scss" module>
  .subrow {
    margin-bottom: 15px;

    &:last-of-type {
      margin-bottom: 0;
    }
  }
</style>
