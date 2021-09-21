import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import Alert from '@/components/Alert.vue'
import { nextTick } from 'vue'

describe('Alert.vue', () => {
  let store: any
  let vm: any

  beforeEach(() => {
    store = createStore({
      modules: {
        alert: {
          namespaced: true,
          state: {
            alertText: 'text'
          },
          mutations: {
            setAlertText: () => store.state.alert.alertText = 'Hello world'
          }
        }
      }
    })

    const wrapper = mount(Alert, {
      global: {
        plugins: [store]
      }
    })

    vm = wrapper.vm
  })

  it('should get alertText from store', () => {
    expect(vm.text).toBe(store.state.alert.alertText)
  })

  it('should set new timeout, when watcher sees new text', async () => {
    store.commit('alert/setAlertText')
    await nextTick()
    expect(vm.text).toBe('Hello world')
    expect(vm.timeout).toBeTruthy()
  })
})
