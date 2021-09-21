import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import SearchFilter from '@/components/SearchFilter.vue'
import { nextTick } from 'vue'

describe('SearchFilter.vue', () => {
  let store: any
  let vm: any

  beforeEach(() => {
    store = createStore({
      modules: {
        filters: {
          namespaced: true,
          state: {
            searchFilter: ''
          }
        }
      }
    })

    store.dispatch = jest.fn()
    store.commit = jest.fn()

    const wrapper = mount(SearchFilter, {
      global: {
        plugins: [store],
        mocks: {
          $route: {
            path: '/catalog/iphone',
            query: {
              text: ''
            }
          },
          $router: {
            push: jest.fn(),
            replace: jest.fn()
          }
        }
      }
    })

    vm = wrapper.vm
  })

  it('should get searchFilter from store', () => {
    expect(vm.searchFilter).toBe(vm.$store.state.filters.searchFilter)
  })

  it('should search from url on mounted', async () => {
    const wrapper = mount(SearchFilter, {
      global: {
        plugins: [store],
        mocks: {
          $route: {
            path: '/catalog/iphone',
            query: {
              text: 'iPhone X'
            }
          },
          $router: {
            push: jest.fn(),
            replace: jest.fn()
          }
        }
      }
    })

    vm = wrapper.vm
    await nextTick()
    expect(store.dispatch).toBeCalledWith('filters/searchProductsByText', 'iphone x')
  })

  it('should filter products from what user types', () => {
    vm.searchProducts('iPhone 12')
    expect(store.dispatch).toBeCalledWith('filters/searchProductsByText', 'iphone 12')
  })

  it('should remove text field from query if user deletes everything from search field', () => {
    vm.searchProducts('')
    expect(vm.$router.replace).toBeCalledWith({ query: { page: 1 } })
  })
})
