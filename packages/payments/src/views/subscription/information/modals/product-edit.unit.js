import ProductEdit from './product-edit'
import subscriptionData from '@tests/__fixtures__/subscription'
import { Button, Dialog, Form, FormItem, Input } from '@lib/node_modules/element-ui'
import { nextDay } from '@lib/utils/date-helper'

const localVue = createLocalVue()
localVue.use(Button)
localVue.use(Dialog)
localVue.use(Form)
localVue.use(FormItem)
localVue.use(Input)

localVue.directive('loading', () => {})

function createWrapper() {
  const wrapper = mount(ProductEdit, {
    localVue,
    attrs: {
      visible: true,
    },
    propsData: {
      subscription: subscriptionData,
      customerName: 'Test Name',
    },
    stubs: {
      ElSelect: true,
      ElOption: true,
    },
    methods: {
      getAllProducts: jest.fn(),
    },
    mocks: {
      $api: {
        put: jest.fn(),
      },
    },
  })

  return wrapper
}

describe('packages/payments/src/views/subscription/information/modals/product-edit', () => {
  let wrapper
  let submit
  let form

  beforeEach(() => {
    wrapper = createWrapper()
    form = wrapper.vm.form
    submit = wrapper.find('[data-test="submit"]')
  })

  it('exports a valid component', () => {
    expect(ProductEdit).toBeAComponent()
  })

  it('check that note is rendered', () => {
    const note = wrapper.find('.modal-note__text')
    expect(note.exists()).toBeTruthy()
    expect(note.text()).toBe('Editing the Subscription Product pr Pricing Plan may cause changes to payment dates, billing frequencies, and the subscription balance.')
  })

  it('check that customer field is not editable', () => {
    const customer = wrapper.find('[data-test="customer"]')
    expect(customer.exists()).toBeTruthy()
    expect(customer.attributes('disabled')).toBeTruthy()
  })
  it('check that subscription product and frequency selects are rendered', () => {
    const selects = wrapper.findAll('elselect-stub')
    expect(selects.length).toBe(2)
  })

  it('check that click on Save submits the form', () => {
    wrapper.setMethods({
      onSubmit: jest.fn(),
    })

    submit.trigger('click')

    expect(wrapper.vm.onSubmit).toHaveBeenCalled()
  })

  it('check that current product and frequency are selected by default', () => {
    const { subscription } = wrapper.vm
    expect(form.frequency).toBe(subscription.current_frequency.frequency)
    expect(form.product).toBe(subscription.current_product.id)
  })

  it('check that api method is correctly called', () => {
    wrapper.setData({
      form: {
        frequency: 'P1M',
        product: 'PRODUCT_666',
      },
    })
    wrapper.vm.onSubmit()

    expect(wrapper.vm.$api.put).toBeCalledWith(`/subscriptions/${wrapper.vm.subscription.id}/upgrade`,
      {
        frequency: form.frequency,
        product: {
          id: form.product,
        },
        start_at: nextDay(),
      })
  })
})
