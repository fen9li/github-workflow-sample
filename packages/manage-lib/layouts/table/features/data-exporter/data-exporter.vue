<script>
import FeaturesMixin from '../features.mixin.js'
import exporters from './exporters'

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
        const result = await this.processor.getAllData()
        const blob = await exporter(result, this.columns)

        this.saveFile(blob, type)
        this.loading = false
      } catch (e) {
        this.loading = false
        console.error(`Error while ${type} exporting:`, e)
      }
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
    :title="!fileApiSupported ? 'Not supported by your browser': ''"
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
