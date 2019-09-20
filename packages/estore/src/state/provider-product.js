// import api from '~/api'

const mockedProduct = {
  "created_at": "2019-05-24T04:14:10Z",
  "id": "4B26CDBD-7741-46BA-8F35-4DD39BD0F894",
  "updated_at": "2019-05-24T04:14:10Z",
  "availability": {
    "enabled": true
  },
  "brand": "Fake Brand",
  "currency": "AUD",
  "description": "This is a product used in unit testing. It is not real.",
  "images": [
    "http://supplierb.com.au/SHUSZ10B.jpg"
  ],
  "name": "SHUSZ10B",
  "pricing": {
    "priceAfterTax": null,
    "priceBeforeTax": null
  },
  "providerId": "32DCD851-1D57-4EF1-948D-DDB819EBABB3",
  "shipping": {
    "shippingPrice": null
  }
}

const state = {
  product: {},
}

const getters = {}

const mutations = {
  SET_PRODUCT(state, payload) {
    state.product = payload
  }
}

const actions = {
  getProviderProduct({ commit }) {
    // const result = await api.get('/product', id)
    commit('SET_PRODUCT', mockedProduct)
    // return result
  },
  async deleteProviderProduct(_, id) {
    // const result = await api.delete('/product', id)
    const result = [null, 'response']
    return result
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
}
