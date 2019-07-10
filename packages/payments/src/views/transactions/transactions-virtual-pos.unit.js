import VirtualPos from './transactions-virtual-pos'
import { Button, Dialog, Input, FormItem, Form } from '@lib/node_modules/element-ui'

const localVue = createLocalVue()
localVue.use(Button)
localVue.use(Dialog)
localVue.use(Input)
localVue.use(FormItem)
localVue.use(Form)


function createWrapper() {
  const wrapper = mount(VirtualPos, {
    localVue,
    stubs: {
      ElSelect: true,
      ElOption: true,
    },
    attrs: {
      visible: true,
    },
  })

  return wrapper
}

describe('packages/payments/src/views/transactions/transactions-virtual-pos.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = createWrapper()
  })

  it('exports a valid component', () => {
    expect(VirtualPos).toBeAComponent()
  })

  it('check that form with all fields are rendered', () => {
    const form = wrapper.find('.el-form')
    const formItems = form.findAll('.el-input')
    expect(form.exists()).toBeTruthy()
    expect(formItems.length).toBe(6)
  })

  it('check amount field is rendered and binded to the form', () => {
    const amount = wrapper.find('[data-test="amount"]')
    expect(wrapper.vm.form.amount).toEqual('')
    const value = '1.1'
    expect(amount.exists()).toBeTruthy()
    amount.setValue(value)
    expect(wrapper.vm.form.amount).toEqual(value)
  })

  it('check name field is rendered and binded to the form', () => {
    const name = wrapper.find('[data-test="name"]')
    expect(wrapper.vm.form.name).toEqual('')
    const value = 'Test name'
    expect(name.exists()).toBeTruthy()
    name.setValue(value)
    expect(wrapper.vm.form.name).toEqual(value)
  })

  it('check number field is rendered and binded to the form', () => {
    const number = wrapper.find('[data-test="number"]')
    expect(wrapper.vm.form.number).toEqual('')
    const value = '1111 1111 1111 1111'
    expect(number.exists()).toBeTruthy()
    number.setValue(value)
    expect(wrapper.vm.form.number).toEqual(value)
  })

  it('check expiry field is rendered and binded to the form', () => {
    const expiry = wrapper.find('[data-test="expiry"]')
    expect(wrapper.vm.form.expiry).toEqual('')
    const value = '22/22'
    expect(expiry.exists()).toBeTruthy()
    expiry.setValue(value)
    expect(wrapper.vm.form.expiry).toEqual(value)
  })

  it('check cvv field is rendered and binded to the form', () => {
    const cvv = wrapper.find('[data-test="cvv"]')
    expect(wrapper.vm.form.cvv).toEqual('')
    const value = '222'
    expect(cvv.exists()).toBeTruthy()
    cvv.setValue(value)
    expect(wrapper.vm.form.cvv).toEqual(value)
  })

  it('check email field is rendered and binded to the form', () => {
    const email = wrapper.find('[data-test="email"]')
    expect(wrapper.vm.form.email).toEqual('')
    const value = 'test@test.com'
    expect(email.exists()).toBeTruthy()
    email.setValue(value)
    expect(wrapper.vm.form.email).toEqual(value)
  })

  it('check Process Charge button is rendered and submits', () => {
    wrapper.setMethods({
      onSubmit: jest.fn(),
    })
    const submit = wrapper.find('[data-test="submit"]')

    submit.trigger('click')
    expect(wrapper.vm.onSubmit).toHaveBeenCalled()
  })
})
