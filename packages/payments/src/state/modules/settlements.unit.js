import * as settlementsModule from './settlements'

describe('in a store', () => {
  let store
  beforeEach(() => {
    store = createModuleStore(settlementsModule)
  })

  it.skip('actions.fetchSettlements returns data', async () => {
    await store.dispatch('getData')
    expect(store.state.data.length).toBeGreaterThan(0)
  })
})
