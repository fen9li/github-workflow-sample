import CustomerDetails from './customer-details'
import customerData from '@tests/__fixtures__/customer'

const localVue = createLocalVue()
localVue.filter('dateTime', v => v)

function createWrapper() {
  const wrapper = mount(CustomerDetails, {
    localVue,
    propsData: {
      customer: customerData,
      loading: false,
    },
  })

  return wrapper
}

describe('packages/payments/src/views/customer/information/customer-details.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = createWrapper()
  })

  it('exports a valid component', () => {
    expect(CustomerDetails).toBeAComponent()
  })

  it('check that data list is correctly rendered', () => {
    const list = wrapper.find('.datalist')
    const listItems = wrapper.findAll('dt')
    expect(list.exists()).toBeTruthy()
    expect(listItems.length).toBe(7)
  })
})
