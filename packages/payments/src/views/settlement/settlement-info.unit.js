import settlementInfo from './settlement-info'
import { Card } from '@lib/node_modules/element-ui'
import settlementData from '@tests/__fixtures__/settlement-details'

const localVue = createLocalVue()
localVue.use(Card)

localVue.directive('loading', () => {})

function createWrapper() {
  const wrapper = shallowMount(settlementInfo, {
    localVue,
    propsData: {
      settlement: settlementData,
    },
    methods: {
      formatDate: () => '',
    },
  })

  return wrapper
}

describe('packages/payments/src/views/settlement/settlement-info.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = createWrapper()
  })

  it('exports a valid component', () => {
    expect(settlementInfo).toBeAComponent()
  })

  it('check that General info block is rendered', () => {
    const list = wrapper.find('.datalist')
    const listItems = wrapper.findAll('dd')
    expect(list.exists()).toBeTruthy()
    expect(listItems.length).toBe(10)
  })

  it('check that settlement status is calculated correctly', () => {
    const header = wrapper.find('.status')
    const status = wrapper.find('.statusValue')
    expect(status.exists()).toBeTruthy()
    expect(wrapper.vm.settlement.status).toBe(5)
    expect(status.text()).toBe('Failed')
    expect(status.contains('.el-icon-close')).toBeTruthy()
    expect(header.attributes('style')).toBe('color: rgb(255, 0, 0);')

    wrapper.setProps({
      settlement: {
        ...settlementData,
        status: 'pending',
      },
    })

    expect(status.text()).toBe('Pending')
    expect(status.contains('.el-icon-time')).toBeTruthy()
    expect(header.attributes('style')).toBe('color: rgb(251, 178, 65);')

    wrapper.setProps({
      settlement: {
        ...settlementData,
        status: 'successful',
      },
    })

    expect(status.text()).toBe('Successfull')
    expect(status.contains('.el-icon-check')).toBeTruthy()
    expect(header.attributes('style')).toBe('color: rgb(41, 215, 55);')
  })

  it('check that warning is displayed if status is failed', () => {
    let warning = wrapper.find('.warningWrapper')
    expect(wrapper.vm.settlement.status).toBe(5)
    expect(wrapper.vm.showWarning).toBeTruthy()
    expect(warning.exists()).toBeTruthy()

    wrapper.setProps({
      settlement: {
        ...settlementData,
        status: 'pending',
      },
    })

    warning = wrapper.find('.warningWrapper')
    expect(wrapper.vm.showWarning).toBeFalsy()
    expect(warning.exists()).toBeFalsy()
  })

  it('check that warning can be closed', () => {
    expect(wrapper.vm.settlement.status).toBe(5)
    let warning = wrapper.find('.warningWrapper')
    const close = warning.find('.el-icon-close')
    expect(wrapper.vm.showWarning).toBeTruthy()
    expect(warning.exists()).toBeTruthy()

    close.trigger('click')

    warning = wrapper.find('.warningWrapper')
    expect(wrapper.vm.showWarning).toBeFalsy()
    expect(warning.exists()).toBeFalsy()
  })
})
