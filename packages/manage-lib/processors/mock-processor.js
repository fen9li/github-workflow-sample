import StaticProcessor from './static-processor'

const jsFileRE = /\.js$/

function loadMock(mockFrom) {
  const mockContext = require.context('@tests/__fixtures__', true, )
  let mockPath = `./${mockFrom}`

  if (!jsFileRE.test(mockPath)) {
    mockPath += '.js'
  }

  const { table } = mockContext(mockPath)

  return {
    data: table,
    total: table.length
  }
}

class MockProcessor extends StaticProcessor {
  constructor(params = {}) {
    const { mockFrom } = params

    if (typeof mockFrom !== 'string') {
      throw Error('mock-processor requires "mockFrom" key')
    }

    // assign 'data' and 'total' fields to the given params
    const mergedParams = Object.assign(params, loadMock(mockFrom))

    super(mergedParams)
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
