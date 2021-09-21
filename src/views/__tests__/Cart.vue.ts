import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import Cart from '@/views/Cart.vue'

describe('Cart.vue', () => {
  let store: any
  let vm: any

  beforeEach(() => {
    store = createStore({
      modules: {
        cart: {
          namespaced: true,
          state: {
            isLoading: false,
            products: [{
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
          },
          getters: {
            totalSum: () => 100
          }
        }
      }
    })

    store.dispatch = jest.fn()
    store.commit = jest.fn()

    const wrapper = mount(Cart, {
      global: {
        plugins: [store],
        mocks: {
          $route: {
            query: {
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

  it('should get page from store', () => {
    expect(vm.isLoading).toBe(vm.$store.state.cart.isLoading)
  })

  it('should get page from store', () => {
    expect(vm.cartProducts).toBe(vm.$store.state.cart.products)
  })

  it('should get page from store', () => {
    expect(vm.totalSum).toBe(vm.$store.getters['cart/totalSum'])
  })

  it('should change product count', () => {
    vm.changeProductCount(vm.cartProducts[0])
    expect(store.dispatch).toBeCalledWith('cart/changeProductCount', vm.cartProducts[0])
  })

  it('should delete product from cart', () => {
    vm.deleteFromCart(vm.cartProducts[0].id)
    expect(store.dispatch).toBeCalledWith('cart/deleteProduct', '1')
  })

  it('should submit order', () => {
    vm.submitOrder()
    expect(store.dispatch).toBeCalledWith('cart/submitOrder')
  })
})
