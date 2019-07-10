import Settlement from './settlement'
import MainLayout from '@lib/layouts/main'
import { Button } from '@lib/node_modules/element-ui'
import transactionsTable from '@tests/__fixtures__/tableDataMock'
import summaryTable from '@tests/__fixtures__/tableDataMock'

jest.mock('./settlement-transactions.table')
jest.mock('./settlement-summary.table')

const localVue = createLocalVue()
localVue.use(Button)

function createWrapper() {
  const wrapper = shallowMount(Settlement, {
    localVue,
    propsData: {
      id: '1',
    },
    stubs: {
      MainLayout,
      TableLayout: true,
    },
    data: function() {
      return {
        settlement: {},
        transactionsTable: transactionsTable(),
        summaryTable: summaryTable(),
      }
    },
    methods: {
      getSettlement: jest.fn(),
    },
  })

  return wrapper
}

describe('packages/payments/src/views/settlement/settlement.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = createWrapper()
  })

  it('exports a valid component', () => {
    expect(Settlement).toBeAComponent()
  })

  it('check that details block component is rendered ', () => {
    const details = wrapper.find('settlement-info-stub')
    expect(details.exists()).toBeTruthy()
  })

  it('check that settlement summary table is rendered', () => {
    const summary = wrapper.find('tablelayout-stub[table-name="settlementSummary"]')
    expect(summary.exists()).toBeTruthy()
  })

  it('check that settlement transactions table is rendered', () => {
    const transactions = wrapper.find('tablelayout-stub[table-name="settlementTransactionLog"]')
    expect(transactions.exists()).toBeTruthy()
  })
})
