import { Iphone, Mac, Watch } from '@/types/products'
import axios from 'axios'

export default {
  namespaced: true,
  state: {
    items: [],
    isLoading: true
  },
  mutations: {
    setLoading (state: any, value: boolean) {
      state.isLoading = value
    },
    setItems (state: any, items: Iphone[] | Mac[] | Watch[]) {
      state.items = items
    },
    addItem (state: any, item: Iphone | Mac | Watch) {
      state.items.push(item)
    },
    addExistingItem (state: any, id: string) {
      const index = state.items.findIndex((item: Iphone | Mac | Watch) => item.id === id)
      state.items[index].countInCart++
    }
  },
  actions: {
    addProduct ({ commit, state, dispatch }: any, product: Iphone | Mac | Watch) {
      const existingItem = state.items.find((item: Iphone | Mac | Watch) => item.id === product.id)
      if (!existingItem) {
        product.countInCart = 1
        commit('addItem', product)
      } else {
        commit('addExistingItem', existingItem.id)
      }
      dispatch('updateCartList')
    },

    changeProductCount ({ commit, state, dispatch }: any, product: Iphone | Mac | Watch) {
      const neededItemIndex = state.items.findIndex((item: Iphone | Mac | Watch) => item.id === product.id)
      const products = state.items
      products[neededItemIndex] = product
      commit('setItems', products)
      dispatch('updateCartList')
    },

    deleteProduct ({ commit, state, dispatch }: any, id: string) {
      const clearedItems = state.items.filter((item: Iphone | Mac | Watch) => item.id !== id)
      commit('setItems', clearedItems)
      dispatch('updateCartList')
    },

    getCartList ({ commit }: any) {
      commit('setLoading', true)
      axios.get('https://apple-store-vue3-default-rtdb.firebaseio.com/cart.json').then(response => {
        if (!response.data) {
          commit('setItems', [])
        } else {
          commit('setItems', response.data)
        }
        commit('setLoading', false)
      })
    },

    updateCartList ({ state, commit }: any) {
      commit('setLoading', true)
      axios.put('https://apple-store-vue3-default-rtdb.firebaseio.com/cart.json', state.items)
      commit('setLoading', false)
    },

    submitOrder ({ commit }: any) {
      commit('setLoading', true)
      commit('setItems', [])
      axios.put('https://apple-store-vue3-default-rtdb.firebaseio.com/cart.json', [])
      commit('setLoading', false)
    }
  },
  getters: {
    counter (state: any) {
      let counter = 0
      if (state.items.length) {
        state.items.forEach((item: Iphone | Mac | Watch) => {
          counter += item.countInCart!
        })
      }
      return counter
    },

    totalSum (state: any) {
      let total = 0
      if (state.items.length) {
        state.items.forEach((item: Iphone | Mac | Watch) => {
          total += item.price * item.countInCart!
        })
      }
      return total
    }
  }
}
