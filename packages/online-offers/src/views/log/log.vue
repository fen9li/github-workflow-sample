<script>
import statusTable from './log.table.js'
import ExpandedRow from '@lib/layouts/table/features/expanded-row'
import getExportedFilename from '../../utils/get-exported-filename'

export default {
  name: 'Log',
  components: {
    ExpandedRow,
  },
  page: {
    title: 'Log',
  },
  data() {
    return {
      table: statusTable(this),
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
          <div
            slot="expanded-row-cell-1"
            :class="$style.infoCaption"
          >
            <div>
              Retailer description
            </div>
            <div>
              Retailer category
            </div>
          </div>
          <div
            slot="expanded-row-cell-2"
            :class="$style.infoValue"
          >
            <div>
              Well-made individual clothing for man women & children too.
            </div>
            <div>
              Fashion
            </div>
          </div>
        </expanded-row>
      </template>
    </table-layout>
  </main-layout>
</template>

<style lang="scss" module>
  .infoCaption {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    font-weight: bold;

    div {
      margin: 5px 0;
    }
  }

  .infoValue {
    display: flex;
    flex-direction: column;
    justify-content: center;

    div {
      position: relative;
      z-index: 100;
      margin: 5px 0;
      overflow: visible;
      word-wrap: normal;
      white-space: nowrap;
    }
  }
</style>
