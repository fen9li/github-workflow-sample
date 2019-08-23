// Temporary EoneoPay JS SDK added as a file for development process
import EoneoPay from '../eoneopay'
import capitalize from 'lodash/capitalize'

export const actions = {
  EONEO_TOKENISE({ commit }, payload) {
    return new EoneoPay(payload)
  },

  async addPaymentMethod({ dispatch }, payload) {
    let response
    const params = {}
    const EONEO = await dispatch('EONEO_TOKENISE', payload.token)

    if(payload.type === 'card') {
      params.validate = 'validateCardNumber'
      params.tokenise = 'tokeniseCard'
      params.data = payload.card
    } else if(payload.type === 'account'){
      params.validate = 'validateAccountNumber'
      params.tokenise = 'tokeniseAccount'
      params.data = payload.account
    }

    const isValid = await EONEO[params.validate](params.data.number)

    if(!isValid) {
      return [{ message: `${capitalize(payload.type)} number is not valid` }, null]
    } else {
      try {
        response =  await EONEO[params.tokenise](params.data)
        return response.code ? [response, null] : [null, response]
      } catch(error) {
        return [{ message: error.message }, null]
      }
    }
  },
  async getCardType({ dispatch }, payload) {
    const EONEO = await dispatch('EONEO_TOKENISE', payload.token)

    return EONEO.getPaymentSystem(payload.number)
  }
}
