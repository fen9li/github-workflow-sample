import PaymentMethodDelete from './payment-method-delete'
import StateDialog from '@lib/components/state-dialog'
import { Button, Dialog } from '@lib/node_modules/element-ui'

const localVue = createLocalVue()
localVue.use(Button)
localVue.use(Dialog)

function createWrapper() {
  const wrapper = mount(PaymentMethodDelete, {
    localVue,
    attrs: {
      visible: true,
    },
    stubs: {
      ElIcon: true,
      StateDialog
    },
    propsData: {
      method: {
        type: 'card'
      }
    },
  })

  return wrapper
}

describe('packages/payments/src/views/customer/payment-methods/payment-method-delete.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = createWrapper()
  })

  it('exports a valid component', () => {
    expect(PaymentMethodDelete).toBeAComponent()
  })

  it('check that title is changed depending on method type', () => {
    const title = wrapper.find('.title')
    expect(wrapper.vm.method.type).toBe('card')
    expect(title.text()).toBe('Delete Credit/Debit Card')

    wrapper.setProps({
      method: {
        type: 'account'
      }
    })

    expect(title.text()).toBe('Delete Bank Account')
  })

  it('check that click on Delete btn calls api and closes the dialog', () => {
    const submit = wrapper.find('[data-test="submit"]')
    expect(wrapper.emitted('close')).toBeFalsy()

    submit.trigger('click')

    expect(wrapper.emitted('close')).toBeTruthy()

    // TODO: Add check for api method call after backend finished the feature
  })
})
