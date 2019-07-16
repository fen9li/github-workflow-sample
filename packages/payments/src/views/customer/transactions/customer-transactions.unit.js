import CustomerTransactions from './customer-transactions'
import table from '@tests/__fixtures__/tableDataMock'

jest.mock('./transactions-table')

const localVue = createLocalVue()

function createWrapper() {
  const wrapper = mount(CustomerTransactions, {
    localVue,
    propsData: {
      id: '1'
    },
    stubs: {
      TableLayout: true,
    },
    mocks: {
      $router: {
        push: jest.fn()
      }
    },
    data: function() {
      return {
        table: table(),
      }
    },
  })

  return wrapper
}

describe('packages/payments/src/views/customer/transactions/customer-transactions.vue', () => {
  let wrapper
  let table

  beforeEach(() => {
    wrapper = createWrapper()
    table = wrapper.find('tablelayout-stub[table-name="customerTransactions"]')
  })

  it('exports a valid component', () => {
    expect(CustomerTransactions).toBeAComponent()
  })

  it('check that customer transactions table is rendered', () => {
    expect(table.exists()).toBeTruthy()
  })

  it('check that click on row directs to details page', () => {
    const testId = 'testId'

    table.vm.$emit('row-click', { id: testId })

    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'transaction-details', params: { id: testId }
    })
  })

})
