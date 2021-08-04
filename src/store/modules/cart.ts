import { Iphone, Mac, Watch } from '@/types/products'

export default {
  namespaced: true,
  state: {
    items: []
  },
  mutations: {
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
    addProduct ({ commit, state }: any, product: Iphone | Mac | Watch) {
      const existingItem = state.items.find((item: Iphone | Mac | Watch) => item.id === product.id)
      if (!existingItem) {
        product.countInCart = 1
        commit('addItem', product)
      } else {
        commit('addExistingItem', existingItem.id)
      }
    },

    deleteProduct ({ commit, state }: any, id: string) {
      const clearedItems = state.items.filter((item: Iphone | Mac | Watch) => item.id !== id)
      commit('setItems', clearedItems)
    },

    submitOrder ({ commit }: any) {
      commit('setItems', [])
    }
  },
  getters: {
    counter (state: any) {
      let counter = 0
      state.items.forEach((item: Iphone | Mac | Watch) => {
        counter += item.countInCart!
      })
      return counter
    },

    totalSum (state: any) {
      let total = 0
      state.items.forEach((item: Iphone | Mac | Watch) => {
        total += item.price * item.countInCart!
      })
      return total
    }
  }
}
