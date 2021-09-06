import { Iphone, Mac, Watch } from '@/types/products'
import _ from 'lodash'
import { PaginationState, RootState } from '@/types/store'
import { ActionContext } from 'vuex'

export default {
  namespaced: true,
  state: {
    page: 1,
    pageSize: 9,
    pageCount: 0,
    paginatedProducts: []
  },
  mutations: {
    setPage (state: PaginationState, page: number) {
      state.page = page
    },
    setPageCount (state: PaginationState, pageCount: number) {
      state.pageCount = pageCount
    },
    setPaginatedProducts (state: PaginationState, products: Iphone[] | Mac[] | Watch[]) {
      state.paginatedProducts = products
    },
    setPageSize (state: PaginationState, pageSize: number) {
      state.pageSize = pageSize
    }
  },
  actions: {
    setPageSize ({ commit, dispatch }: ActionContext<PaginationState, RootState>, pageSize: number) {
      commit('setPageSize', pageSize)
      dispatch('setupPagination')
    },
    // changePage ({ state, commit }: any, payload: number) {
    //   const products = _.chunk(state.products, state.pageSize)
    //   const paginatedProducts = products[payload - 1] || products[0]
    //   commit('setPage', payload)
    //   commit('setPaginatedProducts', paginatedProducts)
    // },
    setupPagination ({ state, commit, rootState }: ActionContext<PaginationState, RootState>, page: number) {
      const products = _.chunk(rootState.filters.filteredProducts, state.pageSize)
      const pageCount = _.size(products)
      commit('setPageCount', pageCount)
      let paginatedProducts = []
      if (page) {
        commit('setPage', page)
        paginatedProducts = products[page - 1]
      } else {
        paginatedProducts = products[state.page - 1]
      }
      commit('setPaginatedProducts', paginatedProducts)
    }
  }
}
