import { Iphone, Mac, Watch } from '@/types/products'
import axios from 'axios'
import { ProductsState, RootState } from '@/types/store'
import { ActionContext } from 'vuex'

export default {
  namespaced: true,
  state: {
    products: [],
    singleProduct: null,
    isLoading: true
  },
  mutations: {
    setProducts (state: ProductsState, products: Iphone[] | Mac[] | Watch[]) {
      state.products = products
    },
    setSingleProduct (state: ProductsState, product: Iphone | Mac | Watch) {
      state.singleProduct = product
    },
    setLoading (state: ProductsState, isLoading: boolean) {
      state.isLoading = isLoading
    }
  },
  getters: {
    maxPrice (state: ProductsState) {
      let result = 1
      state.products.forEach((product: Iphone | Mac | Watch) => {
        if (product.price > result) {
          result = product.price
        }
      })
      return result
    },
    minPrice (state: ProductsState) {
      let result = 0
      state.products.forEach((product: Iphone | Mac | Watch, index: number) => {
        if (index === 0) {
          result = product.price
        }
        if (product.price < result) {
          result = product.price
        }
      })
      return result
    }
  },
  actions: {
    loadAll ({ commit, dispatch }: ActionContext<ProductsState, RootState>, route: any) {
      commit('setLoading', true)
      axios.get(`https://apple-store-vue3-default-rtdb.firebaseio.com/${route.params.productType}.json`).then(response => {
        if (response.data.length) {
          commit('setProducts', response.data)
          commit('filters/setFilteredProducts', response.data, { root: true })
          if (route.query.page) {
            dispatch('pagination/setupPagination', +route.query.page, { root: true })
          } else {
            dispatch('pagination/setupPagination', 1, { root: true })
          }
          commit('setLoading', false)
        }
      })
    },
    loadSingleProduct ({ commit }: ActionContext<ProductsState, RootState>, { productType, id }: any) {
      commit('setLoading', true)
      axios.get(`https://apple-store-vue3-default-rtdb.firebaseio.com/${productType}.json`).then(response => {
        if (response.data.length) {
          const singleProduct = response.data.find((product: Iphone | Mac | Watch) => product.id === id)
          commit('setSingleProduct', singleProduct)
        }
        commit('setLoading', false)
      })
    }
  }
}
