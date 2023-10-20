import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductDetails from "../views/ProductDetails.vue"
import Checkout from "../views/Checkout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: "/productDetails/:id", // Use a dynamic route parameter named "id"
      name: "ProductDetails",
      component: ProductDetails,
    },
    {
      path: "/checkout",
      // path: "/checkout/:id/:quantity/:price",
      name: "Checkout",
      component: Checkout,
      props: true, // This allows passing props via route params
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
