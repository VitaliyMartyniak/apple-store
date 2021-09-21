import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import ProductCard from '@/components/ProductCard.vue'

describe('ProductCard.vue', () => {
  let store: any
  let vm: any
  const product = {
    model: 'iPhone 12 Pro Max',
    color: 'Pacific Blue',
    memory: 128,
    hasTwoSim: 'yes',
    condition: 'new',
    price: 1149,
    photo: '12pro-blue',
    id: '1'
  }

  beforeEach(() => {
    store = createStore({
      modules: {
        cart: {
          namespaced: true,
          state: {}
        }
      }
    })

    store.dispatch = jest.fn()
    store.commit = jest.fn()

    const wrapper = mount(ProductCard, {
      props: {
        productType: 'iphone',
        product
      },
      global: {
        plugins: [store],
        mocks: {
          $router: {
            push: jest.fn()
          }
        }
      }
    })

    vm = wrapper.vm
  })

  it('should call add to cart function', () => {
    vm.addProduct(product)
    expect(store.dispatch).toBeCalledWith('cart/addProduct', { ...product, productType: 'iphone' })
  })
})
