import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/Other/HomeView.vue'
import NotFoundView from '@/views/Other/NotFoundView.vue'

import UserListView from '@/views/User/UserListView.vue'
import UserDetailsView from '@/views/User/UserDetailsView.vue'

import ProductListView from '@/views/Product/ProductListView.vue'

import CartView from '@/views/Sale/CartView.vue'
import InvoiceListView from '@/views/Sale/InvoiceListView.vue'
import InvoiceDetailsView from '@/views/Sale/InvoiceDetailsView.vue'


const routes = [
  {
    path: '/',
    name: 'HomeView',
    meta: {
      title: "GLYK - Home",
    },
    component: HomeView
  },
  {
    path: '/users',
    name: 'UserListView',
    meta: {
      title: "GLYK - Users",
    },
    component: UserListView
  },
  {
    path: '/products',
    name: 'ProductListView',
    meta: {
      title: "GLYK - Products",
    },
    component: ProductListView
  },
  {
    path: "/users/:id",
    name: "UserDetailsView",
    component: UserDetailsView,
    meta: {
      title: "GLYK - User Details",
    },
    props: true
  },
  {
    path: '/cart',
    name: 'CartView',
    meta: {
      title: "GLYK - Cart",
    },
    component: CartView
  },
  {
    path: '/invoices',
    name: 'InvoiceListView',
    meta: {
      title: "GLYK - Invoices",
    },
    component: InvoiceListView
  },
  {
    path: '/invoices/:id',
    name: "InvoiceDetailsView",
    meta:
    {
      title: "GLYK - Invoice Details"
    },
    component: InvoiceDetailsView
  },
  // redirect
  {
    path: '/all-users',
    redirect: '/users'
  },  
  {
    path: '/kullanicilar',
    redirect: '/users'
  },


  // catch all 404
  {
    path:'/:catchAll(.*)',
    name: 'NotFound',
    meta:
    {
      title: "GLYK - 404 Not Found"
    },
    component: NotFoundView
  }
]
















const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach((to, from, next) => {
  document.title = to.meta.title || "GLYK";
  next();
});


export default router