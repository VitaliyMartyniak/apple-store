import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import Products from '@/components/Products.vue'

jest.mock('@/components/ProductsPagination.vue', () => jest.fn())

describe('Products.vue', () => {
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

    const wrapper = mount(Products, {
      props: {
        productType: 'iphone'
      },
      global: {
        plugins: [store]
      }
    })

    vm = wrapper.vm
  })

  it('should get products from store', () => {
    expect(vm.products).toEqual(store.state.pagination.paginatedProducts)
  })

  it('should get isLoading from store', () => {
    expect(vm.isLoading).toBe(store.state.products.isLoading)
  })
})
