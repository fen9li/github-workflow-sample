import ProductsSubscription from './products-subscription'
import MainLayout from '@lib/layouts/main'
import { Button } from '@lib/node_modules/element-ui'
import table from '@tests/__fixtures__/tableDataMock'
import Vuex from 'vuex'

jest.mock('./products-subscription-table')

let store
let actions

function createWrapper() {
  const localVue = createLocalVue()
  localVue.use(Button)
  localVue.use(Vuex)

  actions = {
    UPDATE_TABLE: jest.fn()
  }

  store = new Vuex.Store({
    modules: {
      ui: {
        namespaced: true,
        actions,
      },
    },
  })

  const wrapper = mount(ProductsSubscription, {
    localVue,
    store,
    stubs: {
      MainLayout,
      TableLayout: true,
    },
    data: function() {
      return {
        table: table(),
      }
    },
    mocks: {
      $router: {
        push: jest.fn()
      }
    }
  })

  return wrapper
}

describe('packages/payments/src/views/products/subscription/products-subscription.vue', () => {
  let wrapper
  let subProducts

  beforeEach(() => {
    wrapper = createWrapper()
    subProducts = wrapper.find('tablelayout-stub[table-name="SubscriptionProducts"]')
  })

  it('exports a valid component', () => {
    expect(ProductsSubscription).toBeAComponent()
  })

  it('check that products subscription table is rendered', () => {
    expect(subProducts.exists()).toBeTruthy()
  })

  it('check that table is requested after update', () => {
    expect(wrapper.vm.shouldUpdate).toBeFalsy()
    expect(actions.UPDATE_TABLE).not.toHaveBeenCalled()

    wrapper.setProps({
      shouldUpdate: true
    })

    expect(actions.UPDATE_TABLE).toHaveBeenCalled()
  })

  it('check that click on row directs to details page', () => {
    const testId = 'testId'

    subProducts.vm.$emit('row-click', { id: testId })

    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'products-subscription-details', params: { id: testId }
    })
  })
})
