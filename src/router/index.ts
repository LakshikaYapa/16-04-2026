import { createRouter, createWebHistory } from 'vue-router'

import Home from '../components/mealsSection.vue'
import Breakfast from '../components/Breakfast.vue'
import Lunch from '../components/Lunch.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/breakfast', component: Breakfast },
  { path: '/lunch', component: Lunch },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router