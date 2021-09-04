export default {
  namespaced: true,
  state: {
    alertText: ''
  },
  mutations: {
    setAlertText (state: any, value: string) {
      state.alertText = value
    }
  }
}
