import Products from './products'
import MainLayout from '@lib/layouts/main'
import { Button, Tabs, TabPane } from '@lib/node_modules/element-ui'

const localVue = createLocalVue()

localVue.use(Button)
localVue.use(Tabs)
localVue.use(TabPane)

function createWrapper() {
  const wrapper = mount(Products, {
    localVue,
    stubs: {
      MainLayout,
      productsCreate: true,
      routerView: true,
      routerLink: true,
    },
    mocks: {
      $route: {
        name: 'products-subscription',
      }
    }
  })

  return wrapper
}

describe('packages/payments/src/views/products/products.vue', () => {
  let wrapper
  let createModal


  beforeEach(() => {
    wrapper = createWrapper()
    createModal = wrapper.find('productscreate-stub')
  })

  it('exports a valid component', () => {
    expect(Products).toBeAComponent()
  })

  it('check that tabs are rendered', () => {
    const tabs = wrapper.findAll('.el-tabs__item')
    expect(tabs.length).toBe(2)
  })

  it('check that Create Product button is rendered and opens the modal', () => {
    const createBtn = wrapper.find('[data-test="create"]')
    expect(createModal.exists()).toBeFalsy()
    expect(createBtn.exists()).toBeTruthy()
    expect(wrapper.vm.modal.create).toBeFalsy()

    createBtn.trigger('click')

    createModal = wrapper.find('productscreate-stub')
    expect(createModal.exists()).toBeTruthy()
  })
})
