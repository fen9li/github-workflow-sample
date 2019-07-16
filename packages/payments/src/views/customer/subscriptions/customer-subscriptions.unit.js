import CustomerSubscriptions from './customer-subscriptions'
import table from '@tests/__fixtures__/tableDataMock'

jest.mock('./subscriptions-table')

const localVue = createLocalVue()

function createWrapper() {
  const wrapper = mount(CustomerSubscriptions, {
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

describe('packages/payments/src/views/customer/subscriptions/customer-subscriptions.vue', () => {
  let wrapper
  let table

  beforeEach(() => {
    wrapper = createWrapper()
    table = wrapper.find('tablelayout-stub[table-name="customerSubscriptions"]')
  })

  it('exports a valid component', () => {
    expect(CustomerSubscriptions).toBeAComponent()
  })

  it('check that customer subscriptions table is rendered', () => {
    expect(table.exists()).toBeTruthy()
  })

  it('check that click on row directs to details page', () => {
    const testId = 'testId'

    table.vm.$emit('row-click', { id: testId })

    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'subscription-details', params: { id: testId }
    })
  })

})
