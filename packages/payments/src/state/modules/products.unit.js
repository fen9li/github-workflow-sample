import * as productsModule from './products'

describe('in a store', () => {
  let store
  beforeEach(() => {
    store = createModuleStore(productsModule)
  })

  it('actions.fetchProducts returns data', async () => {
    await store.dispatch('getData')
    expect(store.state.data.length).toBeGreaterThan(0)
  })
})
