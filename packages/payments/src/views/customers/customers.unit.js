import Customers from './customers'
import MainLayout from '@lib/layouts/main'
import { Button } from '@lib/node_modules/element-ui'
import table from '@tests/__fixtures__/tableDataMock'

jest.mock('./customers-table')

const localVue = createLocalVue()
localVue.use(Button)

function createWrapper() {
  const wrapper = mount(Customers, {
    localVue,
    stubs: {
      MainLayout,
      VirtualPos: true,
      TableLayout: true,
    },
    data: function() {
      return {
        table: table(),
      }
    },
  })

  return wrapper
}

describe('packages/payments/src/views/customers/customers.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = createWrapper()
  })

  it('exports a valid component', () => {
    expect(Customers).toBeAComponent()
  })

  it('check that customers table is rendered', () => {
    const customers = wrapper.find('tablelayout-stub[table-name="customers"]')
    expect(customers.exists()).toBeTruthy()
  })
})
