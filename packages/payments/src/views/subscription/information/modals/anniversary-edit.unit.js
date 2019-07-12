import AnniversaryEdit from './anniversary-edit'
import subscriptionData from '@tests/__fixtures__/subscription'
import { Button, Dialog, Form, FormItem, Input, DatePicker } from '@lib/node_modules/element-ui'

const localVue = createLocalVue()
localVue.use(Button)
localVue.use(Dialog)
localVue.use(Form)
localVue.use(FormItem)
localVue.use(Input)
localVue.use(DatePicker)


function createWrapper() {
  const wrapper = mount(AnniversaryEdit, {
    localVue,
    attrs: {
      visible: true,
    },
    propsData: {
      subscription: subscriptionData,
      customerName: 'Test Name',
    },
    stubs: {
      ElTooltip: true,
    },
    mocks: {
      $api: {
        put: jest.fn().mockReturnValue([null, 'done']),
      },
      $notify: jest.fn(),
    },
  })

  return wrapper
}

describe('packages/payments/src/views/subscription/information/modals/anniversary-edit', () => {
  let wrapper

  beforeEach(() => {
    wrapper = createWrapper()
  })

  it('exports a valid component', () => {
    expect(AnniversaryEdit).toBeAComponent()
  })

  it('check that form and all fields are rendered', () => {
    const form = wrapper.find('.el-form')
    const formItems = wrapper.findAll('.el-form-item')
    expect(form.exists()).toBeTruthy()
    expect(formItems.length).toBe(3)
  })

  it('check that customer and current anniversary are not editable', () => {
    const customer = wrapper.find('[data-test="customer"]')
    expect(customer.exists()).toBeTruthy()
    expect(customer.attributes('disabled')).toBeTruthy()

    const currentAnniversary = wrapper.find('[data-test="currentAnniversary"] > input')
    expect(currentAnniversary.exists()).toBeTruthy()
    expect(currentAnniversary.attributes('disabled')).toBeTruthy()
  })

  it('check that note is rendered', () => {
    const note = wrapper.find('.modal-note__text')
    expect(note.exists()).toBeTruthy()
    expect(note.text()).toBe('Changing the Subscription Anchor Date may cause changes to payment dates and the subscription balance.')
  })

  it('check Save btn is rendered and submits the form', () => {
    const submit = wrapper.find('[data-test="submit"]')
    const newDate = '2019-10-24T04:59:29Z'

    expect(submit.exists()).toBeTruthy()

    wrapper.setData({
      form: {
        newDate,
      },
    })

    submit.trigger('click')

    expect(wrapper.vm.$api.put).toHaveBeenCalledWith(
      `/subscriptions/${wrapper.vm.subscription.id}/anniversary`,
      {
        'new_anniversary_date': wrapper.vm.form.newDate }
    )
  })
})
