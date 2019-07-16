import PaymentMethodAdd from './payment-method-add'
import customerData from '@tests/__fixtures__/customer'
import { Button, Dialog } from '@lib/node_modules/element-ui'

const localVue = createLocalVue()
localVue.use(Button)
localVue.use(Dialog)

function createWrapper() {
  const wrapper = mount(PaymentMethodAdd, {
    localVue,
    attrs: {
      visible: true,
    },
    propsData: {
      customer: customerData,
    },
    stubs: ['PaymentForm'],
    mocks: {
      $api: {
        post: jest.fn().mockReturnValue([null, 'done'])
      }
    }
  })

  return wrapper
}

describe('packages/payments/src/views/customer/payment-methods/payment-method-add.vue', () => {
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
      name: '1',
      bsb: '1111-1111',
      number: '1111 1111 1111 1111',
    },
    card: {
      name: '1',
      number: '1111 1111 1111 1111',
      expiry: '11/11',
      cvv: '111',
    },
  }

  beforeEach(() => {
    wrapper = createWrapper()
    form = wrapper.find('paymentform-stub')
  })

  it('exports a valid component', () => {
    expect(PaymentMethodAdd).toBeAComponent()
  })

  it('check that new method form is binded correctly to a to new card object', () => {
    const filledCard = filledForm.card
    const emptyCard = emptyForm.card
    expect(wrapper.vm.form.card).toMatchObject(emptyCard)

    for(const item in filledCard) {
      form.vm.$emit('changeValue', { fieldName: item, newVal: filledCard[item], type: 'card' })
    }
    expect(wrapper.vm.form.card).toMatchObject(filledCard)
  })

  it('check that new method form is binded correctly to a to new account object', () => {
    const filledAccount = filledForm.account
    const emptyCard = emptyForm.card
    expect(wrapper.vm.form.card).toMatchObject(emptyCard)

    for(const item in filledAccount) {
      form.vm.$emit('changeValue', { fieldName: item, newVal: filledAccount[item], type: 'account' })
    }
    expect(wrapper.vm.form.account).toMatchObject(filledAccount)
  })

  it('check that Save event from payment form calls api method', () => {
    expect(wrapper.vm.$api.post).not.toHaveBeenCalled()
    form.vm.$emit('save')

    // TODO: Update test params below when backend finishes feature
    expect(wrapper.vm.$api.post).toHaveBeenCalledWith(`/customers/${wrapper.vm.customer.id}/tokens`, { token: '6G2CTP82HK37AZYJHW78' })
  })
})
