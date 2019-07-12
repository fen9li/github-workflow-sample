import PaymentDetails from './payment-details'
// import paymentData from '@tests/__fixtures__/payment'

const localVue = createLocalVue()

function createWrapper() {
  const wrapper = mount(PaymentDetails, {
    localVue,
    methods: {
      formatDate: () => {},
    },
    mocks: {
      $router: {
        push: jest.fn(),
      },
    },
  })

  return wrapper
}

describe('packages/payments/src/views/subscription/information/blocks/payment-details.unit.js', () => {
  let wrapper

  beforeEach(() => {
    wrapper = createWrapper()
  })

  it('exports a valid component', () => {
    expect(PaymentDetails).toBeAComponent()
  })

  it('check that data list is correctly rendered', () => {
    const list = wrapper.find('.datalist')
    let listItems = wrapper.findAll('dt')
    expect(list.exists()).toBeTruthy()
    expect(wrapper.vm.token).toBeFalsy()
    expect(listItems.length).toBe(2)

    wrapper.setProps({
      token: true,
    })

    listItems = wrapper.findAll('dt')
    expect(list.exists()).toBeTruthy()
    expect(listItems.length).toBe(3)
  })
})
