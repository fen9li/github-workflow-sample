import Catalogues from './catalogues'
import MainLayout from '@lib/layouts/main'
import { Button, Tabs, TabPane } from '@lib/node_modules/element-ui'
import cataloguesTable from '@tests/__fixtures__/tableDataMock'

jest.mock('./catalogues.table')

const localVue = createLocalVue()

localVue.use(Button)
localVue.use(Tabs)
localVue.use(TabPane)

const EditCatalogueModalStub = {
  name: 'EditCatalogueModal',
  template: '<div data-test="modal"/>',
  props: {
    processor: true
  },
}

function createWrapper() {
  const wrapper = mount(Catalogues, {
    localVue,
    stubs: {
      MainLayout,
      EditCatalogueModal: EditCatalogueModalStub,
      TableLayout: true,
    },
    mocks: {
      $route: {
        name: 'catalogue-details',
      },
    },
    data: function() {
      return {
        table: cataloguesTable,
        modal: {
          add: false
        },
      }
    },
  })

  return wrapper
}

describe('packages/online-offers/src/views/catalogues/catalogues.vue', () => {
  let wrapper
  let createModal


  beforeEach(() => {
    wrapper = createWrapper()
    createModal = wrapper.find('editcataloguemodal-stub')
  })

  it('exports a valid component', () => {
    expect(Catalogues).toBeAComponent()
  })

  it('should create wrapper', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('check that clients table is rendered', () => {
    const catalogue = wrapper.find('tablelayout-stub[table-name="catalogue"]')
    expect(catalogue.exists()).toBeTruthy()
  })

  it('check that Add Client button is rendered and opens the modal', () => {
    const addBtn = wrapper.find('[data-test="add"]')
    expect(createModal.exists()).toBeFalsy()
    expect(addBtn.exists()).toBeTruthy()
    expect(wrapper.vm.modal.add).toBeFalsy()

    addBtn.trigger('click')

    createModal = wrapper.find('[data-test="modal"]')
    expect(createModal.exists()).toBeTruthy()
  })
})


