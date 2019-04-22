import Profile from './profile'
import layouts from '@lib/layouts'

describe('~/views/profile', () => {
  it('is a valid view', () => {
    expect(Profile).toBeAComponent({ user: { name: '' } })
  })

  it(`includes the provided user's name`, () => {
    const localVue = createLocalVue()

    layouts.install(localVue)

    const { element } = shallowMountView(Profile, {
      propsData: {
        user: { name: 'My Name' },
      },
      localVue,
    })

    expect(element.textContent).toMatch(/My Name\s+Profile/)
  })
})
