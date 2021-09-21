import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import ProductsPagination from '@/components/ProductsPagination.vue'

jest.mock('@hennge/vue3-pagination/dist/vue3-pagination.css', () => jest.fn())

describe('ProductsPagination.vue', () => {
  let store: any
  let vm: any

  beforeEach(() => {
    store = createStore({
      modules: {
        pagination: {
          namespaced: true,
          state: {
            page: 1,
            pageCount: 3
          }
        }
      }
    })

    store.dispatch = jest.fn()
    store.commit = jest.fn()

    const wrapper = mount(ProductsPagination, {
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

  it('should set get page from store', () => {
    expect(vm.page).toBe(vm.$store.state.pagination.page)
  })

  it('should set get pageCount from store', () => {
    expect(vm.pageCount).toBe(vm.$store.state.pagination.pageCount)
  })

  it('should change page', () => {
    vm.changePageHandler(5)
    expect(store.dispatch).toBeCalledWith('pagination/setupPagination', 5)
  })
})
