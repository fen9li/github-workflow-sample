import api from '@lib/api'

export const actions = {
  async GET_PRODUCT_PLANS({ commmit }, payload) {
    // TODO: Switch to new API endpoint, when ready. Pending PYMT-950
    const [, response] = await api.post(`${process.env.VUE_APP_API_URL}/search/subscription-product-pricing-plans/_search`,
      { query: { match: { productId: payload } } }
    )

    if(response) {
      const formated = []
      response.hits.hits.forEach(item => {
        const value = item._source.billingInterval
        const index = formated.findIndex(form => form.value === value)

        if(index === -1) {

          let label = ''
          switch(value) {
            case 'P1M': label = 'Monthly'
              break
            case 'P3M': label = 'Quarterly'
              break
            case 'P1Y': label = 'Yearly'
              break
          }

          formated.push({ value, label })
        }
      })

      return formated
    }
  }
}
