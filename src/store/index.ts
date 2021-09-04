import { createStore } from 'vuex'
import products from '@/store/modules/products'
import cart from '@/store/modules/cart'
import pagination from '@/store/modules/pagination'
import filters from '@/store/modules/filters'
import alert from '@/store/modules/alert'

export default createStore({
  modules: {
    alert,
    cart,
    filters,
    pagination,
    products
  }
})
