import Settlements from './settlements'
import MainLayout from '@lib/layouts/main'
import { Button } from '@lib/node_modules/element-ui'
import table from '@tests/__fixtures__/tableDataMock'

jest.mock('./settlements-table')

const localVue = createLocalVue()
localVue.use(Button)

function createWrapper() {
  const wrapper = mount(Settlements, {
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

describe('packages/payments/src/views/settlements/settlements.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = createWrapper()
  })

  it('exports a valid component', () => {
    expect(Settlements).toBeAComponent()
  })

  it('check that settlements table is rendered', () => {
    const settlements = wrapper.find('tablelayout-stub[table-name="settlements"]')
    expect(settlements.exists()).toBeTruthy()
  })
})
