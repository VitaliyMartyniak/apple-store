import { createStore } from 'vuex'
import productsModule from '@/store/modules/products'

export default createStore({
  modules: {
    products: productsModule
  }
})
