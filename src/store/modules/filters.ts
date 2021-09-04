import { Iphone, Mac, Watch } from '@/types/products'

export default {
  namespaced: true,
  state: {
    filteredItems: [],
    priceRange: null,
    categories: {},
    productsOrder: '',
    searchFilter: '',
    setupedFromUrl: false
  },
  mutations: {
    setFilteredItems (state: any, items: Iphone[] | Mac[] | Watch[]) {
      state.filteredItems = items
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
    setSearchFilter (state: any, value: string) {
      state.searchFilter = value
    },
    completeSetup (state: any) {
      state.setupedFromUrl = true
    }
  },
  actions: {
    searchProductsByText ({ commit, dispatch }: any, value: string) {
      commit('setSearchFilter', value)
      dispatch('filterItems')
    },
    setProductsOrder ({ commit, dispatch }: any, order: string) {
      commit('setProductsOrder', order)
      dispatch('filterItems')
    },
    formCategories ({ commit, rootState }: any) {
      const categories: any = {}
      const possibleCategories: string[] = []

      for (const key in rootState.products.items[0]) {
        if (key !== 'id' &&
          key !== 'countInCart' &&
          key !== 'photo' &&
          key !== 'price') {
          possibleCategories.push(key)
        }
      }

      possibleCategories.forEach((categoryName: string) => {
        let parameterArray: string[] = []
        rootState.products.items.forEach((item: any) => {
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
    setCategoriesFromUrl ({ state, commit, dispatch }: any, urlCategories: any) {
      const categories: any = { ...state.categories }
      for (const category in categories) {
        categories[category].forEach((param: any) => {
          if (urlCategories[category] && urlCategories[category].toString().includes(param.name.toString())) {
            param.checked = true
          }
        })
      }
      commit('setCategories', categories)
      dispatch('filterItems')
    },
    setPriceRange ({ commit, dispatch }: any, payload: number[]) {
      commit('setPriceRange', payload)
      dispatch('filterItems')
    },
    filterItems ({ state, commit, rootState, dispatch }: any) {
      let filteredItems: any[] = [...rootState.products.items]

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

      if (state.priceRange && state.priceRange.length) {
        filteredItems = filteredItems.filter((item: Iphone | Mac | Watch) => {
          return item.price >= state.priceRange[0] && item.price <= state.priceRange[1]
        })
      }

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
      if (!state.setupedFromUrl) {
        dispatch('pagination/setupPagination', null, { root: true })
      } else {
        dispatch('pagination/setupPagination', 1, { root: true })
      }
    }
  }
}
