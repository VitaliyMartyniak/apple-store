import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import SingleProduct from '@/views/SingleProduct.vue'

describe('SingleProduct.vue', () => {
  let store: any
  let vm: any

  beforeEach(() => {
    store = createStore({
      modules: {
        products: {
          namespaced: true,
          state: {
            isLoading: false,
            singleProduct: {
              model: 'iPhone 12',
              color: 'Pacific Blue',
              memory: 128,
              hasTwoSim: 'yes',
              condition: 'new',
              price: 1149,
              productType: 'iphone',
              photo: '12pro-blue',
              id: '1'
            }
          }
        }
      }
    })

    store.dispatch = jest.fn()
    store.commit = jest.fn()

    const wrapper = mount(SingleProduct, {
      global: {
        plugins: [store],
        mocks: {
          $route: {
            query: {
            },
            params: {
              productType: 'iphone',
              id: 1
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

  it('should get product from store', () => {
    expect(vm.product).toEqual(vm.$store.state.products.singleProduct)
  })

  it('should get isLoading from store', () => {
    expect(vm.isLoading).toBe(vm.$store.state.products.isLoading)
  })

  it('should load single product when component mounted', () => {
    expect(store.dispatch).toBeCalledWith('products/loadSingleProduct', { productType: 'iphone', id: 1 })
  })

  it('should add product to cart', () => {
    vm.addProduct(vm.product)
    expect(store.dispatch).toBeCalledWith('cart/addProduct', vm.product)
  })
})
