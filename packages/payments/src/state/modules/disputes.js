import axios from 'axios'

export const state = {
  data: [],
  columns: {},
  pagination: {},
  loading: true,
}

export const getters = {
  data: state => state.data,
  columns: state => state.columns,
  pagination: state => state.pagination,
  loading: state => state.loading,
}

export const mutations = {
  SET_DATA(state, newData) {
    state.data = newData
  },
  SET_COLUMNS(state, newColumns) {
    state.columns = newColumns
  },
  SET_PAGINATION(state, newPagination) {
    state.pagination = newPagination
  },
  SET_LOADING(state, flag) {
    state.loading = flag
  },
}

export const actions = {
  getData({ commit }, query) {
    commit('SET_LOADING', true)

    return axios.get(`/api/disputes?q=${query}`).then(({ data }) => {
      commit('SET_DATA', data.data)
      commit('SET_COLUMNS', data.columns)
      commit('SET_PAGINATION', data.pagination)
      commit('SET_LOADING', false)
    })
  },
}
