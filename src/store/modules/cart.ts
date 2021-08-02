import { Iphone, Mac, Watch } from '@/types/products'

export default {
  namespaced: true,
  state: {
    items: []
  },
  mutations: {
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
      console.log('items', state.items)
    }
  },
  getters: {
    counter (state: any) {
      let counter = 0
      state.items.forEach((item: Iphone | Mac | Watch) => {
        counter += item.countInCart!
      })
      return counter
    }
  }
}
