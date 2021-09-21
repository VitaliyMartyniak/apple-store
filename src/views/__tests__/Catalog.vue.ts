import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import Catalog from '@/views/Catalog.vue'

jest.mock('@/components/ProductFilters.vue', () => jest.fn())
jest.mock('@/components/ProductsPagination.vue', () => jest.fn())

describe('Catalog.vue', () => {
  let store: any
  let vm: any

  beforeEach(() => {
    store = createStore({
      modules: {
        pagination: {
          namespaced: true,
          state: {
            paginatedProducts: [{
              model: 'iPhone 12',
              color: 'Pacific Blue',
              memory: 128,
              hasTwoSim: 'yes',
              condition: 'new',
              price: 1149,
              productType: 'iphone',
              photo: '12pro-blue',
              id: '1'
            }]
          }
        },
        products: {
          namespaced: true,
          state: {
            isLoading: false
          }
        }
      }
    })

    store.dispatch = jest.fn()
    store.commit = jest.fn()

    const wrapper = mount(Catalog, {
      global: {
        plugins: [store],
        mocks: {
          $route: {
            query: {
            },
            params: {
              productType: 'iphone'
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

  it('should get productType from url params', () => {
    expect(vm.productType).toBe('iphone')
  })

  it('should get products from store', () => {
    expect(vm.products).toEqual(store.state.pagination.paginatedProducts)
  })

  it('should set path from route', () => {
    vm.path = 'watch'
    vm.onUrlChange({params: {productType: 'iphone'}, name: 'Catalog'})
    expect(vm.path).toBe('iphone')
  })
})
