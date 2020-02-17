import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {layout: "main"},
    component: Home
  },
  {
    path: '/vue',
    name: 'VuePage',
    meta: {layout: "main"},
    component: () => import('@/views/VuePage')
  },
  {
    path: '/login',
    name: 'Login',
    meta: {layout: "empty"},
    component: () => import('@/views/Login'),
  },
  {
    path: '/register',
    name: 'Register',
    meta: {layout: "empty"},
    component: () => import("@/views/Register")
  },
  {
    path: '/postset',
    name: 'PostSet',
    meta: {layout: "empty"},
    component: () => import("@/views/PostSet")
  },
  {
    path: '/postedit',
    name: 'PostEdit',
    meta: {layout: "empty"},
    component: () => import("@/views/PostEdit")
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
