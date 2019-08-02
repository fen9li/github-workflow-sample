import ProductEdit from './product-subscription-edit'
import ProductsSubscriptionData from '@tests/__fixtures__/subscription-product'
import { Button, Dialog } from '@lib/node_modules/element-ui'

const localVue = createLocalVue()
localVue.use(Button)
localVue.use(Dialog)

function createWrapper() {
  const wrapper = mount(ProductEdit, {
    localVue,
    attrs: {
      visible: true,
    },
    propsData: {
      currentProduct: ProductsSubscriptionData,
    },
    methods: {
      validateAll: jest.fn().mockReturnValue([])
    },
    mocks: {
      $api: {
        put: jest.fn().mockReturnValue([null, 'done'])
      },
      $notify: jest.fn()
    },
    stubs: ['ProductsSubscriptionForm'],
  })

  return wrapper
}

describe('packages/payments/src/views/product-subscription/product-subscription-edit.vue', () => {
  let wrapper
  let productForm

  beforeEach(() => {
    wrapper = createWrapper()
    productForm = wrapper.find('productssubscriptionform-stub')
  })

  it('exports a valid component', () => {
    expect(ProductEdit).toBeAComponent()
  })

  it('check that subscription form is correctly binded', () => {
    expect(wrapper.vm.form).toMatchObject(ProductsSubscriptionData)

    const testVals = {
      sunset_at: '2020/11/11',
      name: 'New test name'
    }

    productForm.vm.$emit('changeValue', { fieldName: 'sunset_at', newVal: testVals.sunset_at })
    productForm.vm.$emit('changeValue', { fieldName: 'name', newVal: testVals.name })

    expect(wrapper.vm.form.sunset_at).toBe(testVals.sunset_at)
    expect(wrapper.vm.form.name).toBe(testVals.name)
  })

  it('check that click on Save btn correctly submits the form end emits update event', async () => {
    expect(wrapper.emitted('updated')).toBeFalsy()

    const submit = wrapper.find('[data-test="submit"]')
    const product = wrapper.vm.form

    submit.trigger('click')

    await expect(wrapper.vm.$api.put).toHaveBeenCalledWith(`/products/${product.id}`,{
      name: product.name,
      sunset_at: product.sunset_at
    })

    expect(wrapper.emitted('updated')).toBeTruthy()
  })
})
