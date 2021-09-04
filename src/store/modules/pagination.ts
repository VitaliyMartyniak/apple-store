import { Iphone, Mac, Watch } from '@/types/products'
import _ from 'lodash'

export default {
  namespaced: true,
  state: {
    page: 1,
    pageSize: 9,
    pageCount: 0,
    paginatedItems: []
  },
  mutations: {
    setPage (state: any, value: number) {
      state.page = value
    },
    setPageCount (state: any, value: number) {
      state.pageCount = value
    },
    setPaginatedItems (state: any, items: Iphone[] | Mac[] | Watch[]) {
      state.paginatedItems = items
    },
    setPageSize (state: any, value: number) {
      state.pageSize = value
    }
  },
  actions: {
    setPageSize ({ commit, dispatch }: any, value: number) {
      commit('setPageSize', value)
      dispatch('setupPagination')
    },
    // changePage ({ state, commit }: any, payload: number) {
    //   const items = _.chunk(state.items, state.pageSize)
    //   const paginatedItems = items[payload - 1] || items[0]
    //   commit('setPage', payload)
    //   commit('setPaginatedItems', paginatedItems)
    // },
    setupPagination ({ state, commit, rootState }: any, payload: number) {
      const items = _.chunk(rootState.filters.filteredItems, state.pageSize)
      const pageCount = _.size(items)
      commit('setPageCount', pageCount)
      let paginatedItems = []
      if (payload) {
        commit('setPage', payload)
        paginatedItems = items[payload - 1]
      } else {
        paginatedItems = items[state.page - 1]
      }
      commit('setPaginatedItems', paginatedItems)
    }
  }
}
