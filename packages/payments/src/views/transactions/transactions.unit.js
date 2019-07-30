import Transactions from './transactions'
import MainLayout from '@lib/layouts/main'
import { Button } from '@lib/node_modules/element-ui'
import table from '@tests/__fixtures__/tableDataMock'

jest.mock('./transactions-table')

const localVue = createLocalVue()
localVue.use(Button)

function createWrapper() {
  const wrapper = mount(Transactions, {
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

describe('packages/payments/src/views/transactions/transactions.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = createWrapper()
  })

  it('exports a valid component', () => {
    expect(Transactions).toBeAComponent()
  })

  it('check that transactions table is rendered', () => {
    const transactions = wrapper.find('tablelayout-stub[table-name="transactions"]')
    expect(transactions.exists()).toBeTruthy()
  })

  it('check that Virtual POS button is rendered and opens the modal', () => {
    const pos = wrapper.find('[data-test="pos"]')
    let modal = wrapper.find('virtualpos-stub')

    expect(pos.exists()).toBeTruthy()
    expect(wrapper.vm.modal.pos).toBeFalsy()
    expect(modal.exists()).toBeFalsy()

    pos.trigger('click')
    expect(wrapper.vm.modal.pos).toBeTruthy()
    modal = wrapper.find('virtualpos-stub')
    expect(modal.exists()).toBeTruthy()
  })
})
