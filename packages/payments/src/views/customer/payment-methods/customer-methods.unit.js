import CustomerMethods from './customer-methods'
import customerData from '@tests/__fixtures__/customer'
import { Button } from '@lib/node_modules/element-ui'

const localVue = createLocalVue()
localVue.use(Button)

function createWrapper() {
  const wrapper = mount(CustomerMethods, {
    localVue,
    stubs: {
      AddModal: true,
      DeleteModal: true,
    },
    propsData: {
      customer: customerData,
      loading: false,
      id: '1'
    },
  })

  return wrapper
}

describe('packages/payments/src/views/customer/information/customer-details.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = createWrapper()
  })

  it('exports a valid component', () => {
    expect(CustomerMethods).toBeAComponent()
  })

  it('check that all payment methods are rendered', () => {
    const methods = wrapper.findAll('.card')
    expect(methods.length).toBe(wrapper.vm.customer.payment_sources.length)
  })

  it('check that Add button is rendered and opens the modal', () => {
    const addBtn = wrapper.find('[data-test="add"]')
    let addModal = wrapper.find('addmodal-stub')
    expect(addModal.exists()).toBeFalsy()
    expect(addBtn.exists()).toBeTruthy()
    expect(wrapper.vm.modal.add).toBeFalsy()

    addBtn.trigger('click')

    addModal = wrapper.find('addmodal-stub')
    expect(addModal.exists()).toBeTruthy()
  })

  it('check that click on method delete icon open the modal and passes the method', () => {
    const customerMethods = wrapper.vm.customer.payment_sources
    expect(customerMethods.length).toBeTruthy()
    const deleteBtns = wrapper.findAll('[data-test="delete"]')
    const deleteBtn = deleteBtns.at(0)
    expect(deleteBtns.length).toBe(customerMethods.length)
    let deleteModal = wrapper.find('deletemodal-stub')
    expect(deleteModal.exists()).toBeFalsy()
    expect(deleteBtn.exists()).toBeTruthy()
    expect(wrapper.vm.methodToRemove).toBeNull()

    deleteBtn.trigger('click')

    deleteModal = wrapper.find('deletemodal-stub')
    expect(wrapper.vm.methodToRemove).toMatchObject(customerMethods[0])
    expect(deleteModal.exists()).toBeTruthy()
  })

  // TODO: Update unit with more specific tests for each card content (credit card, account, etc.) after backend implements the feature
})
