<script>
import feedActivityTable from './feed-activity.table.js'
import ExpandedRow from '@lib/layouts/table/features/expanded-row'
import getExportedFilename from '../../utils/get-exported-filename'

export default {
  name: 'FeedActivity',
  page: {
    title: 'Feed Activity',
  },
  components: {
    ExpandedRow,
  },
  data() {
    return {
      table: feedActivityTable(this),
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
  <main-layout title="Feed Activity">
    <table-layout
      hider
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
              Offers created: {{ row.counts.offers_created }}
            </div>
            <div :class="$style.subrow">
              Offers deleted: {{ row.counts.offers_deleted }}
            </div>
            <div :class="$style.subrow">
              Offers updated: {{ row.counts.offers_updated }}
            </div>
          </div>

          <div slot="expanded-row-cell-2">
            <div :class="$style.subrow">
              Merchants created: {{ row.counts.merchants_created }}
            </div>
            <div :class="$style.subrow">
              Merchants deleted: {{ row.counts.merchants_deleted }}
            </div>
            <div :class="$style.subrow">
              Merchants updated: {{ row.counts.merchants_updated }}
            </div>
          </div>
        </expanded-row>
      </template>
    </table-layout>
  </main-layout>
</template>

<style lang="scss" module>
.subrow {
  margin-bottom: 10px;

  &:last-of-type {
    margin-bottom: 0;
  }
}
</style>
