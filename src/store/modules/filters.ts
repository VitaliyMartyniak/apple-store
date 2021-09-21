import { Iphone, Mac, Watch } from '@/types/products'
import { IphoneCategories, MacCategories, Paramether, WatchCategories } from '@/types/filters'
import { FiltersState, RootState } from '@/types/store'
import { ActionContext } from 'vuex'

export default {
  namespaced: true,
  state: {
    filteredProducts: [],
    priceRange: [0, 1],
    categories: {},
    productsOrder: '',
    searchFilter: '',
    setupedFromUrl: false
  },
  mutations: {
    setFilteredProducts (state: FiltersState, products: Iphone[] | Mac[] | Watch[]) {
      state.filteredProducts = products
    },
    setPriceRange (state: FiltersState, priceRange: number[]) {
      state.priceRange = priceRange
    },
    setCategories (state: FiltersState, categories: IphoneCategories | MacCategories | WatchCategories) {
      state.categories = categories
    },
    setProductsOrder (state: FiltersState, order: string) {
      state.productsOrder = order
    },
    setSearchFilter (state: FiltersState, searchValue: string) {
      state.searchFilter = searchValue
    },
    completeSetup (state: FiltersState) {
      state.setupedFromUrl = true
    }
  },
  actions: {
    searchProductsByText ({ commit, dispatch }: ActionContext<FiltersState, RootState>, value: string) {
      commit('setSearchFilter', value)
      dispatch('filterProducts')
    },
    setProductsOrder ({ commit, dispatch }: ActionContext<FiltersState, RootState>, order: string) {
      commit('setProductsOrder', order)
      dispatch('filterProducts')
    },
    formCategories ({ commit, rootState }: ActionContext<FiltersState, RootState>) {
      const categories: any = {}
      const possibleCategories: string[] = []

      for (const key in rootState.products.products[0]) {
        if (key !== 'id' &&
          key !== 'countInCart' &&
          key !== 'photo' &&
          key !== 'price') {
          possibleCategories.push(key)
        }
      }

      possibleCategories.forEach((categoryName: any) => {
        let parameterArray: string[] = []
        rootState.products.products.forEach((product: any) => {
          parameterArray.push(product[categoryName])
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
    updateCategories ({ state, commit, dispatch }: ActionContext<FiltersState, RootState>) {
      commit('setCategories', state.categories)
      dispatch('filterProducts')
    },
    setCategoriesFromUrl ({ state, commit, dispatch }: ActionContext<FiltersState, RootState>, urlCategories: any) {
      const categories: any = { ...state.categories }
      for (const category in categories) {
        categories[category].forEach((param: any) => {
          if (urlCategories[category] && urlCategories[category].toString().includes(param.name.toString())) {
            param.checked = true
          }
        })
      }
      commit('setCategories', categories)
      dispatch('filterProducts')
    },
    setPriceRange ({ commit, dispatch }: ActionContext<FiltersState, RootState>, payload: number[]) {
      commit('setPriceRange', payload)
      dispatch('filterProducts')
    },
    filterProducts ({ state, commit, rootState, dispatch }: ActionContext<FiltersState, RootState>) {
      let filteredProducts: any[] = [...rootState.products.products]

      if (state.searchFilter) {
        const arr = state.searchFilter.split(' ')
        filteredProducts = filteredProducts.filter((product: any) => {
          let stringFromProduct = ''
          for (const key in product) {
            if (key !== 'id' &&
              key !== 'countInCart' &&
              key !== 'photo' &&
              key !== 'price') {
              stringFromProduct += product[key].toString().toLowerCase()
            }
          }
          let result = true
          arr.forEach((el: string) => {
            result = stringFromProduct.includes(el) && result
          })
          return result
        })
      }

      if (state.productsOrder === 'asc') {
        filteredProducts = filteredProducts.sort((a, b) => a.price - b.price)
      } else if (state.productsOrder === 'desc') {
        filteredProducts = filteredProducts.sort((a, b) => b.price - a.price)
      }

      if (state.priceRange && state.priceRange.length) {
        filteredProducts = filteredProducts.filter((product: Iphone | Mac | Watch) => {
          return product.price >= state.priceRange[0] && product.price <= state.priceRange[1]
        })
      }

      const categories: any = { ...state.categories }
      for (const category in categories) {
        const presentParams: string[] = []
        categories[category].forEach((param: Paramether) => {
          if (param.checked) {
            presentParams.push(param.name)
          }
        })
        if (presentParams.length) {
          filteredProducts = filteredProducts.filter((product: any) => presentParams.includes(product[category]))
        }
      }

      commit('setFilteredProducts', filteredProducts)
      if (!state.setupedFromUrl) {
        dispatch('pagination/setupPagination', null, { root: true })
      } else {
        dispatch('pagination/setupPagination', 1, { root: true })
      }
    }
  }
}
