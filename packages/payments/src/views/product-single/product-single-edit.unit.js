import ProductEdit from './product-single-edit'
import ProductsSingleData from '@tests/__fixtures__/single-product'
import { Button, Dialog } from '@lib/node_modules/element-ui'

const localVue = createLocalVue()
localVue.use(Button)
localVue.use(Dialog)

const editedForm = {
  start_at: '2020/11/11',
  end_at: '2020/12/12',
  name: 'New test name',
  price: '99.99',
}

function createWrapper() {
  const wrapper = mount(ProductEdit, {
    localVue,
    attrs: {
      visible: true,
    },
    propsData: {
      currentProduct: ProductsSingleData,
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
    stubs: ['ProductsSingleForm', 'ElSelect', 'ElOption'],
  })

  return wrapper
}

describe('packages/payments/src/views/product-single/product-single-edit.vue', () => {
  let wrapper
  let productForm

  beforeEach(() => {
    wrapper = createWrapper()
    productForm = wrapper.find('productssingleform-stub')
  })

  it('exports a valid component', () => {
    expect(ProductEdit).toBeAComponent()
  })

  it('check that single form is correctly binded', () => {
    expect(wrapper.vm.form).toMatchObject(ProductsSingleData)

    for(const item in editedForm) {
      if(editedForm.hasOwnProperty(item)) {
        const field = item === 'price' ? 'price.total' : item

        productForm.vm.$emit('changeValue', { fieldName: field, newVal: editedForm[item] })

        if(field === 'price.total') {
          expect(wrapper.vm.form.price.total).toBe(editedForm[item])
        } else {
          expect(wrapper.vm.form[field]).toBe(editedForm[item])
        }
      }
    }
  })

  it('check that click on Save btn correctly submits the form end emits update event', async () => {
    expect(wrapper.emitted('updated')).toBeFalsy()

    const submit = wrapper.find('[data-test="submit"]')

    wrapper.setData({
      form: { ...editedForm, price: { total: editedForm.price } }
    })

    const product = wrapper.vm.form

    submit.trigger('click')

    await expect(wrapper.vm.$api.put).toHaveBeenCalledWith(`/single-products/${product.id}`, editedForm)

    expect(wrapper.emitted('updated')).toBeTruthy()
  })
})
