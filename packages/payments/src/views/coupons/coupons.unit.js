import Coupons from './coupons'
import MainLayout from '@lib/layouts/main'
import { Button } from '@lib/node_modules/element-ui'
import table from '@tests/__fixtures__/tableDataMock'

jest.mock('./coupons-table')

const localVue = createLocalVue()
localVue.use(Button)

function createWrapper() {
  const wrapper = mount(Coupons, {
    localVue,
    stubs: {
      MainLayout,
      CouponFormModal: true,
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

describe('packages/payments/src/views/coupons/coupons.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = createWrapper()
  })

  it('exports a valid component', () => {
    expect(Coupons).toBeAComponent()
  })

  it('check that coupons table is rendered', () => {
    const coupons = wrapper.find('tablelayout-stub[table-name="coupons"]')
    expect(coupons.exists()).toBeTruthy()
  })

  it('check that Create coupon button is rendered and opens the create coupon modal', () => {
    const createCoupon = wrapper.find('[data-test="add-coupon"]')
    let modal = wrapper.find('couponformmodal-stub')

    expect(createCoupon.exists()).toBeTruthy()
    expect(wrapper.vm.modal.create).toBeFalsy()
    expect(modal.exists()).toBeFalsy()

    createCoupon.trigger('click')
    expect(wrapper.vm.modal.create).toBeTruthy()
    modal = wrapper.find('couponformmodal-stub')
    expect(modal.exists()).toBeTruthy()
  })
})
