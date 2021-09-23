import { Iphone, Mac, Watch } from '@/types/products'
import { IphoneCategories, MacCategories, Parameter, UrlCategories, WatchCategories } from '@/types/filters'
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
    userMadeChages: false
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
    makeChanges (state: FiltersState) {
      state.userMadeChages = true
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

      possibleCategories.forEach((categoryName: string) => {
        let parameterArray: string[] = []
        rootState.products.products.forEach((product: Iphone | Mac | Watch) => {
          parameterArray.push(product[categoryName]!.toString())
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
    setCategoriesFromUrl ({ state, commit, dispatch }: ActionContext<FiltersState, RootState>, urlCategories: UrlCategories) {
      const categories: IphoneCategories | MacCategories | WatchCategories = { ...state.categories }
      for (const category in categories) {
        categories[category].forEach((param: Parameter) => {
          if (urlCategories[category] && urlCategories[category]?.toString().includes(param.name.toString())) {
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
      let filteredProducts: (Iphone|Mac|Watch)[] = [...rootState.products.products]

      if (state.searchFilter) {
        const arrayFromUsersSearch = state.searchFilter.split(' ')
        filteredProducts = filteredProducts.filter((product: Iphone | Mac | Watch) => {
          let stringFromProduct = ''
          for (const key in product) {
            if (key !== 'id' &&
              key !== 'countInCart' &&
              key !== 'photo' &&
              key !== 'price') {
              stringFromProduct += product[key]!.toString().toLowerCase()
            }
          }
          let result = true
          arrayFromUsersSearch.forEach((word: string) => {
            result = stringFromProduct.includes(word) && result
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

      const categories: IphoneCategories | MacCategories | WatchCategories = { ...state.categories }
      for (const category in categories) {
        const presentParams: string[] = []
        categories[category].forEach((param: Parameter) => {
          if (param.checked) {
            presentParams.push(param.name)
          }
        })
        if (presentParams.length) {
          filteredProducts = filteredProducts.filter((product: Iphone | Mac | Watch) => presentParams.includes(product[category]!.toString()))
        }
      }

      commit('setFilteredProducts', filteredProducts)
      if (!state.userMadeChages) {
        dispatch('pagination/setupPagination', null, { root: true })
      } else {
        dispatch('pagination/setupPagination', 1, { root: true })
      }
    }
  }
}
