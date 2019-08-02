import ProductSubscription from './product-subscription'
import MainLayout from '@lib/layouts/main'
import subscriptionProductData from '@tests/__fixtures__/subscription-product'
import { Button, Card } from '@lib/node_modules/element-ui'
import table from '@tests/__fixtures__/tableDataMock'
import Vuex from 'vuex'

jest.mock('./product-subscription-plans-table')

let actions

function createWrapper() {
  const localVue = createLocalVue()
  localVue.use(Button)
  localVue.use(Card)
  localVue.use(Vuex)

  localVue.directive('loading', () => {})

  actions = {
    UPDATE_TABLE: jest.fn()
  }

  const store = new Vuex.Store({
    modules: {
      ui: {
        namespaced: true,
        actions,
      },
    },
  })

  const wrapper = mount(ProductSubscription, {
    localVue,
    store,
    propsData: {
      id: 'test',
    },
    stubs: {
      MainLayout,
      TableLayout: true,
      ProductSubscriptionEdit: true,
      ProductSubscriptionAddPlan: true,
    },
    mocks: {
      $api: {
        get: jest.fn().mockReturnValue(Promise.resolve([null, subscriptionProductData]))
      },
    },
    methods: {
      formatDate: jest.fn()
    },
    data: function() {
      return {
        table: table(),
      }
    },
  })

  return wrapper
}

describe('packages/payments/src/views/product-subscription/product-subscription.vue', () => {
  let wrapper
  let addPlanModal
  let editProductModal
  let dataRequests

  beforeEach(() => {
    wrapper = createWrapper()
    addPlanModal = wrapper.find('productsubscriptionaddplan-stub')
    editProductModal = wrapper.find('productsubscriptionedit-stub')

    dataRequests = wrapper.vm.$api.get.mock.calls
  })

  it('exports a valid component', () => {
    expect(ProductSubscription).toBeAComponent()
  })

  it('check that subscription product data is requested', () => {
    expect(dataRequests.length).toBe(1)
    expect(dataRequests[0]).toEqual([`/products/${wrapper.vm.id}`])
  })

  it('check that subscription product info is rendered', () => {
    const list = wrapper.find('.datalist')
    const items = wrapper.findAll('dt')
    expect(list.exists()).toBeTruthy()
    expect(items.length).toBe(5)
  })

  it('check that Edit Subscription btn is rendered and opens the modal', () => {
    const editProductBtn = wrapper.find('[data-test="edit"]')
    expect(editProductModal.exists()).toBeFalsy()

    editProductBtn.trigger('click')

    editProductModal = wrapper.find('productsubscriptionedit-stub')

    expect(editProductModal.exists()).toBeTruthy()
  })

  it('check after editing, subscription is being updated', () => {
    wrapper.setData({
      modal: {
        edit: true
      },
    })
    editProductModal = wrapper.find('productsubscriptionedit-stub')

    editProductModal.vm.$emit('updated')

    expect(dataRequests.length).toBe(2)
    expect(dataRequests[1]).toEqual([`/products/${wrapper.vm.id}`])
  })

  it('check that table is rendered', () => {
    const plansTable = wrapper.find('tablelayout-stub[table-name="plans"]')
    expect(plansTable.exists).toBeTruthy()
  })

  it('check that Add Plan btn is rendered and opens the modal', () => {
    const addPlanBtn = wrapper.find('[data-test="add"]')
    expect(addPlanModal.exists()).toBeFalsy()

    addPlanBtn.trigger('click')

    addPlanModal = wrapper.find('productsubscriptionaddplan-stub')

    expect(addPlanModal.exists()).toBeTruthy()
  })

  it('check that after creating new Pricing Plan table is updated', () => {
    expect(actions.UPDATE_TABLE).not.toHaveBeenCalled()
    wrapper.setData({
      modal: {
        add: true
      },
    })
    addPlanModal = wrapper.find('productsubscriptionaddplan-stub')

    addPlanModal.vm.$emit('updated')

    expect(actions.UPDATE_TABLE).toHaveBeenCalled()
  })
})
