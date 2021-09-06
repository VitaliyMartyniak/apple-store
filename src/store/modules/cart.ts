import { Iphone, Mac, Watch } from '@/types/products'
import axios from 'axios'
import { CartState, RootState } from '@/types/store'
import { ActionContext } from 'vuex'

export default {
  namespaced: true,
  state: {
    products: [],
    isLoading: true
  },
  mutations: {
    setLoading (state: CartState, isLoading: boolean) {
      state.isLoading = isLoading
    },
    setProducts (state: CartState, products: Iphone[] | Mac[] | Watch[]) {
      state.products = products
    },
    addProduct (state: CartState, product: Iphone | Mac | Watch) {
      state.products.push(product)
    },
    addExistingProduct (state: CartState, id: string) {
      const index = state.products.findIndex((product: Iphone | Mac | Watch) => product.id === id)
      state.products[index].countInCart!++
    }
  },
  actions: {
    addProduct ({ commit, state, dispatch }: ActionContext<CartState, RootState>, product: Iphone | Mac | Watch) {
      const existingProduct = state.products.find((e: Iphone | Mac | Watch) => e.id === product.id)
      if (!existingProduct) {
        product.countInCart = 1
        commit('addProduct', product)
      } else {
        commit('addExistingProduct', existingProduct.id)
      }
      dispatch('updateCartList')
    },

    changeProductCount ({ commit, state, dispatch }: ActionContext<CartState, RootState>, product: Iphone | Mac | Watch) {
      const neededProductIndex = state.products.findIndex((e: Iphone | Mac | Watch) => e.id === product.id)
      const products = state.products
      products[neededProductIndex] = product
      commit('setProducts', products)
      dispatch('updateCartList')
    },

    deleteProduct ({ commit, state, dispatch }: ActionContext<CartState, RootState>, id: string) {
      const clearedProducts = state.products.filter((product: Iphone | Mac | Watch) => product.id !== id)
      commit('setProducts', clearedProducts)
      dispatch('updateCartList')
    },

    getCartList ({ commit }: ActionContext<CartState, RootState>) {
      commit('setLoading', true)
      axios.get('https://apple-store-vue3-default-rtdb.firebaseio.com/cart.json').then(response => {
        if (!response.data) {
          commit('setProducts', [])
        } else {
          commit('setProducts', response.data)
        }
        commit('setLoading', false)
      })
    },

    updateCartList ({ state, commit }: ActionContext<CartState, RootState>) {
      commit('setLoading', true)
      axios.put('https://apple-store-vue3-default-rtdb.firebaseio.com/cart.json', state.products)
      commit('setLoading', false)
    },

    submitOrder ({ commit }: ActionContext<CartState, RootState>) {
      commit('setLoading', true)
      commit('setProducts', [])
      axios.put('https://apple-store-vue3-default-rtdb.firebaseio.com/cart.json', [])
      commit('setLoading', false)
    }
  },
  getters: {
    counter (state: CartState) {
      let counter = 0
      if (state.products.length) {
        state.products.forEach((product: Iphone | Mac | Watch) => {
          counter += product.countInCart!
        })
      }
      return counter
    },

    totalSum (state: CartState) {
      let total = 0
      if (state.products.length) {
        state.products.forEach((product: Iphone | Mac | Watch) => {
          total += product.price * product.countInCart!
        })
      }
      return total
    }
  }
}
