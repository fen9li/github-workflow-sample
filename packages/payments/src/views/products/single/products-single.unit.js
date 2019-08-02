import ProductsSingle from './products-single'
import MainLayout from '@lib/layouts/main'
import { Button } from '@lib/node_modules/element-ui'
import table from '@tests/__fixtures__/tableDataMock'
import Vuex from 'vuex'

jest.mock('./products-single-table')

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

  const wrapper = mount(ProductsSingle, {
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

describe('packages/payments/src/views/products/single/products-single.vue', () => {
  let wrapper
  let singleProducts

  beforeEach(() => {
    wrapper = createWrapper()
    singleProducts = wrapper.find('tablelayout-stub[table-name="singleProducts"]')
  })

  it('exports a valid component', () => {
    expect(ProductsSingle).toBeAComponent()
  })

  it('check that products single table is rendered', () => {
    expect(singleProducts.exists()).toBeTruthy()
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

    singleProducts.vm.$emit('row-click', { id: testId })

    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'products-single-details', params: { id: testId }
    })
  })
})
