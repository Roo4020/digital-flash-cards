import {
  createRouter,
  createWebHistory
} from 'vue-router';
import Top from '../views/Top.vue';
import Translate from '../views/Translate.vue';
import Search from '../views/Search.vue';
import Append from '../views/Append.vue';

import store from '../store';

const routes = [{
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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.fullPath === '/') {
    if (store.state.auth.status) {
      next('translate')
    } else {
      next()
    }
  } else {
    if (store.state.auth.status) {
      next()
    } else {
      router.replace('/');
    }
  }
});

export default router;