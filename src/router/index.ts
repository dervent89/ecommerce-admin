import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/products',
    name: 'products',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      {
        path: '/products',
        name: 'ProductList',
        component: () => import('@/views/Products/List.vue'),
      },
      {
        path: '/products/add',
        name: 'ProductAdd',
        component: () => import('@/views/Products/Add.vue'),
      },
      {
        path: '/products/:id',
        name: 'ProductDetail',
        component: () => import('@/views/Products/Detail.vue'),
      },
      {
        path: '/products/update/:id',
        name: 'ProductUpdate',
        component: () => import('@/views/Products/Update.vue'),
      },
    ],
  },
  {
    path: '/orders',
    name: 'orders',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      {
        path: '/orders',
        name: 'OrdersList',
        component: () => import('@/views/Orders/List.vue'),
      },
      {
        path: '/orders/:id',
        name: 'orderDetail',
        component: () => import('@/views/Orders/Detail.vue'),
      },
    ],
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      {
        path: '/',
        name: 'DashboardView',
        component: () => import('@/views/Dashboard.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
