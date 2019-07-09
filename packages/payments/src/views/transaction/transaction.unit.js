import Transaction from './transaction'
import MainLayout from '@lib/layouts/main'
import { Card, Button } from '@lib/node_modules/element-ui'
import transactionData from '@tests/__fixtures__/transaction'
import subscriptionData from '@tests/__fixtures__/subscription'

const localVue = createLocalVue()
localVue.use(Card)
localVue.use(Button)

localVue.directive('loading', () => {})

function createWrapper() {
  const wrapper = shallowMount(Transaction, {
    localVue,
    propsData: {
      id: '1',
    },
    stubs: {
      mainLayout: MainLayout,
    },
    mocks: {
    },
    methods: {
      getTransactionDetails: jest.fn().mockResolvedValue(Promise.resolve('done')),
      formatDate: () => '',
    },
  })

  return wrapper
}

describe('packages/payments/src/views/transaction/transaction.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = createWrapper()
    wrapper.setData({
      transaction: transactionData,
      subscription: subscriptionData,
      ready: true,
      loading: false,
    })
  })

  it('exports a valid component', () => {
    expect(Transaction).toBeAComponent()
  })

  it('check that General info block is rendered', () => {
    const general = wrapper.find('.info-block')
    const list = wrapper.find('.datalist')
    const listItems = wrapper.findAll('dd')
    expect(general.exists()).toBeTruthy()
    expect(list.exists()).toBeTruthy()
    expect(listItems.length).toBe(7)
  })

  it('check that transaction status is calculated correctly', () => {
    const header = wrapper.find('.headerData')
    const status = wrapper.find('.headerStatus')
    expect(status.exists()).toBeTruthy()
    expect(wrapper.vm.transaction.status).toBe(1)
    expect(status.text()).toBe('Pending')
    expect(status.contains('.el-icon-time')).toBeTruthy()
    expect(header.attributes('style')).toBe('color: rgb(251, 178, 65);')

    wrapper.setData({
      transaction: {
        status: 3,
      },
    })

    expect(status.text()).toBe('Failed')
    expect(status.contains('.el-icon-close')).toBeTruthy()
    expect(header.attributes('style')).toBe('color: rgb(255, 0, 0);')

    wrapper.setData({
      transaction: {
        status: 4,
      },
    })

    expect(status.text()).toBe('Successful')
    expect(status.contains('.el-icon-check')).toBeTruthy()
    expect(header.attributes('style')).toBe('color: rgb(41, 215, 55);')
  })

  it('check that customer details block is rendered', () => {
    const customerDetails = wrapper.find('customer-details-stub')
    expect(customerDetails.exists()).toBeTruthy()
    expect(customerDetails.vm.customer).toMatchObject(wrapper.vm.transaction.order.customer)
  })

  it('check that subscription details block is rendered if applicable', () => {
    const subscriptionDetails = wrapper.find('subscription-details-stub')
    expect(wrapper.vm.transaction.order.subscription).toBeTruthy()
    expect(subscriptionDetails.exists()).toBeTruthy()
    expect(subscriptionDetails.vm.subscription).toMatchObject(wrapper.vm.transaction.order.subscription)
    expect(subscriptionDetails.vm.isTransaction).toBeTruthy()

    wrapper.setData({
      transaction: {
        order: {
          subscription: null,
        },
      },
    })

    expect(subscriptionDetails.exists()).toBeFalsy()
  })

  it('check that payment details block is rendered', () => {
    const paymentDetails = wrapper.find('payment-details-stub')
    expect(paymentDetails.exists()).toBeTruthy()
    expect(paymentDetails.vm.customer).toMatchObject(wrapper.vm.transaction.order.customer)
  })

  it('check that refund btn is rendered for successful transaction', () => {
    let refundBtn = wrapper.find('.wide-button')
    expect(wrapper.vm.transaction.status).toBe(1)
    expect(refundBtn.exists()).toBeFalsy()

    wrapper.setData({
      transaction: {
        status: 3,
      },
    })

    expect(refundBtn.exists()).toBeFalsy()

    wrapper.setData({
      transaction: {
        status: 4,
      },
    })

    refundBtn = wrapper.find('.wide-button')
    expect(refundBtn.exists()).toBeTruthy()
  })
})
