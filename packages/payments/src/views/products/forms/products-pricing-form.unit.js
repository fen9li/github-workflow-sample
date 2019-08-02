import ProductsPricingForm from './products-pricing-form'
import { Button, Form, FormItem, DatePicker, Input } from '@lib/node_modules/element-ui'

const localVue = createLocalVue()
localVue.use(Button)
localVue.use(Form)
localVue.use(FormItem)
localVue.use(Input)
localVue.use(DatePicker)

const data = {
  start_at: null,
  frequency: null,
  amount: null,
  id: null,
  name: null
}

function createWrapper() {
  const wrapper = mount(ProductsPricingForm, {
    localVue,
    propsData: {
      data,
    },
    stubs: ['ElSelect', 'ElOption'],
  })

  return wrapper
}

describe('packages/payments/src/views/products/forms/products-pricing-form.vue', () => {
  let wrapper
  let inputs
  let pickers

  beforeEach(() => {
    wrapper = createWrapper()
    inputs = wrapper.findAll('.el-input__inner')
    pickers = wrapper.findAll('.el-date-editor')
  })

  it('exports a valid component', () => {
    expect(ProductsPricingForm).toBeAComponent()
  })

  it('check that all form fields are rendered and emit event on change', () => {
    const frequency = wrapper.find('elselect-stub')
    expect(inputs.length).toBe(4)
    expect(pickers.length).toBe(1)

    const keys = Object.keys(data)
    const testVal = '11'

    inputs.setValue(testVal)
    frequency.vm.$emit('input', 'P1M')
    pickers.at(0).vm.$emit('input', '2020/10/10')

    const events = wrapper.emitted('changeValue')

    expect(events.length).toBe(5)

    for(const key in keys) {
      if(keys.hasOwnProperty(key)) {

        if(keys[key] === 'start_at') {
          expect(events).toContainEqual([{ fieldName: keys[key], newVal: '2020/10/10' }])
        } else if(keys[key] === 'frequency') {
          expect(events).toContainEqual([{ fieldName: keys[key], newVal: 'P1M' }])
        }
        else {
          expect(events).toContainEqual([{ fieldName: keys[key], newVal: testVal }])
        }
      }

    }
  })
})
