import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import Layout from '@/views/Layout.vue'

jest.mock('@/components/Alert.vue', () => jest.fn())
jest.mock('@/components/Header.vue', () => jest.fn())

describe('Layout.vue', () => {
  let store: any
  let vm: any

  beforeEach(() => {
    store = createStore({
      modules: {
        cart: {
          namespaced: true
        }
      }
    })

    store.dispatch = jest.fn()

    const wrapper = mount(Layout, {
      global: {
        plugins: [store]
      }
    })

    vm = wrapper.vm
  })

  it('should get cartList from store when component mounted', () => {
    expect(store.dispatch).toBeCalledWith('cart/getCartList')
  })
})
