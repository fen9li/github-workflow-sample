import PaymentForm from './payment-form'
import { Button, Form, FormItem, Tabs, TabPane, Input } from '@lib/node_modules/element-ui'

const localVue = createLocalVue()
localVue.use(Button)
localVue.use(Form)
localVue.use(FormItem)
localVue.use(Tabs)
localVue.use(TabPane)
localVue.use(Input)


const form = {
  account: {
    name: '',
    bsb: '',
    number: '',
  },
  card: {
    name: '2',
    number: '2',
    expiry: '22/22',
    cvv: '222',
  },
}

function createWrapper() {
  const wrapper = mount(PaymentForm, {
    localVue,
    propsData: {
      form,
    },
  })

  return wrapper
}

describe('packages/payments/src/views/customer/payment-methods/payment-form.vue', () => {
  let wrapper
  let tabPanes
  let save

  beforeEach(() => {
    wrapper = createWrapper()
    tabPanes = wrapper.findAll('.el-tab-pane')
    save= wrapper.find('[data-test="save"]')
  })

  it('exports a valid component', () => {
    expect(PaymentForm).toBeAComponent()
  })

  it('check that on Card tab all form fields are rendered and emit event on change', () => {
    const inputs = tabPanes.at(0).findAll('input')
    const keys = Object.keys(form.card)
    const testVal = '22'

    expect(inputs.length).toBe(4)

    inputs.setValue(testVal)

    const events = wrapper.emitted('changeValue')

    expect(events.length).toBe(4)

    for(const key in keys) {
      expect(events).toContainEqual([{ fieldName: keys[key], newVal: testVal, type: 'card' }])
    }
  })

  it('check that on Account tab all form fields are rendered and emit event on change', () => {
    wrapper.setData({
      tab: 'account'
    })
    const inputs = tabPanes.at(1).findAll('input')
    const keys = Object.keys(form.account)
    const testVal = '22'

    expect(wrapper.vm.tab).toBe('account')
    expect(inputs.length).toBe(3)

    inputs.setValue(testVal)

    const events = wrapper.emitted('changeValue')

    expect(events.length).toBe(3)

    for(const key in keys) {
      expect(events).toContainEqual([{ fieldName: keys[key], newVal: testVal, type: 'account' }])
    }
  })

  it('check that click on Save btn with valid form emits save event', () => {
    expect(wrapper.emitted('save')).toBeFalsy()

    save.trigger('click')

    expect(wrapper.emitted('save')).toBeTruthy()
  })
})
