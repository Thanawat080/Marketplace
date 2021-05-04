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
    meta: {guess: true},
    name: 'register',
    component: () => import('../views/register.vue') // set register as path '/register'
  },
  {
    path: '/login',
    meta: {guess: true},
    name: 'login',
    component: () => import('../views/login.vue')// set login as path '/login'
  },
  {
    path: '/profile',
    meta: { login: true },
    name: 'profile',
    component: () => import('../views/profile.vue')// set login as path '/login'
  },
  {
    path: '/changepassword',
    meta: { login: true },
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
    meta: { login: true , seller: true },
    name: 'seller',
    component: () => import('../views/seller/mainseller.vue')// set login as path '/profile'
  },
  {
    path: '/seller/addstore',
    meta: { login: true, seller: true },
    name: 'selleradd',
    component: () => import('../views/seller/addstore.vue')// set login as path '/profile'
  },
  {
    path: '/seller/addproduct',
    meta: { login: true, seller: true },
    name: 'addproduct',
    component: () => import('../views/seller/addproduct.vue')// set login as path '/profile'
  },
  {
    path: '/seller/edit',
    meta: { login: true, seller: true },
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
    meta: { login: true, admin: true },
    name: 'mainadmin',
    component: () => import('../views/admin/mainadmin.vue')
  },
  {
    path: '/checkout',
    meta: { login: true, buyer: true },
    name: 'checkout',
    component: () => import('../views/checkout.vue')
  },
  {
    path: '/event',
    meta: { login: true, admin: true },
    name: 'event',
    component: () => import('../views/admin/event.vue')
  }
  ,
  {
    path: '/history',
    meta: { login: true },
    name: 'history',
    component: () => import('../views/orderHistory.vue')
  }
  ,
  {
    path: '/RecommendStore',
    name: 'RecommendStore',
    component: () => import('../views/RecommendStore.vue')
  }


]




const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('userId')
  const type = localStorage.getItem('type')


  if (to.meta.login && !isLoggedIn) {
    alert('Please login first!')
    next({ path: '/login' })
  }

  else if (to.meta.guess && isLoggedIn) {
    alert('You are already Login!')
    next({ path: '/' })
  }

  else if(to.meta.seller && type !== 'seller'){
    alert('You are not seller!!!')
    next({ path: '/'})
  }
  else if(to.meta.admin && type !== 'owner_marketplace'){
    alert('You are not admin!!!')
    next({ path: '/'})
  }
  else if(to.meta.buyer && type !== 'buyer'){
    alert('You are not buyer!!!')
    next({ path: '/'})
  }



  next()
})

export default router
