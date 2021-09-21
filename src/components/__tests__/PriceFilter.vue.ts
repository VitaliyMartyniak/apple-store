import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import PriceFilter from '@/components/PriceFilter.vue'
import { nextTick } from 'vue'

jest.mock('@vueform/slider', () => jest.fn())

describe('PriceFilter.vue', () => {
  let store: any
  let vm: any

  beforeEach(() => {
    store = createStore({
      modules: {
        products: {
          namespaced: true,
          getters: {
            minPrice: () => 1,
            maxPrice: () => 100
          }
        },
        filters: {
          namespaced: true,
          state: {
            priceRange: [0, 1]
          },
          getters: {
            priceRange: () => store.state.filters.priceRange
          }
        }
      }
    })

    store.dispatch = jest.fn()
    store.commit = jest.fn()

    const wrapper = mount(PriceFilter, {
      data () {
        return {
          value: [0, 1]
        }
      },
      global: {
        plugins: [store],
        mocks: {
          $route: {
            query: {
              price: ''
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

  it('should set get priceRange', () => {
    expect(vm.priceRange).toEqual(vm.$store.state.filters.priceRange)
  })

  it('should set calculated priceFilter', () => {
    expect(vm.value).toEqual([1, 100])
    expect(store.dispatch).toBeCalledWith('filters/setPriceRange', [1, 100])
  })

  it('should set calculated priceFilter from url', async () => {
    const wrapper = mount(PriceFilter, {
      data () {
        return {
          value: [0, 1]
        }
      },
      global: {
        plugins: [store],
        mocks: {
          $route: {
            query: {
              price: '349,1449'
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
    // let query = { ...vm.$route.query }
    // query = { ...query, price: '349,1449' }
    // vm.$router.replace({ query })
    // vm.$route.query.price = '349,1449'
    await nextTick()
    expect(vm.value).toEqual([349, 1449])
    expect(store.dispatch).toBeCalledWith('filters/setPriceRange', [349, 1449])
  })

  it('should set new priceRange', () => {
    vm.update()
    expect(store.dispatch).toBeCalledWith('filters/setPriceRange', [1, 100])
  })
})
