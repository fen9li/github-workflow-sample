import SubscriptionTransactions from './subscription-transactions'
import MainLayout from '@lib/layouts/main'
import { Button } from '@lib/node_modules/element-ui'
import tableConfig from '@tests/__fixtures__/tableDataMock'

jest.mock('./transactions-table')

const localVue = createLocalVue()
localVue.use(Button)

function createWrapper() {
  const wrapper = mount(SubscriptionTransactions, {
    localVue,
    stubs: {
      MainLayout,
      TableLayout: true,
    },
    propsData: {
      id: '1',
    },
    data: function() {
      return {
        tableConfig: tableConfig(),
      }
    },
  })

  return wrapper
}

describe('packages/payments/src/views/subscription/transactions/subscription-transactions.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = createWrapper()
  })

  it('exports a valid component', () => {
    expect(SubscriptionTransactions).toBeAComponent()
  })

  it('check that subscription transactions table is rendered', () => {
    const transactions = wrapper.find('tablelayout-stub[table-name="subscriptionTransactions"]')
    expect(transactions.exists()).toBeTruthy()
  })
})
