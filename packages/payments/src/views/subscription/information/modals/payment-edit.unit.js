import PaymentEdit from './payment-edit'
import customerData from '@tests/__fixtures__/customer'
import { Button, Dialog, Form, FormItem, Input } from '@lib/node_modules/element-ui'

const localVue = createLocalVue()
localVue.use(Button)
localVue.use(Dialog)
localVue.use(Form)
localVue.use(FormItem)
localVue.use(Input)


function createWrapper() {
  const wrapper = mount(PaymentEdit, {
    localVue,
    attrs: {
      visible: true,
    },
    propsData: {
      customer: customerData,
    },
    stubs: {
      paymentFormItem: true,
    },
  })

  return wrapper
}

describe('packages/payments/src/views/subscription/information/modals/payment-edit.vue', () => {
  let wrapper
  let methods

  beforeEach(() => {
    wrapper = createWrapper()
    methods = wrapper.vm.customer.payment_sources
  })

  it('exports a valid component', () => {
    expect(PaymentEdit).toBeAComponent()
  })

  it('check that customer is not editable', () => {
    const customer = wrapper.find('[data-test="customer"]')
    expect(customer.exists()).toBeTruthy()
    expect(customer.attributes('disabled')).toBeTruthy()
  })

  it('check that 1st payment method is selected by default', () => {
    expect(methods.length).toBe(2)
    expect(methods[0].value).toBe('4916007832222')
    expect(wrapper.vm.form.selectedMethod).toBe(methods[0].value)
  })

  it('check that new payment form item is rendered and binded to form', () => {
    const paymentFormItem = wrapper.find('paymentformitem-stub')

    expect(paymentFormItem.exists).toBeTruthy()
    expect(wrapper.vm.form.selectedMethod).toBe('4916007832222')

    paymentFormItem.vm.$emit('changeMethod', '4916007831111')

    expect(wrapper.vm.form.selectedMethod).toBe('4916007831111')
  })

  it('check that Save btn is rendered and submits the form', () => {
    const submit = wrapper.find('[data-test="submit"]')
    wrapper.setMethods({
      onSubmit: jest.fn(),
    })

    submit.trigger('click')

    expect(wrapper.vm.onSubmit).toHaveBeenCalled()
    // TODO: Update method call after backend finishes task
  })
})
