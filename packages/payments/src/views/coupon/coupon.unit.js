import Coupon from './coupon'
import MainLayout from '@lib/layouts/main'
import couponData from '@tests/__fixtures__/coupon'
import { Button, Card } from '@lib/node_modules/element-ui'

const localVue = createLocalVue()
localVue.use(Button)
localVue.use(Card)

localVue.directive('loading', () => {})

function createWrapper() {
  const wrapper = mount(Coupon, {
    localVue,
    propsData: {
      id: 'test',
    },
    stubs: {
      MainLayout,
      CouponFormModal: true,
      CouponDelete: true,
    },
    mocks: {
      $api: {
        get: jest.fn().mockReturnValue(Promise.resolve([null, couponData]))
      },
    },
    methods: {
      formatDate: jest.fn()
    }
  })

  return wrapper
}

describe('packages/payments/src/views/coupon/coupon.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = createWrapper()
  })

  it('exports a valid component', () => {
    expect(Coupon).toBeAComponent()
  })

  it('check that coupon data is requested', () => {
    expect(wrapper.vm.$api.get).toHaveBeenCalledWith(`/coupons/${wrapper.vm.id}`)
  })

  it('check that coupon info is rendered', () => {
    const list = wrapper.find('.datalist')
    const items = wrapper.findAll('dt')
    expect(list.exists()).toBeTruthy()
    expect(items.length).toBe(9)
  })

  it('check that discount type and amount are properly calculated', () => {
    const type = wrapper.find('[data-test="type"]')
    const amount = wrapper.find('[data-test="amount"]')

    expect(wrapper.vm.coupon.fixed_amount).toBeNull()
    expect(wrapper.vm.coupon.percentage).toBeTruthy()
    expect(type.text()).toBe('Percentage')
    expect(amount.text()).toBe(`${wrapper.vm.coupon.percentage}%`)

    wrapper.setData({
      coupon: {
        ...couponData ,
        percentage: null,
        fixed_amount: { currency: 'AUD', total: '11.11' }
      }
    })

    expect(type.text()).toBe('Fixed Amount')
    expect(amount.text()).toMatch(`$${wrapper.vm.coupon.fixed_amount.total} AUD`)
  })

  it('check that validity period is properly calculated', () => {
    const validity = wrapper.find('[data-test="validity"]')
    expect(wrapper.vm.coupon.validity_period).toBe('P2M')
    expect(validity.text()).toBe('2 Months')

    wrapper.setData({
      coupon: {
        ...couponData,
        validity_period: 'P11M'
      }
    })

    expect(validity.text()).toBe('11 Months')
  })

  it('check that click on Edit btn opens edit modal', () => {
    const editBtn = wrapper.find('[data-test="edit"]')
    let modal = wrapper.find('couponformmodal-stub')
    expect(modal.exists()).toBeFalsy()

    editBtn.trigger('click')

    modal = wrapper.find('couponformmodal-stub')
    expect(modal.exists()).toBeTruthy()
  })

  it('check that click on Delete btn opens delete modal', () => {
    const deleteBtn = wrapper.find('[data-test="delete"]')
    let modal = wrapper.find('coupondelete-stub')
    expect(modal.exists()).toBeFalsy()

    deleteBtn.trigger('click')

    modal = wrapper.find('coupondelete-stub')
    expect(modal.exists()).toBeTruthy()
  })

  it('check that new data is requested after editing', () => {
    const request = wrapper.vm.$api.get
    wrapper.setData({
      modal: {
        edit: true
      }
    })
    const editModal = wrapper.find('couponformmodal-stub')
    expect(request).toHaveBeenCalledTimes(1)

    editModal.vm.$emit('updated')

    expect(request).toHaveBeenCalledTimes(2)
  })
})
