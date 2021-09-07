import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '../views/Layout.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: '/',
        redirect: '/home'
      },
      {
        path: '/home',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
      },
      {
        path: '/catalog/:productType',
        name: 'Catalog',
        component: () => import(/* webpackChunkName: "catalog" */ '../views/Catalog.vue')
      },
      {
        path: '/catalog/:productType/:id',
        name: 'SingleProduct',
        component: () => import(/* webpackChunkName: "singleProduct" */ '../views/SingleProduct.vue')
      },
      {
        path: '/cart',
        name: 'Cart',
        component: () => import(/* webpackChunkName: "singleProduct" */ '../views/Cart.vue')
      }
    ]
  },
  {
    path: '/:notFound(.*)',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active'
})

export default router
