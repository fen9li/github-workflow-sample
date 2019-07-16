import SubscriptionDetails from './subscription-details'
import { Button } from '@lib/node_modules/element-ui'
import subscriptionData from '@tests/__fixtures__/subscription'
import customerData from '@tests/__fixtures__/customer'

const localVue = createLocalVue()
localVue.use(Button)


function createWrapper() {
  const wrapper = mount(SubscriptionDetails, {
    localVue,
    propsData: {
      subscription: subscriptionData,
      customer: customerData,
    },
    methods: {
      formatDate: () => {},
    },
    stubs: {
      AnniversaryEdit: true,
      CouponsEdit: true,
      PaymentEdit: true,
      ProductEdit: true,
      SubscriptionCancel: true,
    },
    mocks: {
      $router: {
        push: jest.fn(),
      },
    },
  })

  return wrapper
}

describe('packages/payments/src/views/subscription/information/blocks/subscription-details.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = createWrapper()
  })

  it('exports a valid component', () => {
    expect(SubscriptionDetails).toBeAComponent()
  })

  it('check that data list is correctly rendered', () => {
    const list = wrapper.find('.datalist')
    const listItems = wrapper.findAll('dt')
    expect(list.exists()).toBeTruthy()
    expect(listItems.length).toBe(10)
  })

  it('check that title is changed depending on prop', () => {
    let title = wrapper.find('.info-block__title')
    expect(wrapper.vm.isTransaction).toBeFalsy()
    expect(title.text()).toBe('General Information')

    wrapper.setProps({
      isTransaction: true,
    })

    title = wrapper.find('.info-block__title')
    expect(title.text()).toBe('Subscription Details')
  })

  it('check that buttons list is changed depending on prop', () => {
    let buttons = wrapper.findAll('.el-button')
    expect(buttons.length).toBe(5)

    wrapper.setProps({
      isTransaction: true,
    })

    buttons = wrapper.findAll('.el-button')
    expect(buttons.length).toBe(1)
  })

  it('check that Edit Anniversary btn opens the modal', () => {
    const anniversaryBtn = wrapper.find('[data-test="anniversary"]')
    let anniversary = wrapper.find('anniversaryedit-stub')
    expect(anniversaryBtn.exists()).toBeTruthy()
    expect(anniversary.exists()).toBeFalsy()
    expect(wrapper.vm.modal.anniversary).toBeFalsy()

    anniversaryBtn.trigger('click')

    anniversary = wrapper.find('anniversaryedit-stub')
    expect(anniversary.exists()).toBeTruthy()
    expect(wrapper.vm.modal.anniversary).toBeTruthy()
  })

  it('check that Add or Remove Coupon btn opens the modal', () => {
    const couponBtn = wrapper.find('[data-test="coupon"]')
    let coupon = wrapper.find('couponsedit-stub')
    expect(couponBtn.exists()).toBeTruthy()
    expect(coupon.exists()).toBeFalsy()
    expect(wrapper.vm.modal.coupon).toBeFalsy()

    couponBtn.trigger('click')

    coupon = wrapper.find('couponsedit-stub')
    expect(coupon.exists()).toBeTruthy()
    expect(wrapper.vm.modal.coupon).toBeTruthy()
  })

  it('check that Change Payment Method btn opens the modal', () => {
    const paymentBtn = wrapper.find('[data-test="payment"]')
    let payment = wrapper.find('paymentedit-stub')
    expect(paymentBtn.exists()).toBeTruthy()
    expect(payment.exists()).toBeFalsy()
    expect(wrapper.vm.modal.payment).toBeFalsy()

    paymentBtn.trigger('click')

    payment = wrapper.find('paymentedit-stub')
    expect(payment.exists()).toBeTruthy()
    expect(wrapper.vm.modal.payment).toBeTruthy()
  })

  it('check that Change Subscription Product btn opens the modal', () => {
    const productBtn = wrapper.find('[data-test="product"]')
    let product = wrapper.find('productdit-stub')
    expect(productBtn.exists()).toBeTruthy()
    expect(product.exists()).toBeFalsy()
    expect(wrapper.vm.modal.product).toBeFalsy()

    productBtn.trigger('click')

    product = wrapper.find('productedit-stub')
    expect(product.exists()).toBeTruthy()
    expect(wrapper.vm.modal.product).toBeTruthy()
  })

  it('check that Cancel Subscription btn opens the modal', () => {
    const cancelBtn = wrapper.find('[data-test="cancel"]')
    let cancel = wrapper.find('subscriptioncancel-stub')
    expect(cancelBtn.exists()).toBeTruthy()
    expect(cancel.exists()).toBeFalsy()
    expect(wrapper.vm.modal.cancel).toBeFalsy()

    cancelBtn.trigger('click')

    cancel = wrapper.find('subscriptioncancel-stub')
    expect(cancel.exists()).toBeTruthy()
    expect(wrapper.vm.modal.cancel).toBeTruthy()
  })

  it('check that View Details directs to Subscription Details view', () => {
    wrapper.setProps({
      isTransaction: true,
    })

    const details = wrapper.find('[data-test="details"]')

    details.trigger('click')

    expect(wrapper.vm.$router.push).toHaveBeenCalledWith(
      {
        name: 'subscription-details',
        params: {
          id: wrapper.vm.subscription.id,
        },
      })
  })
})
