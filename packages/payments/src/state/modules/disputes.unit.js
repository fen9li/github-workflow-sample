import * as disputesModule from './disputes'

describe('in a store', () => {
  let store
  beforeEach(() => {
    store = createModuleStore(disputesModule)
  })

  it('actions.fetchDisputes returns data', async () => {
    await store.dispatch('getData')
    expect(store.state.data.length).toBeGreaterThan(0)
  })
})
