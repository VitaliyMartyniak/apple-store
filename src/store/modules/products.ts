import { Iphone, Mac, Watch } from '@/types/products'
import axios from 'axios'

export default {
  namespaced: true,
  state: {
    items: [],
    singleProduct: null,
    isLoading: true
  },
  mutations: {
    setItems (state: any, items: Iphone[] | Mac[] | Watch[]) {
      state.items = items
    },
    setSingleProduct (state: any, item: Iphone | Mac | Watch) {
      state.singleProduct = item
    },
    setLoading (state: any, value: boolean) {
      state.isLoading = value
    }
  },
  getters: {
    maxPrice (state: any) {
      let result = 1
      state.items.forEach((item: Iphone | Mac | Watch) => {
        if (item.price > result) {
          result = item.price
        }
      })
      return result
    },
    minPrice (state: any) {
      let result = 0
      state.items.forEach((item: Iphone | Mac | Watch, index: number) => {
        if (index === 0) {
          result = item.price
        }
        if (item.price < result) {
          result = item.price
        }
      })
      return result
    }
  },
  actions: {
    loadAll ({ commit, dispatch }: any, route: any) {
      commit('setLoading', true)
      axios.get(`https://apple-store-vue3-default-rtdb.firebaseio.com/${route.params.productType}.json`).then(response => {
        if (response.data.length) {
          commit('setItems', response.data)
          commit('filters/setFilteredItems', response.data, { root: true })
          if (route.query.page) {
            dispatch('pagination/setupPagination', +route.query.page, { root: true })
          } else {
            dispatch('pagination/setupPagination', 1, { root: true })
          }
          commit('setLoading', false)
        }
      })
    },
    loadSingleProduct ({ commit }: any, { productType, id }: any) {
      commit('setLoading', true)
      axios.get(`https://apple-store-vue3-default-rtdb.firebaseio.com/${productType}.json`).then(response => {
        if (response.data.length) {
          const singleProduct = response.data.find((e: Iphone | Mac | Watch) => e.id === id)
          commit('setSingleProduct', singleProduct)
        }
        commit('setLoading', false)
      })
    }
  }
}
