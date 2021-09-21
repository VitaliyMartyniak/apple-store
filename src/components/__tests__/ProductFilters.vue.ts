import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import ProductFilters from '@/components/ProductFilters.vue'

jest.mock('@/components/PriceFilter.vue', () => jest.fn())

describe('ProductFilters.vue', () => {
  let store: any
  let vm: any

  beforeEach(() => {
    store = createStore({
      modules: {
        products: {
          namespaced: true,
          state: {
            products: [{
              model: 'iPhone 12',
              color: 'Pacific Blue',
              memory: 128,
              hasTwoSim: 'yes',
              condition: 'new',
              price: 1149,
              photo: '12pro-blue',
              id: '1'
            }]
          }
        },
        filters: {
          namespaced: true,
          state: {
            categories: {
              model: { name: 'iPhone 12', checked: false }
            }
          }
        }
      }
    })

    store.dispatch = jest.fn()
    store.commit = jest.fn()

    const wrapper = mount(ProductFilters, {
      global: {
        plugins: [store],
        mocks: {
          $route: {
            query: {
              categories: '',
              price: '',
              page: ''
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

  it('should form categories when component mounted', () => {
    expect(store.dispatch).toBeCalledWith('filters/formCategories')
  })

  it('should update categories', () => {
    vm.updateUrlCategories('model', { name: 'iPhone 12', checked: true })
    expect(store.dispatch).toBeCalledWith('filters/updateCategories')
  })

  it('should return capitalized word', () => {
    const result = vm.capitalise('hello world')
    expect(result).toBe('Hello world')
  })

  describe('with mocked categories in url', () => {
    beforeEach(() => {
      const wrapper = mount(ProductFilters, {
        global: {
          plugins: [store],
          mocks: {
            $route: {
              query: {
                categories: '{"model":"iPhone 12"}'
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

    it('should set categories from url when component mounted', () => {
      expect(store.dispatch).toBeCalledWith('filters/setCategoriesFromUrl', { model: 'iPhone 12' })
    })

    it('should remove categories field from query if user removes last checked category', () => {
      vm.updateUrlCategories('model', { name: 'iPhone 12', checked: false })
      expect(vm.$router.replace).toBeCalledWith({ query: {page: 1} })
    })

    it('should add one more parameter categories field from query if user checks parameter from same category', () => {
      vm.updateUrlCategories('model', { name: 'iPhone 11', checked: true })
      expect(vm.$router.replace).toBeCalledWith({ query: {page: 1, categories: "{\"model\":\"iPhone 12,iPhone 11\"}"} })
    })
  })
})
