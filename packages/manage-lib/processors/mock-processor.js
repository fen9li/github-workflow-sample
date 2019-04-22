import StaticProcessor from '~/processors/static-processor'

const jsFileRE = /\.js$/

class MockProcessor extends StaticProcessor {
  constructor(params = {}) {
    const { mockFrom } = params

    if (typeof mockFrom !== 'string') {
      throw Error('mock-processor requires "mockFrom" key')
    }

    super(params)

    this.loadMock(mockFrom)
  }

  loadMock(mockFrom) {
    const mockContext = require.context('../tests/__fixtures__', true, )
    let mockPath = `./${mockFrom}`

    if (!jsFileRE.test(mockPath)) {
      mockPath += '.js'
    }

    const { table } = mockContext(mockPath)

    this.fullData = table
    this.total = table.length
  }

  sendRequest() {
    return Promise.resolve(
      { data: this.fullData, total: this.total }
    )
      .then(res => this.filter(res))
      .then(data => this.sort(data))
      .then(data => this.paginate(data))
  }

  sendRequestAll() {
    return Promise.resolve(
      { data: this.fullData, total: this.total }
    )
      .then(res => this.filter(res))
      .then(data => this.sort(data))
  }
}

export default MockProcessor
