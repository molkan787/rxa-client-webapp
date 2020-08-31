import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/add-entry',
    name: 'Add Entry',
    component: () => import('../views/AddEntry.vue')
  },
  {
    path: '/upload-document',
    name: 'Upload Document',
    component: () => import('../views/UploadDocument.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
