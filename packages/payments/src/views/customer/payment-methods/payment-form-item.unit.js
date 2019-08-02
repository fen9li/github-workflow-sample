import PaymentFormItem from './payment-form-item'
import { Button } from '@lib/node_modules/element-ui'

const paymentMethods = [
  {
    value: '1',
    label: '**** 1111',
  },
  {
    value: '2',
    label: '**** 2222'
  }
]

const localVue = createLocalVue()
localVue.use(Button)

function createWrapper() {
  const wrapper = mount(PaymentFormItem, {
    localVue,
    stubs: ['PaymentForm', 'ElSelect', 'ElOption', 'ElFormItem'],
    propsData: {
      paymentMethods,
      displayForm: true,
    },
  })

  return wrapper
}

describe('packages/payments/src/views/customer/payment-methods/payment-form-item.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = createWrapper()
  })

  it('exports a valid component', () => {
    expect(PaymentFormItem).toBeAComponent()
  })

  it('check that by default form is not open if methods are presented', () => {
    wrapper.setProps({
      displayForm: false,
    })
    const form = wrapper.find('paymentform-stub')
    expect(wrapper.vm.paymentMethods.length).toBeTruthy()
    expect(form.exists()).toBeFalsy()
  })

  it('check that click on Add new method btn emits show event', () => {
    wrapper.setProps({
      displayForm: false,
    })

    const add = wrapper.find('[data-test="add"]')

    add.trigger('click')

    expect(wrapper.emitted('showForm')[0]).toEqual([true])
  })

  it('check that form cannot be closed if no payment methods presented', () => {
    const close = wrapper.find('[data-test="close"]')

    expect(close.exists()).toBeTruthy()

    wrapper.setProps({
      paymentMethods: [],
      displayForm: true,
    })

    expect(close.exists()).toBeFalsy()
  })

  it('check that click on Close icon emits close event', () => {
    const close = wrapper.find('[data-test="close"]')

    close.trigger('click')

    expect(wrapper.emitted('showForm')[0]).toEqual([false])
  })

  it('check that Save method worlk correctly', () => {
    const form = wrapper.find('paymentform-stub')

    form.vm.$emit('save')

    expect(wrapper.emitted('showForm')[0]).toEqual([false])

    // TODO: Later on add api method call check after backend implementation
  })
})

describe('packages/payments/src/views/customer/payment-methods/payment-form-item.vue', () => {
  let wrapper
  let form

  const emptyForm = {
    account: {
      name: '',
      bsb: '',
      number: '',
    },
    card: {
      name: '',
      number: '',
      expiry: '',
      cvv: '',
    },
  }

  const filledForm = {
    account: {
      name: 'test-name',
      bsb: '1111-1111',
      number: '1111 1111 1111 1111',
    },
    card: {
      name: 'test-name',
      number: '1111 1111 1111 1111',
      expiry: '11/11',
      cvv: '111',
    },
  }

  beforeEach(() => {
    wrapper = createWrapper()
    form = wrapper.find('paymentform-stub')
  })

  it('check that new method form is binded correctly to a to new card object', () => {
    const filledCard = filledForm.card
    const emptyCard = emptyForm.card
    expect(wrapper.vm.form.card).toMatchObject(emptyCard)

    for(const item in filledCard) {
      if(filledCard.hasOwnProperty(item)) {
        form.vm.$emit('changeValue', { fieldName: item, newVal: filledCard[item], type: 'card' })
      }
    }
    expect(wrapper.vm.form.card).toMatchObject(filledCard)
  })

  it('check that new method form is binded correctly to a to new account object', () => {
    const filledAccount = filledForm.account
    const emptyCard = emptyForm.card
    expect(wrapper.vm.form.card).toMatchObject(emptyCard)

    for(const item in filledAccount) {
      if(filledAccount.hasOwnProperty(item)) {
        form.vm.$emit('changeValue', { fieldName: item, newVal: filledAccount[item], type: 'account' })
      }
    }
    expect(wrapper.vm.form.account).toMatchObject(filledAccount)
  })
})
