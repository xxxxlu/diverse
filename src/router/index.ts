import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ProductDetail from '../views/ProductDetail.vue'
import Cart from '../views/Cart.vue'
import Checkout from '../views/Checkout.vue'
import CheckoutDelivery from '../views/checkout/DeliveryInfo.vue'
import CheckoutPayment from '../views/checkout/Payment.vue'
import CheckoutSuccess from '../views/checkout/Success.vue'
import Contact from '../views/Contact.vue'

Vue.use(VueRouter)

const routes= [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/products/:id',
    name: 'ProductDetail',
    component: ProductDetail
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout,
    children: [
      {
        path: '',
        name: 'CheckoutDelivery',
        component: CheckoutDelivery
      },
      {
        path: 'payment',
        name: 'CheckoutPayment',
        component: CheckoutPayment
      },
      {
        path: 'success',
        name: 'CheckoutSuccess',
        component: CheckoutSuccess
      }
    ]
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  }
]

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes
})

export default router
