import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'Home',
    component: () => import('../views/home.vue') // set home as path '/'
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/register.vue') // set register as path '/register'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')// set login as path '/login'
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/profile.vue')// set login as path '/login'
  },
  {
    path: '/changepassword',
    name: 'changepassword',
    component: () => import('../views/changepassword.vue')// set login as path '/login'
  },

  {
    path: '/order/:productId',
    name: 'order',
    component: () => import('../views/order.vue')// set login as path '/login'
  },
  {
    path: '/seller',
    name: 'seller',
    component: () => import('../views/seller/mainseller.vue')// set login as path '/profile'
  },
  {
    path: '/seller/addstore',
    name: 'selleradd',
    component: () => import('../views/seller/addstore.vue')// set login as path '/profile'
  },
  {
    path: '/seller/addproduct',
    name: 'addproduct',
    component: () => import('../views/seller/addproduct.vue')// set login as path '/profile'
  },
  {
    path: '/seller/edit',
    name: 'editproduct',
    component: () => import('../views/seller/editproduct.vue')
  }
  ,
  {
    path: '/store_seller/:sellerId',
    name: 'store_seller',
    component: () => import('../views/store_seller.vue')
  }
  ,
  {
    path: '/mainadmin',
    name: 'mainadmin',
    component: () => import('../views/admin/mainadmin.vue')
  }
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
