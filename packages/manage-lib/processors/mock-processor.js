import StaticProcessor from '@core/static-processor'

class MockProcessor extends StaticProcessor {
  constructor(params = {}) {
    const { mockFrom } = params

    if (typeof mockFrom !== 'string') {
      throw Error('mock-processor requires "mockFrom" key')
    }

    const data = require('@mock-api/resources/' + mockFrom).table

    super({ ...params, data })
  }

  sendRequest() {
    return Promise.resolve(
      { data: this.fullData, total: this.total }
    )
      .then(this.fullProcess)
  }

  sendRequestAll() {
    return Promise.resolve(
      { data: this.fullData, total: this.total }
    )
      .then(this.process)
  }
}

export default MockProcessor
