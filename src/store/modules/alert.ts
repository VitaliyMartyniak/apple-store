import { AlertState } from '@/types/store'

export default {
  namespaced: true,
  state: {
    alertText: ''
  },
  mutations: {
    setAlertText (state: AlertState, text: string) {
      state.alertText = text
    }
  }
}
