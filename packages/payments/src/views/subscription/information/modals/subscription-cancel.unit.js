import SubscriptionCancel from './subscription-cancel'
import subscriptionData from '@tests/__fixtures__/subscription'
import customerData from '@tests/__fixtures__/customer'

import { Button, Dialog, Form, FormItem, Input, RadioGroup, Radio, Checkbox, DatePicker } from '@lib/node_modules/element-ui'

const localVue = createLocalVue()
localVue.use(Button)
localVue.use(Dialog)
localVue.use(Form)
localVue.use(FormItem)
localVue.use(Input)
localVue.use(RadioGroup)
localVue.use(Radio)
localVue.use(Checkbox)
localVue.use(DatePicker)

localVue.directive('loading', () => {})

function createWrapper() {
  const wrapper = mount(SubscriptionCancel, {
    localVue,
    attrs: {
      visible: true,
    },
    propsData: {
      subscription: subscriptionData,
      paymentMethods: customerData.paymentMethods,
    },
    stubs: {
      paymentFormItem: true,
      ElSelect: true,
      ElOption: true,
    },
    methods: {
    },
    mocks: {
      $api: {
        delete: jest.fn(),
      },
    },
  })

  return wrapper
}

describe('packages/payments/src/views/subscription/information/modals/product-edit', () => {
  let wrapper
  let submit
  let refund
  let radios

  beforeEach(() => {
    wrapper = createWrapper()
    refund = wrapper.find('[data-test="refund"]')
    submit = wrapper.find('[data-test="submit"]')
    radios = wrapper.findAll('.el-radio')
  })

  it('exports a valid component', () => {
    expect(SubscriptionCancel).toBeAComponent()
  })


  it('check that cancellation type (radios) are all rendered', () => {
    expect(radios.length).toBe(3)
  })

  it('check that refund checkbox is rendered if radio is "immediately" or "specific date" ', () => {
    expect(wrapper.vm.type).toBe('now')
    expect(refund.exists()).toBeTruthy()

    radios.at(2).trigger('click')
    expect(wrapper.vm.type).toBe('specific')
    expect(refund.exists()).toBeTruthy()

    radios.at(1).trigger('click')
    expect(wrapper.vm.type).toBe('after')
    expect(refund.exists()).toBeFalsy()
  })

  it('check that datepicker is rendered only type is "specific date" ', () => {
    let datepicker = wrapper.find('[data-test="datepicker"]')

    expect(wrapper.vm.type).toBe('now')
    expect(datepicker.exists()).toBeFalsy()

    radios.at(2).trigger('click')
    expect(wrapper.vm.type).toBe('specific')

    datepicker = wrapper.find('[data-test="datepicker"]')
    expect(datepicker.exists()).toBeTruthy()

    radios.at(1).trigger('click')
    expect(wrapper.vm.type).toBe('after')
    expect(datepicker.exists()).toBeFalsy()
  })

  it('check that refund checkbox switches form and amount fields visibility ', () => {
    let amount = wrapper.find('[data-test="amount"]')
    let paymentForm = wrapper.find('paymentformitem-stub')

    expect(wrapper.vm.refund).toBeTruthy()
    expect(amount.exists()).toBeTruthy()
    expect(paymentForm.exists()).toBeTruthy()

    wrapper.setData({
      refund: false,
    })

    amount = wrapper.find('[data-test="amount"]')
    paymentForm = wrapper.find('paymentformitem-stub')

    expect(amount.exists()).toBeFalsy()
    expect(paymentForm.exists()).toBeFalsy()
  })

  it('check that payment form item is binded to form', () => {
    const paymentForm = wrapper.find('paymentformitem-stub')

    expect(wrapper.vm.form.selectedMethod).toBe('4916007832222')

    paymentForm.vm.$emit('changeMethod', '4916007831111')

    expect(wrapper.vm.form.selectedMethod).toBe('4916007831111')
  })

  it('check that click on Set Cancellation submits the form', () => {
    wrapper.setMethods({
      onSubmit: jest.fn(),
    })

    submit.trigger('click')

    expect(wrapper.vm.onSubmit).toHaveBeenCalled()
  })

  it('check that api method is called correctly', () => {
    wrapper.setData({
      refund: false,
    })
    wrapper.vm.onSubmit()

    expect(wrapper.vm.$api.delete).toHaveBeenCalledWith(`/subscriptions/${wrapper.vm.subscription.id}`)
    // TODO: Improve the test with cancellation type and refund options in api method call (after backend implements that
  })
})
