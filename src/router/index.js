import { createRouter, createWebHistory } from 'vue-router'
import Top from '../views/Top.vue'
import Translate from '../views/Translate.vue'
import Search from '../views/Search.vue'
import Append from '../views/Append.vue'

const routes = [
  {
    path: '/',
    name: 'Top',
    component: Top,
  },
  {
    path: '/translate',
    name: 'Translate',
    component: Translate,
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
  },
  {
    path: '/append',
    name: 'Append',
    component: Append,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
