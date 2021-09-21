import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import CatalogOptions from '@/components/CatalogOptions.vue'

describe('CatalogOptions.vue', () => {
  let store: any
  let vm: any

  beforeEach(() => {
    store = createStore({
      modules: {
        cart: {
          namespaced: true,
          state: {
            counter: 1
          },
          getters: {
            counter: () => store.state.cart.counter
          }
        }
      }
    })

    store.dispatch = jest.fn()

    const wrapper = mount(CatalogOptions, {
      global: {
        plugins: [store],
        mocks: {
          $route: {
            query: {
              order: 'asc',
              pageSize: '9'
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

  it('should set productsOrder if there is order in query', () => {
    expect(store.dispatch).toBeCalledWith('filters/setProductsOrder', 'asc')
  })

  it('should set pageSize if there is pageSize in query', () => {
    expect(store.dispatch).toBeCalledWith('pagination/setPageSize', 9)
  })

  it('should set productsOrder if user sets it', () => {
    vm.setOrder('desc')
    expect(store.dispatch).toBeCalledWith('filters/setProductsOrder', 'desc')
  })

  it('should set pageSize if user sets it', () => {
    vm.setProductsPerPage(18)
    expect(store.dispatch).toBeCalledWith('pagination/setPageSize', 18)
  })
})
