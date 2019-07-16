import Subscriptions from './subscriptions'
import MainLayout from '@lib/layouts/main'
import tableConfig from '@tests/__fixtures__/tableDataMock'

jest.mock('./subscriptions-table')

const localVue = createLocalVue()

function createWrapper() {
  const wrapper = mount(Subscriptions, {
    localVue,
    stubs: {
      MainLayout,
      TableLayout: true,
    },
    data: function() {
      return {
        tableConfig: tableConfig(),
      }
    },
  })

  return wrapper
}

describe('packages/payments/src/views/subscriptions/subscriptions.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = createWrapper()
  })

  it('exports a valid component', () => {
    expect(Subscriptions).toBeAComponent()
  })

  it('check that subscriptions table is rendered', () => {
    const subscriptions = wrapper.find('tablelayout-stub[table-name="subscriptions"]')
    expect(subscriptions.exists()).toBeTruthy()
  })
})
