import CustomerSubscriptionAdd from './customer-subscription-add'
import customerData from '@tests/__fixtures__/customer'
import { Button, Dialog, Form, FormItem, Input, DatePicker } from '@lib/node_modules/element-ui'

const localVue = createLocalVue()
localVue.use(Button)
localVue.use(Dialog)
localVue.use(Form)
localVue.use(FormItem)
localVue.use(Input)
localVue.use(DatePicker)

localVue.directive('loading', () => {})

const filledForm = {
  start_at: 'Fri Jul 19 2019 00:00:00',
  end_at: 'Fri Jul 19 2019 00:00:00',
  product: 'product1',
  frequency: 'P1M',
  coupon: 'coupon1',
  payment_source: 'method1'
}

function createWrapper() {
  const wrapper = mount(CustomerSubscriptionAdd, {
    localVue,
    attrs: {
      visible: true,
    },
    propsData: {
      customer: customerData,
    },
    stubs: ['ElSelect', 'ElOption', 'paymentFormItem'],
    mocks: {
      $api: {
        post: jest.fn().mockReturnValue([ null, 'done' ]),
      },
      $notify: jest.fn(),
    },
    methods: {
      getProductsCoupons: jest.fn(),
    }
  })

  return wrapper
}

describe('packages/payments/src/views/customer/subscriptions/customer-subscription-add.vue', () => {
  let wrapper
  let pickers
  let selects
  let methods

  beforeEach(() => {
    wrapper = createWrapper()
    pickers = wrapper.findAll('.el-date-editor')
    selects = wrapper.findAll('elselect-stub')
    methods = wrapper.find('paymentformitem-stub')
  })

  it('exports a valid component', () => {
    expect(CustomerSubscriptionAdd).toBeAComponent()
  })

  it('check that customer field is not editable', () => {
    const customer = wrapper.find('[data-test="customer"]')
    expect(customer.exists()).toBeTruthy()
    expect(customer.attributes('disabled')).toBeTruthy()
  })

  it('check that all form fields are rendered', () => {
    expect(pickers.length).toBe(2)
    expect(selects.length).toBe(3)
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

    pickers.at(0).vm.$emit('input', filledForm.start_at)
    pickers.at(1).vm.$emit('input', filledForm.end_at)
    selects.at(0).vm.$emit('input', filledForm.product)
    selects.at(1).vm.$emit('input', filledForm.frequency)
    selects.at(2).vm.$emit('input', filledForm.coupon)
    methods.vm.$emit('changeMethod', filledForm.endpoint)

    expect(form).toMatchObject(filledForm)
  })

  it('check that click on Save btn submits the form', () => {
    wrapper.setData({
      form: filledForm,
    })
    const submit = wrapper.find('[data-test="submit"]')

    submit.trigger('click')

    const requestData = { ...filledForm, product: { id: filledForm.product } }

    expect(wrapper.vm.$api.post).toHaveBeenCalledWith(`/customers/${wrapper.vm.customer.id}/subscriptions`, requestData)
  })
})
