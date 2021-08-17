import { Iphone, Mac, ProductType, Watch } from '@/types/products'
import _ from 'lodash'

export default {
  namespaced: true,
  state: {
    items: [],
    page: 1,
    pageSize: 9,
    pageCount: 0,
    paginatedItems: [],
    value: null
  },
  mutations: {
    setItems (state: any, items: Iphone[] | Mac[] | Watch[]) {
      state.items = items
    },
    setPage (state: any, value: number) {
      state.page = value
    },
    setPageCount (state: any, value: number) {
      state.pageCount = value
    },
    setPaginatedItems (state: any, items: Iphone[] | Mac[] | Watch[]) {
      state.paginatedItems = items
    },
    setValue (state: any, value: any[]) {
      console.log('value', value)
      state.value = value
    }
  },
  getters: {
    value (state: any) {
      return state.value
    },
    maxPrice (state: any) {
      let result = 0
      state.items.forEach((item: Iphone | Mac | Watch) => {
        if (item.price > result) {
          result = item.price
        }
      })
      return result
    }
  },
  actions: {
    setPriceFilter ({ commit }: any, payload: number) {
      commit('setValue', [0, payload])
    },
    // changePage ({ state, commit }: any, payload: number) {
    //   const items = _.chunk(state.items, state.pageSize)
    //   const paginatedItems = items[payload - 1] || items[0]
    //   commit('setPage', payload)
    //   commit('setPaginatedItems', paginatedItems)
    // },
    setupPagination ({ state, commit }: any, payload: number) {
      commit('setPage', payload)
      const items = _.chunk(state.items, state.pageSize)
      const pageCount = _.size(items)
      commit('setPageCount', pageCount)
      let paginatedItems = []
      paginatedItems = items[payload - 1]
      commit('setPaginatedItems', paginatedItems)
    },
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
            countInCart: 1,
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
            countInCart: 1,
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
            countInCart: 1,
            id: '3'
          },
          {
            model: 'iPhone 11 Pro Max',
            color: 'Gold',
            memory: 512,
            hasTwoSim: 'yes',
            condition: 'used',
            price: 1499,
            photo: '11pro-gold',
            countInCart: 1,
            id: '4'
          },
          {
            model: 'iPhone 11 Pro Max',
            color: 'Space Gray',
            memory: 512,
            hasTwoSim: 'yes',
            condition: 'new',
            price: 1599,
            photo: '11pro-space',
            countInCart: 1,
            id: '5'
          },
          {
            model: 'iPhone 11 Pro',
            color: 'Space Gray',
            memory: 64,
            hasTwoSim: 'no',
            condition: 'new',
            price: 1149,
            photo: '11pro-space',
            countInCart: 1,
            id: '6'
          },
          {
            model: 'iPhone 11 Pro',
            color: 'Space Gray',
            memory: 256,
            hasTwoSim: 'yes',
            condition: 'used',
            price: 1249,
            photo: '11pro-space',
            countInCart: 1,
            id: '7'
          },
          {
            model: 'iPhone 11 Pro',
            color: 'Silver',
            memory: 256,
            hasTwoSim: 'no',
            condition: 'used',
            price: 1199,
            photo: '11pro-silver',
            countInCart: 1,
            id: '8'
          },
          {
            model: 'iPhone 11 Pro',
            color: 'Midnight Green',
            memory: 512,
            hasTwoSim: 'no',
            condition: 'new',
            price: 1529,
            photo: '11pro-green',
            countInCart: 1,
            id: '9'
          },
          {
            model: 'iPhone 11 Pro',
            color: 'Gold',
            memory: 512,
            hasTwoSim: 'yes',
            condition: 'used',
            price: 1349,
            photo: '11pro-gold',
            countInCart: 1,
            id: '10'
          },
          {
            model: 'iPhone 11',
            color: 'Black',
            memory: 64,
            hasTwoSim: 'no',
            condition: 'new',
            price: 829,
            photo: '11-black',
            countInCart: 1,
            id: '11'
          },
          {
            model: 'iPhone 11',
            color: 'Yellow',
            memory: 64,
            hasTwoSim: 'no',
            condition: 'used',
            price: 749,
            photo: '11-yellow',
            countInCart: 1,
            id: '12'
          },
          {
            model: 'iPhone 11',
            color: 'Purple',
            memory: 128,
            hasTwoSim: 'yes',
            condition: 'new',
            price: 1029,
            photo: '11-purple',
            countInCart: 1,
            id: '13'
          },
          {
            model: 'iPhone 11',
            color: 'Green',
            memory: 128,
            hasTwoSim: 'no',
            condition: 'used',
            price: 849,
            photo: '11-green',
            countInCart: 1,
            id: '14'
          },
          {
            model: 'iPhone 11',
            color: 'White',
            memory: 256,
            hasTwoSim: 'no',
            condition: 'used',
            price: 1049,
            photo: '11-white',
            countInCart: 1,
            id: '15'
          },
          {
            model: 'iPhone 11',
            color: 'Red',
            memory: 256,
            hasTwoSim: 'yes',
            condition: 'new',
            price: 1149,
            photo: '11-red',
            countInCart: 1,
            id: '16'
          },
          {
            model: 'iPhone XS Max',
            color: 'Space Gray',
            memory: 64,
            hasTwoSim: 'no',
            condition: 'used',
            price: 849,
            photo: 'xs-space',
            countInCart: 1,
            id: '17'
          },
          {
            model: 'iPhone XS Max',
            color: 'Space Gray',
            memory: 64,
            hasTwoSim: 'no',
            condition: 'used',
            price: 849,
            photo: 'xs-space',
            countInCart: 1,
            id: '18'
          },
          {
            model: 'iPhone XS Max',
            color: 'Silver',
            memory: 256,
            hasTwoSim: 'no',
            condition: 'new',
            price: 1029,
            photo: 'xs-silver',
            countInCart: 1,
            id: '19'
          },
          {
            model: 'iPhone XS Max',
            color: 'Gold',
            memory: 256,
            hasTwoSim: 'no',
            condition: 'used',
            price: 949,
            photo: 'xs-gold',
            countInCart: 1,
            id: '20'
          },
          {
            model: 'iPhone XS Max',
            color: 'Gold',
            memory: 512,
            hasTwoSim: 'yes',
            condition: 'new',
            price: 1149,
            photo: 'xs-gold',
            countInCart: 1,
            id: '21'
          },
          {
            model: 'iPhone XS',
            color: 'Silver',
            memory: 64,
            hasTwoSim: 'no',
            condition: 'new',
            price: 749,
            photo: 'xs-silver',
            countInCart: 1,
            id: '22'
          },
          {
            model: 'iPhone XS',
            color: 'Gold',
            memory: 64,
            hasTwoSim: 'no',
            condition: 'used',
            price: 649,
            photo: 'xs-gold',
            countInCart: 1,
            id: '23'
          },
          {
            model: 'iPhone XS',
            color: 'Space Gray',
            memory: 256,
            hasTwoSim: 'no',
            condition: 'used',
            price: 849,
            photo: 'xs-space',
            countInCart: 1,
            id: '24'
          },
          {
            model: 'iPhone XS',
            color: 'Silver',
            memory: 256,
            hasTwoSim: 'no',
            condition: 'new',
            price: 969,
            photo: 'xs-silver',
            countInCart: 1,
            id: '25'
          },
          {
            model: 'iPhone XS',
            color: 'Gold',
            memory: 512,
            hasTwoSim: 'no',
            condition: 'new',
            price: 1089,
            photo: 'xs-gold',
            countInCart: 1,
            id: '26'
          },
          {
            model: 'iPhone XR',
            color: 'Black',
            memory: 64,
            hasTwoSim: 'no',
            condition: 'new',
            price: 679,
            photo: 'xr-black',
            countInCart: 1,
            id: '27'
          },
          {
            model: 'iPhone XR',
            color: 'White',
            memory: 64,
            hasTwoSim: 'no',
            condition: 'new',
            price: 679,
            photo: 'xr-white',
            countInCart: 1,
            id: '28'
          },
          {
            model: 'iPhone XR',
            color: 'Coral',
            memory: 64,
            hasTwoSim: 'yes',
            condition: 'used',
            price: 549,
            photo: 'xr-coral',
            countInCart: 1,
            id: '29'
          },
          {
            model: 'iPhone XR',
            color: 'Blue',
            memory: 128,
            hasTwoSim: 'yes',
            condition: 'new',
            price: 879,
            photo: 'xr-blue',
            countInCart: 1,
            id: '30'
          },
          {
            model: 'iPhone XR',
            color: 'Black',
            memory: 128,
            hasTwoSim: 'no',
            condition: 'new',
            price: 819,
            photo: 'xr-black',
            countInCart: 1,
            id: '31'
          },
          {
            model: 'iPhone XR',
            color: 'Red',
            memory: 128,
            hasTwoSim: 'no',
            condition: 'used',
            price: 729,
            photo: 'xr-red',
            countInCart: 1,
            id: '32'
          },
          {
            model: 'iPhone XR',
            color: 'Yellow',
            memory: 256,
            hasTwoSim: 'no',
            condition: 'used',
            price: 849,
            photo: 'xr-yellow',
            countInCart: 1,
            id: '33'
          },
          {
            model: 'iPhone XR',
            color: 'White',
            memory: 256,
            hasTwoSim: 'no',
            condition: 'new',
            price: 949,
            photo: 'xr-white',
            countInCart: 1,
            id: '34'
          },
          {
            model: 'iPhone X',
            color: 'Space Gray',
            memory: 64,
            hasTwoSim: 'no',
            condition: 'new',
            price: 799,
            photo: 'x-space',
            countInCart: 1,
            id: '35'
          },
          {
            model: 'iPhone X',
            color: 'Silver',
            memory: 64,
            hasTwoSim: 'no',
            condition: 'new',
            price: 799,
            photo: 'x-silver',
            countInCart: 1,
            id: '36'
          },
          {
            model: 'iPhone X',
            color: 'Silver',
            memory: 256,
            hasTwoSim: 'no',
            condition: 'used',
            price: 879,
            photo: 'x-silver',
            countInCart: 1,
            id: '37'
          },
          {
            model: 'iPhone X',
            color: 'Space Gray',
            memory: 256,
            hasTwoSim: 'no',
            condition: 'new',
            price: 949,
            photo: 'x-space',
            countInCart: 1,
            id: '38'
          },
          {
            model: 'iPhone 8 Plus',
            color: 'Space Gray',
            memory: 64,
            hasTwoSim: 'no',
            condition: 'new',
            price: 639,
            photo: '8plus-space',
            countInCart: 1,
            id: '39'
          },
          {
            model: 'iPhone 8 Plus',
            color: 'Silver',
            memory: 64,
            hasTwoSim: 'no',
            condition: 'new',
            price: 639,
            photo: '8plus-silver',
            countInCart: 1,
            id: '40'
          },
          {
            model: 'iPhone 8 Plus',
            color: 'Gold',
            memory: 128,
            hasTwoSim: 'no',
            condition: 'used',
            price: 699,
            photo: '8plus-gold',
            countInCart: 1,
            id: '41'
          },
          {
            model: 'iPhone 8 Plus',
            color: 'Red',
            memory: 256,
            hasTwoSim: 'no',
            condition: 'new',
            price: 779,
            photo: '8plus-red',
            countInCart: 1,
            id: '42'
          },
          {
            model: 'iPhone 8',
            color: 'Space Gray',
            memory: 64,
            hasTwoSim: 'no',
            condition: 'new',
            price: 539,
            photo: '8-space',
            countInCart: 1,
            id: '43'
          },
          {
            model: 'iPhone 8',
            color: 'Silver',
            memory: 64,
            hasTwoSim: 'no',
            condition: 'used',
            price: 429,
            photo: '8-silver',
            countInCart: 1,
            id: '44'
          },
          {
            model: 'iPhone 8',
            color: 'Red',
            memory: 128,
            hasTwoSim: 'no',
            condition: 'new',
            price: 579,
            photo: '8-red',
            countInCart: 1,
            id: '45'
          },
          {
            model: 'iPhone 8',
            color: 'Gold',
            memory: 128,
            hasTwoSim: 'no',
            condition: 'used',
            price: 459,
            photo: '8-gold',
            countInCart: 1,
            id: '46'
          },
          {
            model: 'iPhone 7 Plus',
            color: 'Black',
            memory: 32,
            hasTwoSim: 'no',
            condition: 'new',
            price: 529,
            photo: '7plus-black',
            countInCart: 1,
            id: '47'
          },
          {
            model: 'iPhone 7 Plus',
            color: 'Silver',
            memory: 32,
            hasTwoSim: 'no',
            condition: 'used',
            price: 429,
            photo: '7plus-silver',
            countInCart: 1,
            id: '48'
          },
          {
            model: 'iPhone 7 Plus',
            color: 'Gold',
            memory: 128,
            hasTwoSim: 'no',
            condition: 'new',
            price: 729,
            photo: '7plus-gold',
            countInCart: 1,
            id: '49'
          },
          {
            model: 'iPhone 7 Plus',
            color: 'Rose',
            memory: 128,
            hasTwoSim: 'no',
            condition: 'used',
            price: 629,
            photo: '7plus-rose',
            countInCart: 1,
            id: '50'
          },
          {
            model: 'iPhone 7 Plus',
            color: 'Jet Black',
            memory: 256,
            hasTwoSim: 'no',
            condition: 'new',
            price: 799,
            photo: '7plus-jet',
            countInCart: 1,
            id: '51'
          },
          {
            model: 'iPhone 7 Plus',
            color: 'Red',
            memory: 256,
            hasTwoSim: 'no',
            condition: 'used',
            price: 699,
            photo: '7plus-red',
            countInCart: 1,
            id: '52'
          },
          {
            model: 'iPhone 7 Plus',
            color: 'Black',
            memory: 32,
            hasTwoSim: 'no',
            condition: 'new',
            price: 529,
            photo: '7plus-black',
            countInCart: 1,
            id: '53'
          },
          {
            model: 'iPhone 7',
            color: 'Black',
            memory: 32,
            hasTwoSim: 'no',
            condition: 'new',
            price: 405,
            photo: '7-black',
            countInCart: 1,
            id: '54'
          },
          {
            model: 'iPhone 7',
            color: 'Silver',
            memory: 32,
            hasTwoSim: 'no',
            condition: 'used',
            price: 305,
            photo: '7-silver',
            countInCart: 1,
            id: '55'
          },
          {
            model: 'iPhone 7',
            color: 'Gold',
            memory: 128,
            hasTwoSim: 'no',
            condition: 'new',
            price: 475,
            photo: '7-gold',
            countInCart: 1,
            id: '56'
          },
          {
            model: 'iPhone 7',
            color: 'Rose',
            memory: 128,
            hasTwoSim: 'no',
            condition: 'used',
            price: 375,
            photo: '7-rose',
            countInCart: 1,
            id: '57'
          },
          {
            model: 'iPhone 7',
            color: 'Jet Black',
            memory: 256,
            hasTwoSim: 'no',
            condition: 'new',
            price: 549,
            photo: '7-jet',
            countInCart: 1,
            id: '58'
          },
          {
            model: 'iPhone 7',
            color: 'Red',
            memory: 256,
            hasTwoSim: 'no',
            condition: 'used',
            price: 479,
            photo: '7-red',
            countInCart: 1,
            id: '59'
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
            countInCart: 1,
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
            countInCart: 1,
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
            countInCart: 1,
            id: '62'
          },
          {
            model: 'MacBook Pro',
            diagonal: '13 inches',
            memory: '1024GB (SSD)',
            color: 'Silver',
            hasTouchBar: 'yes',
            price: 2495,
            photo: 'macbook-13-silver-touchbar',
            countInCart: 1,
            id: '63'
          },
          {
            model: 'MacBook Pro',
            diagonal: '15 inches',
            memory: '256GB (SSD)',
            color: 'Silver',
            hasTouchBar: 'yes',
            price: 2439,
            photo: 'macbook-15-silver-touchbar',
            countInCart: 1,
            id: '64'
          },
          {
            model: 'MacBook Pro',
            diagonal: '15 inches',
            memory: '512GB (SSD)',
            color: 'Space Gray',
            hasTouchBar: 'yes',
            price: 2509,
            photo: 'macbook-15-space-touchbar',
            countInCart: 1,
            id: '65'
          },
          {
            model: 'MacBook Pro',
            diagonal: '16 inches',
            memory: '1024GB (SSD)',
            color: 'Space Gray',
            hasTouchBar: 'yes',
            price: 2799,
            photo: 'macbook-16-space-touchbar',
            countInCart: 1,
            id: '66'
          },
          {
            model: 'MacBook Pro',
            diagonal: '16 inches',
            memory: '512GB (SSD)',
            color: 'Silver',
            hasTouchBar: 'yes',
            price: 2495,
            photo: 'macbook-16-silver-touchbar',
            countInCart: 1,
            id: '67'
          },
          {
            model: 'MacBook Air',
            diagonal: '13 inches',
            memory: '128GB (SSD)',
            color: 'Gold',
            hasTouchBar: 'no',
            price: 1099,
            photo: 'air-13-gold',
            countInCart: 1,
            id: '68'
          },
          {
            model: 'MacBook Air',
            diagonal: '13 inches',
            memory: '256GB (SSD)',
            color: 'Silver',
            hasTouchBar: 'no',
            price: 1399,
            photo: 'air-13-silver',
            countInCart: 1,
            id: '69'
          },
          {
            model: 'MacBook Air',
            diagonal: '13 inches',
            memory: '256GB (SSD)',
            color: 'Space Gray',
            hasTouchBar: 'no',
            price: 1399,
            photo: 'air-13-space',
            countInCart: 1,
            id: '70'
          },
          {
            model: 'MacBook Air',
            diagonal: '13 inches',
            memory: '128GB (SSD)',
            color: 'Silver',
            hasTouchBar: 'no',
            price: 839,
            photo: 'old-air-13-silver',
            countInCart: 1,
            id: '71'
          },
          {
            model: 'iMac',
            diagonal: '21 inches (Full HD)',
            memory: '256GB (SSD)',
            color: 'Silver',
            hasTouchBar: 'no',
            price: 1319,
            photo: 'imac-full-hd',
            countInCart: 1,
            id: '72'
          },
          {
            model: 'iMac',
            diagonal: '21 inches (Retina 4K)',
            memory: '512GB (SSD)',
            color: 'Silver',
            hasTouchBar: 'no',
            price: 2549,
            photo: 'imac-retina-4k',
            countInCart: 1,
            id: '73'
          },
          {
            model: 'iMac',
            diagonal: '27 inches (Retina 5K)',
            memory: '512GB (SSD)',
            color: 'Silver',
            hasTouchBar: 'no',
            price: 3249,
            photo: 'imac-retina-5k',
            countInCart: 1,
            id: '74'
          },
          {
            model: 'iMac',
            diagonal: '21 inches (Retina 4K)',
            memory: '1024GB / 1TB (FD)',
            color: 'Silver',
            hasTouchBar: 'no',
            price: 2849,
            photo: 'imac-retina-4k',
            countInCart: 1,
            id: '75'
          },
          {
            model: 'iMac',
            diagonal: '21 inches (Retina 4K)',
            memory: '1024GB / 1TB (HDD)',
            color: 'Silver',
            hasTouchBar: 'no',
            price: 2949,
            photo: 'imac-retina-4k',
            countInCart: 1,
            id: '76'
          },
          {
            model: 'iMac',
            diagonal: '27 inches (Retina 5K)',
            memory: '1024GB / 1TB (HDD)',
            color: 'Silver',
            hasTouchBar: 'no',
            price: 3149,
            photo: 'imac-retina-5k',
            countInCart: 1,
            id: '77'
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
            countInCart: 1,
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
            countInCart: 1,
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
            countInCart: 1,
            id: '80'
          },
          {
            generation: 3,
            model: 'Apple Watch Sport',
            size: 42,
            color: 'Silver',
            strapSeries: 'Sport Band',
            strapColor: 'White',
            price: 355,
            photo: 'sport-42-silver',
            countInCart: 1,
            id: '81'
          },
          {
            generation: 3,
            model: 'Apple Watch Nike+',
            size: 38,
            color: 'Space Gray',
            strapSeries: 'Sport Band',
            strapColor: 'Black',
            price: 395,
            photo: 'sport-38-nike',
            countInCart: 1,
            id: '82'
          },
          {
            generation: 3,
            model: 'Apple Watch Nike+',
            size: 42,
            color: 'Space Gray',
            strapSeries: 'Sport Band',
            strapColor: 'Black',
            price: 425,
            photo: 'sport-42-nike',
            countInCart: 1,
            id: '83'
          },
          {
            generation: 4,
            model: 'Apple Watch Nike+',
            size: 40,
            color: 'Space Gray',
            strapSeries: 'Sport Band',
            strapColor: 'Black',
            price: 459,
            photo: 'sport-40-nike-space',
            countInCart: 1,
            id: '84'
          },
          {
            generation: 4,
            model: 'Apple Watch Nike+',
            size: 40,
            color: 'Silver',
            strapSeries: 'Sport Band',
            strapColor: 'White',
            price: 459,
            photo: 'sport-40-nike-silver',
            countInCart: 1,
            id: '85'
          },
          {
            generation: 4,
            model: 'Apple Watch Sport',
            size: 40,
            color: 'Silver',
            strapSeries: 'Sport Band',
            strapColor: 'White',
            price: 429,
            photo: 'sport-40-silver',
            countInCart: 1,
            id: '86'
          },
          {
            generation: 4,
            model: 'Apple Watch Sport',
            size: 40,
            color: 'Gold',
            strapSeries: 'Sport Band',
            strapColor: 'Pink Sand',
            price: 429,
            photo: 'sport-40-gold',
            countInCart: 1,
            id: '87'
          },
          {
            generation: 4,
            model: 'Apple Watch Sport',
            size: 40,
            color: 'Space Gray',
            strapSeries: 'Sport Band',
            strapColor: 'Black',
            price: 429,
            photo: 'sport-40-space',
            countInCart: 1,
            id: '88'
          },
          {
            generation: 4,
            model: 'Apple Watch Sport',
            size: 40,
            color: 'Silver',
            strapSeries: 'Milanese Loop',
            strapColor: 'Silver',
            price: 459,
            photo: 'sport-40-silver-milanese',
            countInCart: 1,
            id: '89'
          },
          {
            generation: 4,
            model: 'Apple Watch Sport',
            size: 40,
            color: 'Gold',
            strapSeries: 'Milanese Loop',
            strapColor: 'Gold',
            price: 459,
            photo: 'sport-40-gold-milanese',
            countInCart: 1,
            id: '90'
          },
          {
            generation: 4,
            model: 'Apple Watch Sport',
            size: 40,
            color: 'Silver',
            strapSeries: 'Sport Loop',
            strapColor: 'Seashell',
            price: 429,
            photo: 'sport-40-silver-sport',
            countInCart: 1,
            id: '91'
          },
          {
            generation: 4,
            model: 'Apple Watch Sport',
            size: 40,
            color: 'Gold',
            strapSeries: 'Sport Loop',
            strapColor: 'Pink Sand',
            price: 429,
            photo: 'sport-40-gold-sport',
            countInCart: 1,
            id: '92'
          },
          {
            generation: 4,
            model: 'Apple Watch Sport',
            size: 40,
            color: 'Space Gray',
            strapSeries: 'Sport Loop',
            strapColor: 'Black',
            price: 429,
            photo: 'sport-40-space-sport',
            countInCart: 1,
            id: '93'
          },
          {
            generation: 4,
            model: 'Apple Watch Nike+',
            size: 44,
            color: 'Space Gray',
            strapSeries: 'Sport Band',
            strapColor: 'Black',
            price: 529,
            photo: 'sport-44-nike-space',
            countInCart: 1,
            id: '94'
          },
          {
            generation: 4,
            model: 'Apple Watch Nike+',
            size: 44,
            color: 'Silver',
            strapSeries: 'Sport Band',
            strapColor: 'White',
            price: 529,
            photo: 'sport-44-nike-silver',
            countInCart: 1,
            id: '95'
          },
          {
            generation: 4,
            model: 'Apple Watch Sport',
            size: 44,
            color: 'Silver',
            strapSeries: 'Sport Band',
            strapColor: 'White',
            price: 509,
            photo: 'sport-44-silver',
            countInCart: 1,
            id: '96'
          },
          {
            generation: 4,
            model: 'Apple Watch Sport',
            size: 44,
            color: 'Gold',
            strapSeries: 'Sport Band',
            strapColor: 'Pink Sand',
            price: 509,
            photo: 'sport-44-gold',
            countInCart: 1,
            id: '97'
          },
          {
            generation: 4,
            model: 'Apple Watch Sport',
            size: 44,
            color: 'Space Gray',
            strapSeries: 'Sport Band',
            strapColor: 'Black',
            price: 509,
            photo: 'sport-44-space',
            countInCart: 1,
            id: '98'
          },
          {
            generation: 4,
            model: 'Apple Watch Stainless',
            size: 44,
            color: 'Silver',
            strapSeries: 'Milanese Loop',
            strapColor: 'Silver',
            price: 629,
            photo: 'sport-44-silver-steel-milanese',
            countInCart: 1,
            id: '99'
          },
          {
            generation: 4,
            model: 'Apple Watch Stainless',
            size: 44,
            color: 'Gold',
            strapSeries: 'Milanese Loop',
            strapColor: 'Gold',
            price: 629,
            photo: 'sport-44-gold-steel-milanese',
            countInCart: 1,
            id: '100'
          },
          {
            generation: 4,
            model: 'Apple Watch Sport',
            size: 44,
            color: 'Silver',
            strapSeries: 'Sport Loop',
            strapColor: 'Seashell',
            price: 429,
            photo: 'sport-40-silver-sport',
            countInCart: 1,
            id: '101'
          },
          {
            generation: 4,
            model: 'Apple Watch Sport',
            size: 44,
            color: 'Gold',
            strapSeries: 'Sport Loop',
            strapColor: 'Pink Sand',
            price: 429,
            photo: 'sport-40-gold-sport',
            countInCart: 1,
            id: '102'
          },
          {
            generation: 4,
            model: 'Apple Watch Sport',
            size: 44,
            color: 'Space Gray',
            strapSeries: 'Sport Loop',
            strapColor: 'Black',
            price: 429,
            photo: 'sport-40-space-sport',
            countInCart: 1,
            id: '103'
          },
          {
            generation: 5,
            model: 'Apple Watch Sport',
            size: 40,
            color: 'Silver',
            strapSeries: 'Sport Band',
            strapColor: 'White',
            price: 559,
            photo: 'new-sport-40-silver',
            countInCart: 1,
            id: '104'
          },
          {
            generation: 5,
            model: 'Apple Watch Sport',
            size: 40,
            color: 'Gold',
            strapSeries: 'Sport Band',
            strapColor: 'Pink Sand',
            price: 559,
            photo: 'new-sport-40-gold',
            countInCart: 1,
            id: '105'
          },
          {
            generation: 5,
            model: 'Apple Watch Sport',
            size: 40,
            color: 'Space Gray',
            strapSeries: 'Sport Band',
            strapColor: 'Black',
            price: 559,
            photo: 'new-sport-40-space',
            countInCart: 1,
            id: '106'
          },
          {
            generation: 5,
            model: 'Apple Watch Sport',
            size: 40,
            color: 'Gold',
            strapSeries: 'Sport Loop',
            strapColor: 'Pomegranate',
            price: 569,
            photo: 'new-sport-40-gold-pomegranate',
            countInCart: 1,
            id: '107'
          },
          {
            generation: 5,
            model: 'Apple Watch Sport',
            size: 40,
            color: 'Gold',
            strapSeries: 'Sport Loop',
            strapColor: 'Alaskan Blue',
            price: 569,
            photo: 'new-sport-40-gold-alaskan',
            countInCart: 1,
            id: '108'
          },
          {
            generation: 5,
            model: 'Apple Watch Sport',
            size: 40,
            color: 'Gold',
            strapSeries: 'Sport Loop',
            strapColor: 'Midnight Blue',
            price: 569,
            photo: 'new-sport-40-gold-midnight',
            countInCart: 1,
            id: '109'
          },
          {
            generation: 5,
            model: 'Apple Watch Stainless',
            size: 40,
            color: 'Space Gray',
            strapSeries: 'Milanese Loop',
            strapColor: 'Black',
            price: 999,
            photo: 'new-sport-40-space-steel-milanese',
            countInCart: 1,
            id: '110'
          },
          {
            generation: 5,
            model: 'Apple Watch Stainless',
            size: 40,
            color: 'Silver',
            strapSeries: 'Sport Band',
            strapColor: 'White',
            price: 979,
            photo: 'new-sport-40-silver-steel',
            countInCart: 1,
            id: '111'
          },
          {
            generation: 5,
            model: 'Apple Watch Nike+',
            size: 44,
            color: 'Silver',
            strapSeries: 'Sport Band',
            strapColor: 'White',
            price: 669,
            photo: 'new-sport-44-nike-silver',
            countInCart: 1,
            id: '112'
          },
          {
            generation: 5,
            model: 'Apple Watch Nike+',
            size: 44,
            color: 'Space Gray',
            strapSeries: 'Sport Band',
            strapColor: 'Black',
            price: 669,
            photo: 'new-sport-44-nike-space',
            countInCart: 1,
            id: '113'
          },
          {
            generation: 5,
            model: 'Apple Watch Edition',
            size: 44,
            color: 'Space Gray',
            strapSeries: 'Leather Loop',
            strapColor: 'Black',
            price: 1349,
            photo: 'new-watch-44-ceramic-space',
            countInCart: 1,
            id: '114'
          },
          {
            generation: 5,
            model: 'Apple Watch Edition',
            size: 44,
            color: 'Silver',
            strapSeries: 'Leather Loop',
            strapColor: 'Black',
            price: 1349,
            photo: 'new-watch-44-ceramic-silver',
            countInCart: 1,
            id: '115'
          },
          {
            generation: 5,
            model: 'Apple Watch Sport',
            size: 44,
            color: 'Silver',
            strapSeries: 'Sport Band',
            strapColor: 'White',
            price: 649,
            photo: 'new-sport-44-silver',
            countInCart: 1,
            id: '116'
          },
          {
            generation: 5,
            model: 'Apple Watch Sport',
            size: 44,
            color: 'Gold',
            strapSeries: 'Sport Band',
            strapColor: 'Pink Sand',
            price: 649,
            photo: 'new-sport-44-gold',
            countInCart: 1,
            id: '117'
          },
          {
            generation: 5,
            model: 'Apple Watch Sport',
            size: 44,
            color: 'Space Gray',
            strapSeries: 'Sport Band',
            strapColor: 'Black',
            price: 649,
            photo: 'new-sport-44-space',
            countInCart: 1,
            id: '118'
          }
        ])
      }
    }
  }
}
