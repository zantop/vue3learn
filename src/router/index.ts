import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/setup',
    name: 'Setup',
    component: () => import(/* webpackChunkName: "about" */ '../views/Setup.vue')
  },
  {
    path: '/reactive',
    name: 'Reactive',
    component: () => import(/* webpackChunkName: "about" */ '../views/Reactive.vue')
  },
  {
    path: '/ref',
    name: 'Ref',
    component: () => import(/* webpackChunkName: "about" */ '../views/Ref.vue')
  },
  {
    path: '/computed',
    name: 'Computed',
    component: () => import(/* webpackChunkName: "about" */ '../views/Computed.vue')
  },
  {
    path: '/readonly',
    name: 'Readonly',
    component: () => import(/* webpackChunkName: "about" */ '../views/Readonly.vue')
  },
  {
    path: '/watcheffect',
    name: 'WatchEffect',
    component: () => import(/* webpackChunkName: "about" */ '../views/WatchEffect.vue')
  },
  {
    path: '/watch',
    name: 'Watch',
    component: () => import(/* webpackChunkName: "about" */ '../views/Watch.vue')
  },
  {
    path: '/raw',
    name: 'Raw',
    component: () => import(/* webpackChunkName: "about" */ '../views/Raw.vue')
  },
  {
    path: '/life',
    name: 'Life',
    component: () => import(/* webpackChunkName: "about" */ '../views/Life.vue')
  },
  {
    path: '/provide',
    name: 'Provide',
    component: () => import(/* webpackChunkName: "about" */ '../views/Provide.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
