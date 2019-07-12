import Subscription from './subscription'
import MainLayout from '@lib/layouts/main'
import { Button, Tabs, TabPane } from '@lib/node_modules/element-ui'
import subscriptionData from '@tests/__fixtures__/subscription'
import customerData from '@tests/__fixtures__/customer'

const localVue = createLocalVue()
localVue.use(Button)
localVue.use(Tabs)
localVue.use(TabPane)

localVue.filter('dollar', v => v)


function createWrapper(route = 'subscription-information') {
  const wrapper = mount(Subscription, {
    localVue,
    propsData: {
      id: '1',
    },
    stubs: {
      MainLayout,
      amountCharge: true,
      subscriptionCancel: true,
      routerView: true,
      routerLink: true,
    },
    mocks: {
      $route: {
        name: route,
      },
      $api: {
        get: jest.fn().mockReturnValue([null, subscriptionData])
      }
    },
    data: function() {
      return {
        subscription: subscriptionData,
        customer: customerData,
      }
    },
  })

  return wrapper
}

describe('packages/payments/src/views/subscription/subscription.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = createWrapper()
  })

  it('exports a valid component', () => {
    expect(Subscription).toBeAComponent()
  })

  it('check that data was requested', () => {
    const request = wrapper.vm.$api.get
    expect(request).toHaveBeenCalledWith(`/subscriptions/${wrapper.vm.id}`)
    expect(request).toHaveBeenCalledWith(`/customers/${wrapper.vm.subscription.customer.id}`)
  })

  it('check that Charge Amount Owing value is rendered', () => {
    const amount = wrapper.find('.balanceCount')
    expect(amount.exists()).toBeTruthy()
    expect(amount.text()).toBe(wrapper.vm.subscription.outstanding.total)
  })

  it('check that Charge Amount Owing button is rendered and opens the modal', () => {
    const chargeBtn = wrapper.find('[data-test="charge"]')
    let changeAmount = wrapper.find('amountcharge-stub')
    expect(changeAmount.exists()).toBeFalsy()
    expect(chargeBtn.exists()).toBeTruthy()
    expect(wrapper.vm.modal.charge).toBeFalsy()

    chargeBtn.trigger('click')

    changeAmount = wrapper.find('amountcharge-stub')
    expect(changeAmount.exists()).toBeTruthy()
  })

  it('check that Cancel Description button not rendered on info tab', () => {
    const cancelBtn = wrapper.find('[data-test="cancel"]')
    expect(wrapper.vm.$route.name).toBe('subscription-information')
    expect(cancelBtn.exists()).toBeFalsy()
  })

  it('check that tabs are rendered', () => {
    const tabs = wrapper.findAll('.el-tabs__item')
    expect(tabs.length).toBe(2)
  })
})

describe('packages/payments/src/views/subscription/subscription.vue', () => {
  let wrapper

  it('check that Cancel Description button is conditionally rendered and opens the modal', () => {
    wrapper = createWrapper('subscription-transactions')
    expect(wrapper.vm.$route.name).toBe('subscription-transactions')

    const cancelBtn = wrapper.find('[data-test="cancel"]')
    let cancelSub = wrapper.find('subscriptioncancel-stub')
    expect(cancelSub.exists()).toBeFalsy()
    expect(cancelBtn.exists()).toBeTruthy()
    expect(wrapper.vm.modal.cancel).toBeFalsy()

    cancelBtn.trigger('click')

    cancelSub = wrapper.find('subscriptioncancel-stub')
    expect(cancelSub.exists()).toBeTruthy()
  })
})
