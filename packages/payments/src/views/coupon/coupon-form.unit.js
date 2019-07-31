import CouponForm from './coupon-form'
import { Form, FormItem, Input, DatePicker, Radio, RadioGroup } from '@lib/node_modules/element-ui'
import couponData from '@tests/__fixtures__/coupon'

const localVue = createLocalVue()
localVue.use(Form)
localVue.use(FormItem)
localVue.use(Input)
localVue.use(DatePicker)
localVue.use(Radio)
localVue.use(RadioGroup)

const emptyCoupon = {
  name: null,
  code: null,
  start_at: null,
  end_at: null,
  validity_period: null,
  discount_type: 'fixed_amount',
  amount: null,
}

function createWrapper(edit = false) {
  const wrapper = mount(CouponForm, {
    localVue,
    propsData: {
      coupon: edit ? couponData: emptyCoupon,
      edit,
    },
    stubs: ['ElSelect'],
  })

  return wrapper
}

describe('packages/payments/src/views/coupon/coupon-form.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = createWrapper()
  })

  it('exports a valid component', () => {
    expect(CouponForm).toBeAComponent()
  })

  it('check that amount fields is changed depending on discount type', () => {
    const amount = wrapper.find('[data-test="amount"]')
    const currencySelect = amount.find('elselect-stub')
    let prepend = amount.find('.el-input-group__prepend')
    let append = amount.find('.el-input-group__append')

    expect(wrapper.vm.coupon.discount_type).toBe('fixed_amount')
    expect(currencySelect.exists()).toBeTruthy()
    expect(prepend.text()).toBe('$')
    expect(append.exists()).toBeFalsy()

    wrapper.setProps({
      coupon: {
        discount_type: 'percentage'
      }
    })

    prepend = amount.find('.el-input-group__prepend')
    append = amount.find('.el-input-group__append')

    expect(prepend.exists()).toBeFalsy()
    expect(append.text()).toBe('%')
  })

  it('check that all form elements are rendered and emit event on change', () => {
    const formInputs = wrapper.findAll('.el-input input')
    const datepickers = wrapper.findAll('.el-date-editor')
    const radios = wrapper.findAll('.el-radio__original')

    expect(formInputs.length).toBe(6)
    expect(datepickers.length).toBe(2)
    expect(radios.length).toBe(2)

    const keys = Object.keys(emptyCoupon)
    const testVal = '2'

    formInputs.setValue(testVal)
    datepickers.at(0).vm.$emit('input', '2020/10/10')
    datepickers.at(1).vm.$emit('input', '2020/10/10')
    radios.setChecked()

    const events = wrapper.emitted('changeValue')

    expect(events.length).toBe(8)

    for(const key in keys) {

      if(keys[key] === 'start_at' || keys[key] === 'end_at') {
        expect(events).toContainEqual([{ fieldName: keys[key], newVal: '2020/10/10' }])
      } else if(keys[key] === 'discount_type') {
        expect(events).toContainEqual([{ fieldName: keys[key], newVal: 'percentage' }])
        expect(events).toContainEqual([{ fieldName: keys[key], newVal: 'fixed_amount' }])
      } else {
        expect(events).toContainEqual([{ fieldName: keys[key], newVal: testVal }])
      }
    }
  })
})

describe('packages/payments/src/views/coupon/coupon-form.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = createWrapper(true)
  })

  it('check that in edit mode only Name and End date are enabled', () => {
    const formInputs = wrapper.findAll('.el-input__inner')
    const radios = wrapper.findAll('.el-radio')

    expect(wrapper.vm.edit).toBeTruthy()
    expect(radios.at(0).classes()).toContain('is-disabled')
    expect(radios.at(1).classes()).toContain('is-disabled')

    for(let i = 0; i < formInputs.length; i++) {
      if(i !== 0 && i !== 3) {
        expect(formInputs.at(i).attributes('disabled')).toBe('disabled')
      } else
        expect(formInputs.at(i).attributes('disabled')).toBeFalsy()
    }
  })
})
