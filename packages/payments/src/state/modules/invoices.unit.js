import * as invoicesModule from './invoices'

const requestDetails = {
  module: 'invoices',
  query: '',
}

describe('in a store', () => {
  let store
  beforeEach(() => {
    store = createModuleStore(invoicesModule)
  })

  it('actions.fetchInvoices returns data', async () => {
    await store.dispatch('getData', requestDetails)
    expect(store.state.data.length).toBeGreaterThan(0)
  })
})
