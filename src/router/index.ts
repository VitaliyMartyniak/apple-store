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
        redirect: '/catalog/iphone'
      },
      {
        path: '/catalog/:product',
        name: 'Catalog',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "catalog" */ '../views/Catalog.vue')
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
  routes
})

export default router
