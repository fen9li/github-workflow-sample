import CouponsEdit from './coupons-edit'
import subscriptionData from '@tests/__fixtures__/subscription'
import { Button, Dialog, Form, FormItem, Input } from '@lib/node_modules/element-ui'
import get from 'lodash/get'
import cloneDeep from 'lodash/cloneDeep'

const localVue = createLocalVue()
localVue.use(Button)
localVue.use(Dialog)
localVue.use(Form)
localVue.use(FormItem)
localVue.use(Input)

localVue.directive('loading', () => {})

function createWrapper(coupons = []) {
  const subscription = cloneDeep(subscriptionData)
  subscription.coupons = coupons

  const wrapper = mount(CouponsEdit, {
    localVue,
    attrs: {
      visible: true,
    },
    propsData: {
      subscription,
      customerName: 'Test Name',
    },
    stubs: {
      ElTooltip: true,
      ElSelect: true,
    },
    methods: {
      getCoupons: jest.fn(),
      notify: jest.fn(),
    },
    mocks: {
      $api: {
        put: jest.fn(),
        delete: jest.fn().mockReturnValue(Promise.resolve([null, 'done'])),
      },
    },
  })

  return wrapper
}

describe('packages/payments/src/views/subscription/information/modals/coupons-edit', () => {
  let wrapper
  let submit

  beforeEach(() => {
    wrapper = createWrapper()
    submit = wrapper.find('[data-test="submit"]')
  })

  it('exports a valid component', () => {
    expect(CouponsEdit).toBeAComponent()
  })

  it('check that form and all fields are rendered', () => {
    const form = wrapper.find('.el-form')
    const formItems = wrapper.findAll('.el-form-item')
    expect(form.exists()).toBeTruthy()
    expect(formItems.length).toBe(2)
  })

  it('check that note is rendered', () => {
    const note = wrapper.find('.modal-note__text')
    expect(note.exists()).toBeTruthy()
    expect(note.text()).toBe('Adding of editing a Coupon will become effective at the text billing date.')
  })

  it('check that customer field is not editable', () => {
    const customer = wrapper.find('[data-test="customer"]')
    expect(customer.exists()).toBeTruthy()
    expect(customer.attributes('disabled')).toBeTruthy()
  })

  it('check that click on Save submits the form', () => {
    wrapper.setMethods({
      onSubmit: jest.fn(),
    })

    submit.trigger('click')

    expect(wrapper.vm.onSubmit).toHaveBeenCalled()
  })

  it('check that coupon may be applied', () => {
    const newCoupon = 'COUPON'

    expect(wrapper.initialCoupon).toBeFalsy()
    expect(wrapper.vm.form.coupons.length).toBe(0)

    wrapper.setData({
      form: {
        coupons: [newCoupon],
      },
    })

    submit.trigger('click')

    expect(wrapper.vm.$api.put).toHaveBeenCalledWith(
      `/subscriptions/${wrapper.vm.subscription.id}/coupons/${newCoupon}`
    )
  })
})

describe('packages/payments/src/views/subscription/information/modals/coupons-edit', () => {
  let wrapper
  let appliedCoupon

  beforeEach(() => {
    wrapper = createWrapper(subscriptionData.coupons)
    appliedCoupon = get(wrapper.vm.subscription, 'coupons[0].coupon.code')
  })

  it('check that applied coupon is selected by default', () => {
    wrapper = createWrapper(subscriptionData.coupons)
    expect(wrapper.vm.initialCoupon).toBe(appliedCoupon)
    expect(wrapper.vm.form.coupons[0]).toBe(appliedCoupon)
  })

  it('check that coupon may be removed', () => {
    wrapper = createWrapper(subscriptionData.coupons)
    expect(appliedCoupon).toBeTruthy()
    expect(wrapper.vm.form.coupons[0]).toBe('SUBSCRIPTIONCOUPON2')

    wrapper.setData({
      form: {
        coupons: [],
      },
    })

    wrapper.vm.onSubmit()

    expect(wrapper.vm.$api.delete).toHaveBeenCalledWith(
      `/subscriptions/${wrapper.vm.subscription.id}/coupons`
    )
  })

  it('check that apply another coupon works correctly ', () => {
    // First we delete applied coupon, then apply new one
    expect(appliedCoupon).toBeTruthy()
    expect(wrapper.vm.form.coupons[0]).toBe('SUBSCRIPTIONCOUPON2')

    wrapper.setData({
      form: {
        coupons: ['FIXED2'],
      },
    })

    expect.assertions(3)

    wrapper.vm.onSubmit().then(() => {
      return expect(wrapper.vm.$api.delete).toHaveBeenCalledWith(
        `/subscriptions/${wrapper.vm.subscription.id}/coupons`
      ).then(() => {
        expect(wrapper.vm.$api.put).toHaveBeenCalledWith(
          `/subscriptions/${wrapper.vm.subscription.id}/coupons/${wrapper.vm.form.coupons[0]}`,
        )
      })
    })
  })
})
