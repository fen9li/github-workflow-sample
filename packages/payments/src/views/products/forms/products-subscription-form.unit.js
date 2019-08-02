import ProductsSubscriptionForm from './products-subscription-form'
import { Button, Form, FormItem, DatePicker, Input, Radio, RadioGroup } from '@lib/node_modules/element-ui'

const localVue = createLocalVue()
localVue.use(Button)
localVue.use(Form)
localVue.use(FormItem)
localVue.use(Input)
localVue.use(DatePicker)
localVue.use(Radio)
localVue.use(RadioGroup)

const data = {
  anchor_at : null,
  billing_type: 'prorata',
  sunset_at: null,
  id: null,
  name: null
}

function createWrapper(type = 'prorata') {
  const wrapper = mount(ProductsSubscriptionForm, {
    localVue,
    propsData: {
      data: { ...data, billing_type : type },
    },
    stubs: ['ElTooltip', 'ProductsAnchorDates'],
  })

  return wrapper
}

describe('packages/payments/src/views/products/forms/products-subscription-form.vue', () => {
  let wrapper
  let inputs
  let pickers
  let radios
  let anchorDates

  beforeEach(() => {
    wrapper = createWrapper()
    inputs = wrapper.findAll('.el-input__inner')
    pickers = wrapper.findAll('.el-date-editor')
    radios = wrapper.findAll('.el-radio__original')
    anchorDates = wrapper.find('productsanchordates-stub')
  })

  it('exports a valid component', () => {
    expect(ProductsSubscriptionForm).toBeAComponent()
  })

  it('check that Anchor Dates is rendered if type === "prorata" ', () => {
    expect(wrapper.vm.data.billing_type).toBe('prorata')
    expect(pickers.length).toBe(2)
    expect(anchorDates.exists()).toBeTruthy()

    wrapper = createWrapper('anniversary')
    anchorDates = wrapper.find('productsanchordates-stub')
    pickers = wrapper.findAll('.el-date-editor')

    expect(pickers.length).toBe(1)
    expect(anchorDates.exists()).toBeFalsy()
  })

  it('check that all form fields are rendered and emit event on change', () => {
    expect(inputs.length).toBe(4)
    expect(pickers.length).toBe(2)
    expect(radios.length).toBe(2)

    const keys = Object.keys(data)
    const testVal = '11'

    inputs.setValue(testVal)
    pickers.at(0).vm.$emit('input', '2020/10/10')
    pickers.at(1).vm.$emit('input', '2020/10/10')
    radios.setChecked()

    const events = wrapper.emitted('changeValue')

    expect(events.length).toBe(6)

    for(const key in keys) {
      if(keys.hasOwnProperty(key)) {

        if(keys[key] === 'anchor_at' || keys[key] === 'sunset_at') {
          expect(events).toContainEqual([{ fieldName: keys[key], newVal: '2020/10/10' }])
        } else if(keys[key] === 'billing_type') {
          expect(events).toContainEqual([{ fieldName: keys[key], newVal: 'prorata' }])
          expect(events).toContainEqual([{ fieldName: keys[key], newVal: 'anniversary' }])
        } else {
          expect(events).toContainEqual([{ fieldName: keys[key], newVal: testVal }])
        }
      }

    }
  })

  it('check that in edit mode ID and Billing type fields are disabled', () => {
    expect(wrapper.vm.edit).toBeFalsy()
    const id = wrapper.find('[data-test="id"]')
    expect(id.attributes('disabled')).toBeFalsy()
    expect(radios.at(0).attributes('disabled')).toBeFalsy()
    expect(radios.at(1).attributes('disabled')).toBeFalsy()

    wrapper.setProps({
      data: { ...data, group: { billing_type: 'prorata' } },
      edit: true,
    })

    expect(id.attributes('disabled')).toBe('disabled')
    expect(radios.at(0).attributes('disabled')).toBe('disabled')
    expect(radios.at(1).attributes('disabled')).toBe('disabled')
  })

})
