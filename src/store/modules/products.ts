import { Iphone, Mac, Watch } from '@/types/products'
import _ from 'lodash'
import axios from 'axios'

export default {
  namespaced: true,
  state: {
    items: [],
    page: 1,
    pageSize: 9,
    pageCount: 0,
    paginatedItems: [],
    filteredItems: [],
    priceRange: null,
    categories: {},
    productsOrder: '',
    searchFilter: '',
    isLoading: true,
    alertText: ''
  },
  mutations: {
    setAlertText (state: any, value: string) {
      state.alertText = value
    },
    setLoading (state: any, value: boolean) {
      state.isLoading = value
    },
    setSearchFilter (state: any, value: string) {
      state.searchFilter = value
    },
    setItems (state: any, items: Iphone[] | Mac[] | Watch[]) {
      state.items = items
    },
    setFilteredItems (state: any, items: Iphone[] | Mac[] | Watch[]) {
      state.filteredItems = items
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
    setPriceRange (state: any, value: any[]) {
      state.priceRange = value
    },
    setCategories (state: any, value: any[]) {
      state.categories = value
    },
    setProductsOrder (state: any, value: string) {
      state.productsOrder = value
    },
    setPageSize (state: any, value: number) {
      state.pageSize = value
    }
  },
  getters: {
    value (state: any) {
      return state.value
    },
    maxPrice (state: any) {
      let result = 1
      state.items.forEach((item: Iphone | Mac | Watch) => {
        if (item.price > result) {
          result = item.price
        }
      })
      return result
    }
  },
  actions: {
    loadAll ({ state, commit, dispatch }: any, route: any) {
      commit('setLoading', true)
      axios.get(`https://apple-store-vue3-default-rtdb.firebaseio.com/${route.params.productType}.json`).then(response => {
        if (response.data.length) {
          commit('setItems', response.data)
          commit('setFilteredItems', response.data)
          if (route.query.page) {
            dispatch('setupPagination', +route.query.page)
          } else {
            dispatch('setupPagination', 1)
          }
          dispatch('setPriceFilter', '')
          commit('setLoading', false)
        }
      })
    },
    searchProductsByText ({ commit, dispatch }: any, value: string) {
      commit('setSearchFilter', value)
      dispatch('filterItems')
    },
    setPageSize ({ commit, dispatch }: any, value: number) {
      commit('setPageSize', value)
      dispatch('setupPagination', 1)
    },
    setProductsOrder ({ commit, dispatch }: any, order: string) {
      commit('setProductsOrder', order)
      dispatch('filterItems')
    },
    formCategories ({ state, commit }: any) {
      const categories: any = {}
      const possibleCategories: string[] = []

      for (const key in state.items[0]) {
        if (key !== 'id' &&
            key !== 'countInCart' &&
            key !== 'photo' &&
            key !== 'price') {
          possibleCategories.push(key)
        }
      }

      possibleCategories.forEach((categoryName: string) => {
        let parameterArray: string[] = []
        state.items.forEach((item: any) => {
          parameterArray.push(item[categoryName])
        })
        parameterArray = [...new Set(parameterArray)]

        if (categoryName === 'memory' || categoryName === 'size') {
          parameterArray.sort((a: string, b: string) => +a - +b)
        } else if (categoryName !== 'model' && categoryName !== 'generation') {
          parameterArray.sort()
        }

        categories[categoryName] = parameterArray.map(parameter => {
          return {
            name: parameter,
            checked: false
          }
        })
      })

      commit('setCategories', categories)
    },
    updateCategories ({ commit, dispatch }: any, payload: any) {
      commit('setCategories', payload)
      dispatch('filterItems')
    },
    setPriceFilter ({ commit }: any, payload: number) {
      commit('setPriceRange', [0, payload])
    },
    setPriceRange ({ commit, dispatch }: any, payload: any[]) {
      commit('setPriceRange', payload)
      dispatch('filterItems')
    },
    // changePage ({ state, commit }: any, payload: number) {
    //   const items = _.chunk(state.items, state.pageSize)
    //   const paginatedItems = items[payload - 1] || items[0]
    //   commit('setPage', payload)
    //   commit('setPaginatedItems', paginatedItems)
    // },
    setupPagination ({ state, commit }: any, payload: number) {
      const items = _.chunk(state.filteredItems, state.pageSize)
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
    },
    filterItems ({ state, commit, dispatch }: any) {
      let filteredItems: any[] = [...state.items]

      if (state.searchFilter) {
        const arr = state.searchFilter.split(' ')
        filteredItems = filteredItems.filter((item: any) => {
          let stringFromItem = ''
          for (const key in item) {
            if (key !== 'id' &&
              key !== 'countInCart' &&
              key !== 'photo' &&
              key !== 'price') {
              stringFromItem += item[key].toString().toLowerCase()
            }
          }
          let result = true
          arr.forEach((el: string) => {
            result = stringFromItem.includes(el) && result
          })
          return result
        })
      }

      if (state.productsOrder === 'asc') {
        filteredItems = filteredItems.sort((a, b) => a.price - b.price)
      } else if (state.productsOrder === 'desc') {
        filteredItems = filteredItems.sort((a, b) => b.price - a.price)
      }

      filteredItems = filteredItems.filter((item: Iphone | Mac | Watch) => {
        return item.price >= state.priceRange[0] && item.price <= state.priceRange[1]
      })

      const categories: any = { ...state.categories }
      for (const category in categories) {
        const presentParams: string[] = []
        categories[category].forEach((param: any) => {
          if (param.checked) {
            presentParams.push(param.name)
          }
        })
        if (presentParams.length) {
          filteredItems = filteredItems.filter((item: any) => presentParams.includes(item[category]))
        }
      }

      commit('setFilteredItems', filteredItems)
      dispatch('setupPagination', 1)
    }
  }
}
