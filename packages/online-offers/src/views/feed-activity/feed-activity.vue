<script>
import statusTable from './feed-activity.table.js'
import ExpandedRow from '@lib/layouts/table/features/expanded-row'

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
      table: statusTable(this),
    }
  },
}
</script>

<template>
  <main-layout title="Activity">
    <table-layout
      hider
      table-name="feed-activity"
      :processor="table.processor"
      :filters="table.filters"
      :columns="table.columns"
      :fragments="false"
      :quantity="false"
    >
      <template
        slot="expandedRow"
        slot-scope="{ row, columns }"
      >
        <expanded-row :columns="columns">
          <div slot="expanded-row-cell-1">
            <div> Offers created: {{ row.counts.offers_created }} </div>
            <div> Offers deleted: {{ row.counts.offers_deleted }} </div>
            <div> Offers updated: {{ row.counts.offers_updated }} </div>
          </div>

          <div slot="expanded-row-cell-2">
            <div> Merchants created: {{ row.counts.merchants_created }} </div>
            <div> Merchants deleted: {{ row.counts.merchants_deleted }} </div>
            <div> Merchants updated: {{ row.counts.merchants_updated }} </div>
          </div>
        </expanded-row>
      </template>
    </table-layout>
  </main-layout>
</template>
