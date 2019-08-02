import ProductsSingleForm from './products-single-form'
import { Button, Form, FormItem, DatePicker, Input } from '@lib/node_modules/element-ui'

const localVue = createLocalVue()
localVue.use(Button)
localVue.use(Form)
localVue.use(FormItem)
localVue.use(Input)
localVue.use(DatePicker)

const data = {
  start_at: null,
  end_at: null,
  price: {
    total: null,
  },
  id: null,
  name: null
}

function createWrapper() {
  const wrapper = mount(ProductsSingleForm, {
    localVue,
    propsData: {
      data,
    },
    stubs: ['ElSelect', 'ElOption'],
  })

  return wrapper
}

describe('packages/payments/src/views/products/forms/products-single-form.vue', () => {
  let wrapper
  let inputs
  let pickers

  beforeEach(() => {
    wrapper = createWrapper()
    inputs = wrapper.findAll('.el-input__inner')
    pickers = wrapper.findAll('.el-date-editor')
  })

  it('exports a valid component', () => {
    expect(ProductsSingleForm).toBeAComponent()
  })

  it('check that all form fields are rendered and emit event on change', () => {
    expect(inputs.length).toBe(5)
    expect(pickers.length).toBe(2)

    const keys = Object.keys(data)
    const testVal = '11'

    inputs.setValue(testVal)
    pickers.at(0).vm.$emit('input', '2020/10/10')
    pickers.at(1).vm.$emit('input', '2020/10/10')

    const events = wrapper.emitted('changeValue')

    expect(events.length).toBe(5)

    for(const key in keys) {
      if(keys.hasOwnProperty(key)) {

        if(keys[key] === 'start_at' || keys[key] === 'end_at') {
          expect(events).toContainEqual([{ fieldName: keys[key], newVal: '2020/10/10' }])
        } else if(keys[key] === 'price') {
          expect(events).toContainEqual([{ fieldName: 'price.total', newVal: testVal }])
        } else {
          expect(events).toContainEqual([{ fieldName: keys[key], newVal: testVal }])
        }
      }

    }
  })

  it('check that in edit mode ID field is disabled', () => {
    expect(wrapper.vm.edit).toBeFalsy()
    const id = wrapper.find('[data-test="id"]')
    expect(id.attributes('disabled')).toBeFalsy()

    wrapper.setProps({
      edit: true
    })

    expect(id.attributes('disabled')).toBe('disabled')
  })

})
