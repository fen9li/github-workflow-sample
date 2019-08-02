import productsAnchorDates from './products-anchor-dates'
import { Button, Collapse, CollapseItem } from '@lib/node_modules/element-ui'
import table from '@tests/__fixtures__/tableDataMock'

jest.mock('./products-anchor-dates-table')

function createWrapper() {
  const localVue = createLocalVue()
  localVue.use(Button)
  localVue.use(Collapse)
  localVue.use(CollapseItem)

  const wrapper = mount(productsAnchorDates, {
    localVue,
    stubs: {
      DataTable: true,
    },
    data: function() {
      return {
        table: table(),
      }
    },
  })

  return wrapper
}

describe('packages/payments/src/views/products/forms/products-anchor-dates.vue', () => {
  let wrapper
  let table

  beforeEach(() => {
    wrapper = createWrapper()
    table = wrapper.find('datatable-stub[name="productsAnchorDates"]')
  })

  it('exports a valid component', () => {
    expect(productsAnchorDates).toBeAComponent()
  })

  it('check that anchor dates table is rendered', () => {
    expect(table.exists()).toBeTruthy()
  })

})
