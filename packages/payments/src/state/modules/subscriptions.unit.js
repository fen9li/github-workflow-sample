import * as subscriptionsModule from './subscriptions'

describe('in a store', () => {
  let store
  beforeEach(() => {
    store = createModuleStore(subscriptionsModule)
  })

  it.skip('actions.fetchSubscriptions returns data', async () => {
    await store.dispatch('getData')
    expect(store.state.data.length).toBeGreaterThan(0)
  })
})
