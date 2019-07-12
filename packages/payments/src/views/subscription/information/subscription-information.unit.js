import SubscriptionInfo from './subscription-information'
import { Button, Card } from '@lib/node_modules/element-ui'
import subscriptionData from '@tests/__fixtures__/subscription'
import customerData from '@tests/__fixtures__/customer'

const localVue = createLocalVue()
localVue.use(Button)
localVue.use(Card)


function createWrapper() {
  const wrapper = mount(SubscriptionInfo, {
    localVue,
    propsData: {
      id: '1',
      subscription: subscriptionData,
      customer: customerData,
    },
    stubs: {
      CustomerDetails: true,
      PaymentDetails: true,
      SubscriptionDetails: true,
    },
  })

  return wrapper
}

describe('packages/payments/src/views/subscription/information/subscription-information.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = createWrapper()
  })

  it('exports a valid component', () => {
    expect(SubscriptionInfo).toBeAComponent()
  })

  it('check that subscription details block is rendered', () => {
    const subscription = wrapper.find('subscriptiondetails-stub')
    expect(subscription.exists()).toBeTruthy()
  })

  it('check that customer details block is rendered', () => {
    const customer = wrapper.find('customerdetails-stub')
    expect(customer.exists()).toBeTruthy()
  })

  it('check that payment details block is rendered', () => {
    const payment = wrapper.find('paymentdetails-stub')
    expect(payment.exists()).toBeTruthy()
  })
})
