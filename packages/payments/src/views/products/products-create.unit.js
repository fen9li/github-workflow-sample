import ProductsCreate from './products-create'
import { Button, Radio, RadioGroup, Dialog } from '@lib/node_modules/element-ui'

const localVue = createLocalVue()
localVue.use(Button)
localVue.use(Radio)
localVue.use(RadioGroup)
localVue.use(Dialog)

function createWrapper() {
  const wrapper = mount(ProductsCreate, {
    localVue,
    attrs: {
      visible: true,
    },
    methods: {
      validateAll: jest.fn().mockReturnValue([])
    },
    mocks: {
      $api: {
        post: jest.fn().mockReturnValue([null, 'done'])
      },
      $notify: jest.fn()
    },
    stubs: ['ProductsSubscriptionForm', 'ProductsSingleForm'],
  })

  return wrapper
}

const emptyForm = {
  name: null,
  id: null,
  billing_type: 'anniversary',
  start_at: null,
  end_at: null,
  anchor_at: null,
  sunset_at: null,
  price: {
    total: null,currency: 'aud'
  }
}

const filledForm = {
  single: {
    name: 'single-name',
    id: 'single-id',
    start_at: '2020-01-01',
    end_at: '2020-02-02',
    price: {
      total: '11.11',
      currency: 'aud'
    }
  },
  subscription: {
    name: 'subscription-name',
    id: 'subscription-id',
    billing_type: 'prorata',
    anchor_at: '2020-01-01',
    sunset_at: '2020-02-02',
  }
}


describe('packages/payments/src/views/products/products-create.vue', () => {
  let wrapper
  let radios
  let subscriptionForm
  let singleForm

  beforeEach(() => {
    wrapper = createWrapper()
    radios = wrapper.findAll('.el-radio__input')
    subscriptionForm = wrapper.find('productssubscriptionform-stub')
  })

  it('exports a valid component', () => {
    expect(ProductsCreate).toBeAComponent()
  })

  it('check that radios are rendered and change product form type', () => {
    expect(radios.length).toBe(2)

    expect(wrapper.vm.type).toBe('subscription')
    expect(radios.at(0).classes()).toContain('is-checked')
    expect(subscriptionForm.exists()).toBeTruthy()

    radios.at(1).find('input').setChecked()

    singleForm = wrapper.find('productssingleform-stub')
    expect(wrapper.vm.type).toBe('single')
    expect(radios.at(1).classes()).toContain('is-checked')
    expect(singleForm.exists()).toBeTruthy()
  })

  it('check that subscription form is correctly binded', () => {
    const filledSub = filledForm.subscription
    expect(wrapper.vm.type).toBe('subscription')
    expect(wrapper.vm.form).toMatchObject(emptyForm)

    for(const item in filledSub) {
      if(filledSub.hasOwnProperty(item)) {
        subscriptionForm.vm.$emit('changeValue', { fieldName: item, newVal: filledSub[item] })

        expect(wrapper.vm.form[item]).toBe(filledSub[item])
      }
    }
  })

  it('check that single form is correctly binded', () => {
    const filledSingle = filledForm.single
    wrapper.setData({
      type: 'single'
    })
    singleForm = wrapper.find('productssingleform-stub')

    expect(wrapper.vm.type).toBe('single')
    expect(wrapper.vm.form).toMatchObject(emptyForm)

    for(const item in filledSingle) {
      if(filledSingle.hasOwnProperty(item)) {
        singleForm.vm.$emit('changeValue', { fieldName: item, newVal: filledSingle[item] })

        expect(wrapper.vm.form[item]).toBe(filledSingle[item])
      }
    }
  })

  it('check that click on Save btn correctly submits the form and forces table update', async () => {
    expect(wrapper.emitted('update:should-update')).toBeFalsy()

    const { subscription, single } = filledForm
    const submit = wrapper.find('[data-test="submit"]')
    expect(wrapper.vm.type).toBe('subscription')

    wrapper.setData({
      form: { ...subscription }
    })

    submit.trigger('click')

    wrapper.setData({
      type: 'single',
      form: { ...single }
    })

    submit.trigger('click')

    await expect(wrapper.vm.$api.post.mock.calls[0]).toEqual(['/products', subscription])
    await expect(wrapper.vm.$api.post.mock.calls[1]).toEqual(['/single-products', { ...single, price : single.price.total }])

    expect(wrapper.emitted('update:should-update')).toBeTruthy()
  })
})
