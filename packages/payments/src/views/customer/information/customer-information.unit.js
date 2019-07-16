import CustomerInformation from './customer-information'
import customerData from '@tests/__fixtures__/customer'
import { Card } from '@lib/node_modules/element-ui'

const localVue = createLocalVue()

localVue.use(Card)

localVue.directive('loading', () => {})

function createWrapper() {
  const wrapper = mount(CustomerInformation, {
    localVue,
    stubs: {
      PaymentMethods: true,
      CustomerDetails: true,
    },
    propsData: {
      customer: customerData,
      loading: false,
      id: '1'
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
    expect(CustomerInformation).toBeAComponent()
  })

  it('check that customer details block is rendered', () => {
    const details = wrapper.find('customerdetails-stub')
    expect(details.exists()).toBeTruthy()
  })

  it('check that paymentMethods block is rendered', () => {
    const methods = wrapper.find('paymentmethods-stub')
    expect(methods.exists()).toBeTruthy()
  })
})
