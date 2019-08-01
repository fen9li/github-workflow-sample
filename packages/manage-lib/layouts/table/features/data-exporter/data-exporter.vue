<script>
import FeaturesMixin from '../features.mixin.js'
import exporters from './exporters'
import {
  getFormattedValue,
  getCellData,
} from '@lib/components/data-table/cells/utils.js'
import { getReadyColumns } from '@lib/components/data-table/data-table.vue'

export default {
  name: 'DataExporter',
  mixins: [FeaturesMixin],
  data() {
    return {
      loading: false,
      fileApiSupported: 'FileReader' in window,
    }
  },
  methods: {
    async onExportClick(type) {
      const exporter = exporters[type]

      this.loading = true

      try {
        const response = await this.processor.getAllData()
        const { data, columnLabels } = await this.prepareDataForExporter(
          response,
          this.columns
        )
        const blob = await exporter(data, columnLabels)

        this.saveFile(blob, type)
        this.loading = false
      } catch (e) {
        this.loading = false
        console.error(`Error while ${type} exporting:`, e)
      }
    },
    async prepareDataForExporter(response, columns) {
      const { dataQuery } = this.processor
      const { data } = response
      const dataLength = data.length
      const visibleColumns = getReadyColumns(dataQuery, columns).filter(
        rc => rc.name
      )
      const visibleColumnsLength = visibleColumns.length
      const preparedData = Array(dataLength)
      const columnLabels = []

      // fill preparedData with empty objects
      for (let j = 0; j < dataLength; j++) {
        preparedData[j] = {}
      }

      // here we emulate behavior of cell-wrap component
      // it's like virtual rendering of every cell of every row
      for (let i = 0; i < visibleColumnsLength; i++) {
        const column = visibleColumns[i]
        const columnName = column.name
        const columnLabel = column.label

        columnLabels.push(columnLabel)

        for (let k = 0; k < dataLength; k++) {
          const row = data[k]
          const cell = { row }
          const cellData = getCellData(columnName, cell, column)
          const formattedValue = getFormattedValue(
            columnName,
            cell,
            cellData,
            column
          )

          preparedData[k][columnLabel] = formattedValue
        }
      }

      return { data: preparedData, columnLabels }
    },
    saveFile(blob, type) {
      let reader = new FileReader()

      reader.onload = () => {
        let link = document.createElement('a')

        link.download = `exported.${type}`
        link.target = '_blank'
        link.href = reader.result

        link.click()

        reader = link = blob = null
      }

      reader.readAsDataURL(blob)
    },
  },
}
</script>

<template>
  <el-button
    size="small"
    type="primary"
    :class="$style.button"
    :disabled="!fileApiSupported"
    :loading="loading"
    :title="!fileApiSupported ? 'Not supported by your browser' : ''"
    @click="onExportClick('csv')"
  >
    Export CSV
  </el-button>
</template>

<style lang="scss" module>
.button {
  margin-left: 1rem;
}
</style>
