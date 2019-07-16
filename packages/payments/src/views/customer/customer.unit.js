import Customer from './customer'
import MainLayout from '@lib/layouts/main'
import { Button, Tabs, TabPane } from '@lib/node_modules/element-ui'
import customerData from '@tests/__fixtures__/customer'
import formatDollar from '@lib/utils/format-dollar'

const localVue = createLocalVue()
localVue.use(Button)
localVue.use(Tabs)
localVue.use(TabPane)

localVue.filter('dollar', formatDollar)
localVue.directive('loading', () => {})

function createWrapper(route = 'customer-information') {
  const wrapper = mount(Customer, {
    localVue,
    propsData: {
      id: '1',
    },
    stubs: {
      MainLayout,
      routerView: true,
      routerLink: true,
      AddSubscription: true,
      AddProduct: true,
    },
    mocks: {
      $route: {
        name: route,
      },
      $api: {
        get: jest.fn().mockReturnValue(Promise.resolve([null, customerData]))
      }
    },
    data: function() {
      return {
        customer: customerData,
      }
    },
  })

  return wrapper
}

describe('packages/payments/src/views/customer/customer.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = createWrapper()
  })

  it('exports a valid component', () => {
    expect(Customer).toBeAComponent()
  })

  it('check that data was requested', async () => {
    expect(wrapper.vm.$api.get).toHaveBeenCalledWith(`/customers/${wrapper.vm.id}`)
  })

  it('check that Customer name and ID are rendered', () => {
    const title = wrapper.find('.headerTitle')
    const subTitle = wrapper.find('.headerSubtitle')
    const { customer } = wrapper.vm
    expect(title.text()).toBe(`${customer.first_name} ${customer.last_name}`)
    expect(subTitle.text()).toBe(`Customer ID ${customer.id}`)
  })


  it('check that Amount Owing is rendered', () => {
    const amount = wrapper.find('[data-test="owing"]')
    expect(amount.exists()).toBeTruthy()
    expect(amount.text()).toBe(formatDollar(wrapper.vm.customer.total_amount_outstanding))
  })

  it('check that Amount Transacted is rendered', () => {
    const amount = wrapper.find('[data-test="transacted"]')
    expect(amount.exists()).toBeTruthy()
    expect(amount.text()).toBe(formatDollar(wrapper.vm.customer.total_amount_transacted))
  })

  it('check that Add Subscription button is rendered and opens the modal', () => {
    const subscrBtn = wrapper.find('[data-test="add-subscription"]')
    let subscrModal = wrapper.find('addsubscription-stub')
    expect(subscrModal.exists()).toBeFalsy()
    expect(subscrBtn.exists()).toBeTruthy()
    expect(wrapper.vm.modal.addSubscription).toBeFalsy()

    subscrBtn.trigger('click')

    subscrModal = wrapper.find('addsubscription-stub')
    expect(subscrModal.exists()).toBeTruthy()
  })

  it('check that Add Product button is rendered and opens the modal', () => {
    const productBtn = wrapper.find('[data-test="add-product"]')
    let productModal = wrapper.find('addproduct-stub')
    expect(productModal.exists()).toBeFalsy()
    expect(productBtn.exists()).toBeTruthy()
    expect(wrapper.vm.modal.addProduct).toBeFalsy()

    productBtn.trigger('click')

    productModal = wrapper.find('addproduct-stub')
    expect(productModal.exists()).toBeTruthy()
  })

  it('check that tabs are rendered', () => {
    const tabs = wrapper.findAll('.el-tabs__item')
    expect(tabs.length).toBe(3)
  })
})
