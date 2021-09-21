import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import CartIcon from '@/components/CartIcon.vue'

describe('CartIcon.vue', () => {
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

    const wrapper = mount(CartIcon, {
      global: {
        plugins: [store]
      }
    })

    vm = wrapper.vm
  })

  it('should get cartCounter from store', () => {
    expect(vm.cartCounter).toBe(store.state.cart.counter)
  })
})
