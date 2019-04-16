import DataProcessor from '@core/data-processor'

class StaticProcessor extends DataProcessor {
  constructor(params = {}) {
    super(params)
    this.data = params.data || []
    this.total = this.data.length
    this.loading = false

    this.init()
  }

  sendRequest() {
    return {
      data: this.data,
      total: this.total,
    }
  }
}

export default StaticProcessor
