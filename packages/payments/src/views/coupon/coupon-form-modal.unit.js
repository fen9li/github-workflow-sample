import CouponFormModal from './coupon-form-modal'
import { Button, Dialog } from '@lib/node_modules/element-ui'
import couponData from '@tests/__fixtures__/coupon'

const localVue = createLocalVue()
localVue.use(Button)
localVue.use(Dialog)

function createWrapper(edit = false) {
  const wrapper = mount(CouponFormModal, {
    localVue,
    attrs: {
      visible: true,
    },
    stubs: ['CouponForm'],
    mocks: {
      $api: {
        post: jest.fn().mockReturnValue([null, 'done']),
        put: jest.fn().mockReturnValue([null, 'done'])
      },
      $notify: jest.fn(),
    },
    propsData: {
      edit,
      coupon: edit ? couponData : {}
    },
    methods: {
      validateAll: jest.fn().mockReturnValue([])
    }
  })

  return wrapper
}

describe('packages/payments/src/views/coupon/coupon-form-modal.vue', () => {
  let wrapper
  let couponForm
  let submit

  beforeEach(() => {
    wrapper = createWrapper()
    couponForm = wrapper.find('couponform-stub')
    submit = wrapper.find('[data-test="submit"]')
  })

  it('exports a valid component', () => {
    expect(CouponFormModal).toBeAComponent()
  })

  it('check that coupon form is rendered', () => {
    expect(couponForm.exists()).toBeTruthy()
  })

  it('check that coupon form is filled with existing coupon data if editing', () => {
    expect(couponForm.exists()).toBeTruthy()
    expect(wrapper.vm.edit).toBeFalsy()
    expect(wrapper.vm.form.code).toBeNull()

    wrapper = createWrapper(true)

    expect(wrapper.vm.edit).toBeTruthy()
    expect(wrapper.vm.form.code).toBe(wrapper.vm.coupon.code)
  })

  it('check that create mode calls api endpoint with proper payload', async () => {
    wrapper.setData({
      form: {
        name: 'test',
        code: 'test',
        start_at: '2020/10/10',
        end_at: '2020/12/12',
        validity_period: 2,
        discount_type: 'percentage',
        amount: '10.00',
      }
    })
    expect(wrapper.vm.edit).toBeFalsy()

    submit.trigger('click')

    await expect(wrapper.vm.$api.post).toHaveBeenCalledWith(`/coupons`,
      {
        code: 'test',
        end_at: '2020/12/12',
        percentage: '10.00',
        name: 'test',
        start_at: '2020/10/10',
        validity_period: 'P2M'
      })
  })
})

describe('packages/payments/src/views/coupon/coupon-form-modal.vue', () => {
  let wrapper
  let submit

  beforeEach(() => {
    wrapper = createWrapper(true)
    submit = wrapper.find('[data-test="submit"]')
  })

  it('check that edit mode calls api endpoint with proper payload (start_at in the past)', () => {

    wrapper.setData({
      form: {
        name: 'changed',
        start_at: '2010/10/10',
        end_at: '2020/12/12',
        discount_type: 'percentage',
      }
    })

    expect(wrapper.vm.edit).toBeTruthy()

    submit.trigger('click')

    expect(wrapper.vm.$api.put).toHaveBeenCalledWith(`/coupons/${wrapper.vm.coupon.id}`,
      {
        end_at: '2020/12/12',
        name: 'changed',
      })
  })

  it('check that edit mode calls api endpoint with proper payload (start_at in the future)', () => {

    wrapper.setData({
      form: {
        name: 'changed',
        start_at: '2020/10/10',
        end_at: '2020/12/12',
        discount_type: 'percentage',
        amount: '10.00'
      }
    })

    expect(wrapper.vm.edit).toBeTruthy()

    submit.trigger('click')

    expect(wrapper.vm.$api.put).toHaveBeenCalledWith(`/coupons/${wrapper.vm.coupon.id}`,
      {
        end_at: '2020/12/12',
        name: 'changed',
        percentage: '10.00'
      })
  })
})
