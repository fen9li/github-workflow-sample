import CouponDelete from './coupon-delete'
import StateDialog from '@lib/components/state-dialog'
import { Button, Dialog } from '@lib/node_modules/element-ui'

const localVue = createLocalVue()
localVue.use(Button)
localVue.use(Dialog)

function createWrapper() {
  const wrapper = mount(CouponDelete, {
    localVue,
    attrs: {
      visible: true,
    },
    stubs: {
      ElIcon: true,
      StateDialog
    },
    propsData: {
      id: 'test-id'
    },
    mocks: {
      $api: {
        delete: jest.fn().mockReturnValue([null, 'done'])
      },
      $notify: jest.fn(),
      $router: {
        push: jest.fn()
      }
    }
  })

  return wrapper
}

describe('packages/payments/src/views/coupon/coupon-delete.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = createWrapper()
  })

  it('exports a valid component', () => {
    expect(CouponDelete).toBeAComponent()
  })

  it('check that click on Delete btn calls api and redirects to coupons view', async () => {
    const submit = wrapper.find('[data-test="submit"]')

    expect(submit.exists()).toBeTruthy()
    submit.trigger('click')

    await expect(wrapper.vm.$api.delete).toHaveBeenCalledWith(`/coupons/${wrapper.vm.id}`)
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'coupons' })
  })
})
