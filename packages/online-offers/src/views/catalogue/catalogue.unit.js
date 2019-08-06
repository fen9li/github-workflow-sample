import Vuex from 'vuex'
import uiModule from '../../state/ui'
import Catalogue from './catalogue'
import CatalogueHeader from './catalogue-header'
import CatalogueEditModal from './catalogue-edit-modal.vue'
import LinkModal from './link-modal'
import MainLayout from '@lib/layouts/main'
import catalogueData from '@tests/__fixtures__/catalogue'
import result from '@tests/__fixtures__/merchant'
import feeds from '@tests/__fixtures__/feeds'
import { Button, Tabs, TabPane, Card, Dialog } from '@lib/node_modules/element-ui'

let store
let actions
let getters

jest.mock('./merchants.table')

const localVue = createLocalVue()

localVue.use(Button)
localVue.use(Tabs)
localVue.use(TabPane)
localVue.use(Card)
localVue.use(Dialog)
localVue.use(LinkModal)
localVue.use(CatalogueHeader)
localVue.use(CatalogueEditModal)

localVue.use(Vuex)

function createWrapper() {

  actions = {
    catalogues: {
      getMerchantFromCatalogue: jest.fn(() => Promise.resolve([{}, result])),
    }
  }

  getters = {
    feeds: {
      feeds: jest.fn(() => Promise.resolve([{}, feeds])),
    }
  }

  store = new Vuex.Store({
    modules: {
      ui: {
        namespaced: true,
        uiModule,
      },
      catalogues: {
        namespaced: true,
        actions: actions.catalogues,
      },
      feeds: {
        namespaced: true,
        getters: getters.feeds,
      },
    },
  })

  const wrapper = mount(Catalogue, {
    localVue,
    store,
    stubs: {
      MainLayout,
      TableLayout: true,
      BaseLoader: true,
    },
    mocks: {
      $route: {
        name: 'catalogue-details',
        params: {
          id: 1,
          tab: 'linked',
        },
      },
      $router: {
        currentRoute: {
          query: {
            q: 'foo'
          },
        },
      },
    },
    data: function() {
      return {
        loading: true,
        table: {
          processor: {
            data: [
              'foo',
              'bar'
            ],
          },
          linked: {
            columns: [],
            filters: [],
          },
          unlinked: {
            columns: [],
            filters: [],
          }
        },
        isEdit: false,
        catalogue: catalogueData,
        selectedItems: result.items,
        activeTab: 'linked',
        tabs: [
          { label: 'Linked', name: 'linked' },
          { label: 'Unlinked', name: 'unlinked' },
        ],
      }
    },
  })

  return wrapper
}

describe('packages/online-offers/src/views/catalogue/catalogue.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = createWrapper()
  })

  it('exports a valid component', () => {
    expect(Catalogue).toBeAComponent()
  })

  it('should create wrapper', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('check that merchants table is rendered', () => {
    const details = wrapper.find('tablelayout-stub[table-name="catalogue-details"]')
    expect(details.exists()).toBeTruthy()
  })

  it('check that edit modal is rendered', () => {
    const editBtn = wrapper.find('[data-test="edit"]')
    expect(editBtn.exists()).toBeTruthy()
  })

})

