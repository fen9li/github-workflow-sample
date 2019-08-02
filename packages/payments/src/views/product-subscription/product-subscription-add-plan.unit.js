import AddPlan from './product-subscription-add-plan'
import { Button,  Dialog } from '@lib/node_modules/element-ui'

const localVue = createLocalVue()
localVue.use(Button)
localVue.use(Dialog)

const emptyForm = {
  name: null,
  id: null,
  frequency: null,
  start_at: null,
  amount: null,
  currency: 'aud',
}

const filledForm = {
  name: 'test-pp',
  id: 'test-pp-id',
  frequency: 'P1M',
  start_at: '20/10/10',
  amount: '20.00',
  currency: 'aud',
}

function createWrapper() {
  const wrapper = mount(AddPlan, {
    localVue,
    attrs: {
      visible: true,
    },
    propsData: {
      productId: 'test-product-id' ,
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
    stubs: ['ProductsPricingForm'],
  })

  return wrapper
}

describe('packages/payments/src/views/product-subscription/product-subscription-add-plan.vue', () => {
  let wrapper
  let pricingPlanForm

  beforeEach(() => {
    wrapper = createWrapper()
    pricingPlanForm = wrapper.find('productspricingform-stub')
  })

  it('exports a valid component', () => {
    expect(AddPlan).toBeAComponent()
  })

  it('check that subscription form is rendered and correctly binded', () => {


    expect(wrapper.vm.form).toMatchObject(emptyForm)

    for(const item in filledForm) {
      if(filledForm.hasOwnProperty(item) && filledForm[item] !== 'currency') {
        pricingPlanForm.vm.$emit('changeValue', { fieldName: item, newVal: filledForm[item] })
      }
    }

    expect(wrapper.vm.form).toMatchObject(filledForm)
  })

  it('check that click on Save btn correctly submits the form and emits the update event', async () => {
    expect(wrapper.emitted('updated')).toBeFalsy()

    const submit = wrapper.find('[data-test="submit"]')
    wrapper.setData({
      form: { ...filledForm }
    })

    wrapper.setMethods({
      clearForm: jest.fn()
    })

    delete filledForm.currency

    submit.trigger('click')

    await expect(wrapper.vm.$api.post).toHaveBeenCalledWith(`/products/${wrapper.vm.productId}/plans`, filledForm)
    expect(wrapper.vm.clearForm).toHaveBeenCalled()

    expect(wrapper.emitted('updated')).toBeTruthy()
  })
})
