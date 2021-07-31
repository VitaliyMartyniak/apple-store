import { Iphone, Mac, ProductType, Watch } from '@/types/products'

export default {
  namespaced: true,
  state: {
    items: []
  },
  mutations: {
    setItems (state: any, items: Iphone[] | Mac[] | Watch[]) {
      state.items = items
    }
  },
  actions: {
    getItems ({ commit }: any, payload: ProductType) {
      if (payload === 'iphone') {
        commit('setItems', [
          {
            model: 'iPhone 11 Pro Max',
            color: 'Midnight Green',
            memory: 64,
            hasTwoSim: 'no',
            condition: 'new',
            price: 1249,
            photo: '11pro-green',
            id: '1'
          },
          {
            model: 'iPhone 11 Pro Max',
            color: 'Space Gray',
            memory: 256,
            hasTwoSim: 'yes',
            condition: 'used',
            price: 1299,
            photo: '11pro-space',
            id: '2'
          },
          {
            model: 'iPhone 11 Pro Max',
            color: 'Silver',
            memory: 256,
            hasTwoSim: 'no',
            condition: 'used',
            price: 1199,
            photo: '11pro-silver',
            id: '3'
          }
        ])
      } else if (payload === 'mac') {
        commit('setItems', [
          {
            model: 'MacBook Pro',
            diagonal: '13 inches',
            memory: '128GB (SSD)',
            color: 'Silver',
            hasTouchBar: 'no',
            price: 1339,
            photo: 'macbook-13-silver',
            id: '60'
          },
          {
            model: 'MacBook Pro',
            diagonal: '13 inches',
            memory: '256GB (SSD)',
            color: 'Space Gray',
            hasTouchBar: 'no',
            price: 1795,
            photo: 'macbook-13-space',
            id: '61'
          },
          {
            model: 'MacBook Pro',
            diagonal: '13 inches',
            memory: '512GB (SSD)',
            color: 'Space Gray',
            hasTouchBar: 'yes',
            price: 2095,
            photo: 'macbook-13-space-touchbar',
            id: '62'
          }
        ])
      } else if (payload === 'watch') {
        commit('setItems', [
          {
            generation: 3,
            model: 'Apple Watch Sport',
            size: 38,
            color: 'Space Gray',
            strapSeries: 'Sport Band',
            strapColor: 'Black',
            price: 289,
            photo: 'sport-38-space',
            id: '78'
          },
          {
            generation: 3,
            model: 'Apple Watch Sport',
            size: 38,
            color: 'Silver',
            strapSeries: 'Sport Band',
            strapColor: 'White',
            price: 289,
            photo: 'sport-38-silver',
            id: '79'
          },
          {
            generation: 3,
            model: 'Apple Watch Sport',
            size: 42,
            color: 'Space Gray',
            strapSeries: 'Sport Band',
            strapColor: 'Black',
            price: 355,
            photo: 'sport-42-space',
            id: '80'
          }
        ])
      }
    }
  }
}
