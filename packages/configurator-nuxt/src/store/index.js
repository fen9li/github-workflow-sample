export const state = () => ({})

export const actions = {
  getProvider(store, providerName) {
    return this.$axios.$get(`config/${providerName}`)
  },
  setProvider(store, { providerName, providerConfig }) {
    return this.$axios.$post(`config/${providerName}`, providerConfig)
  },
  deleteProvider(store, providerName) {
    return this.$axios.$delete(`config/${providerName}`)
  },
}
