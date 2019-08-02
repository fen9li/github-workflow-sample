import ProductAdd from './product-add'
import customerData from '@tests/__fixtures__/customer'
import { Button, Dialog, Form, FormItem, Input } from '@lib/node_modules/element-ui'

const localVue = createLocalVue()
localVue.use(Button)
localVue.use(Dialog)
localVue.use(Form)
localVue.use(FormItem)
localVue.use(Input)

localVue.directive('loading', () => {})

const filledForm = {
  product: 'product1',
  amount: '10.00',
  endpoint: 'method1'
}

function createWrapper() {
  const wrapper = mount(ProductAdd, {
    localVue,
    attrs: {
      visible: true,
    },
    propsData: {
      customer: customerData,
    },
    stubs: ['ElSelect', 'ElOption', 'paymentFormItem'],
    methods: {
      getProducts: jest.fn(),
    }
  })

  return wrapper
}

describe('packages/payments/src/views/customer/product-add.vue', () => {
  let wrapper
  let product
  let amount
  let methods

  beforeEach(() => {
    wrapper = createWrapper()
    product = wrapper.find('elselect-stub')
    amount = wrapper.find('[data-test="amount"]')
    methods = wrapper.find('paymentformitem-stub')
  })

  it('exports a valid component', () => {
    expect(ProductAdd).toBeAComponent()
  })

  it('check that customer field is not editable', () => {
    const customer = wrapper.find('[data-test="customer"]')
    expect(customer.exists()).toBeTruthy()
    expect(customer.attributes('disabled')).toBeTruthy()
  })

  it('check that all form fields are rendered', () => {
    expect(product.exists()).toBeTruthy()
    expect(amount.exists()).toBeTruthy()
    expect(methods.exists()).toBeTruthy()
  })

  it('check that all form fields are binded correctly', () => {
    const form = wrapper.vm.form
    const keys = Object.keys(form)

    for(const key in keys) {
      if(keys.hasOwnProperty(key)) {
        expect(form[keys[key]]).toBe('')
      }
    }

    product.vm.$emit('input', filledForm.product)
    amount.setValue(filledForm.amount)
    methods.vm.$emit('changeMethod', filledForm.endpoint)

    expect(form).toMatchObject(filledForm)
  })

  it('check that click on Save btn submits the form', () => {
    wrapper.setData({
      form: filledForm,
    })
    wrapper.setMethods({
      onSubmit: jest.fn()
    })
    const submit = wrapper.find('[data-test="submit"]')

    submit.trigger('click')

    expect(wrapper.vm.onSubmit).toHaveBeenCalled()
  })
})
