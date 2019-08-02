import ProductSingle from './product-single'
import MainLayout from '@lib/layouts/main'
import singleProductData from '@tests/__fixtures__/single-product'
import { Button, Card } from '@lib/node_modules/element-ui'

function createWrapper() {
  const localVue = createLocalVue()
  localVue.use(Button)
  localVue.use(Card)

  localVue.directive('loading', () => {})

  const wrapper = mount(ProductSingle, {
    localVue,
    propsData: {
      id: 'test',
    },
    stubs: {
      MainLayout,
      ProductSingleEdit: true,
    },
    mocks: {
      $api: {
        get: jest.fn().mockReturnValue(Promise.resolve([null, singleProductData]))
      },
    },
    methods: {
      formatDate: jest.fn()
    },
  })

  return wrapper
}

describe('packages/payments/src/views/product-single/product-single.vue', () => {
  let wrapper
  let editProductModal
  let dataRequests

  beforeEach(() => {
    wrapper = createWrapper()
    editProductModal = wrapper.find('productsingleedit-stub')
    dataRequests = wrapper.vm.$api.get.mock.calls
  })

  it('exports a valid component', () => {
    expect(ProductSingle).toBeAComponent()
  })

  it('check that single product data is requested', () => {
    expect(dataRequests.length).toBe(1)
    expect(dataRequests[0]).toEqual([`/single-products/${wrapper.vm.id}`])
  })

  it('check that single product info is rendered', () => {
    const list = wrapper.find('.datalist')
    const items = wrapper.findAll('dt')
    expect(list.exists()).toBeTruthy()
    expect(items.length).toBe(5)
  })

  it('check that Edit Product btn is rendered and opens the modal', () => {
    const editProductBtn = wrapper.find('[data-test="edit"]')
    expect(editProductModal.exists()).toBeFalsy()

    editProductBtn.trigger('click')

    editProductModal = wrapper.find('productsingleedit-stub')

    expect(editProductModal.exists()).toBeTruthy()
  })

  it('check after editing, single is being updated', () => {
    wrapper.setData({
      modal: {
        singleEdit: true
      },
    })
    editProductModal = wrapper.find('productsingleedit-stub')

    editProductModal.vm.$emit('updated')

    expect(dataRequests.length).toBe(2)
    expect(dataRequests[1]).toEqual([`/single-products/${wrapper.vm.id}`])
  })
})
