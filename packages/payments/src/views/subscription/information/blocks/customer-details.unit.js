import CustomerDetails from './customer-details'
import { Button } from '@lib/node_modules/element-ui'
import customerData from '@tests/__fixtures__/customer'

const localVue = createLocalVue()
localVue.use(Button)

function createWrapper() {
  const wrapper = mount(CustomerDetails, {
    localVue,
    propsData: {
      customer: customerData,
    },
    mocks: {
      $router: {
        push: jest.fn(),
      },
    },
  })

  return wrapper
}

describe('packages/payments/src/views/subscription/information/blocks/customer-details.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = createWrapper()
  })

  it('exports a valid component', () => {
    expect(CustomerDetails).toBeAComponent()
  })

  it('check that data list is correctly rendered', () => {
    const list = wrapper.find('.datalist')
    const listItems = wrapper.findAll('dt')
    expect(list.exists()).toBeTruthy()
    expect(listItems.length).toBe(4)
  })

  it('check that View Details directs to Customer Details view', () => {
    wrapper.setProps({
      isTransaction: true,
    })

    const details = wrapper.find('[data-test="details"]')

    details.trigger('click')

    expect(wrapper.vm.$router.push).toHaveBeenCalledWith(
      {
        name: 'customer-details',
        params: {
          id: wrapper.vm.customer.id,
        },
      })
  })
})
