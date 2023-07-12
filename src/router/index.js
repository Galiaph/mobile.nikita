import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/index.js'
import Main from '../views/Main.vue'
import Map from '../Page/Map.vue'
import Building from '../Page/Building.vue'
import Alarm from '../Page/Alarm.vue'
import Faiberalarm from '../Page/Faiberalarm.vue'
import Dashboard from '../Page/Dashboard.vue'

const routes = [
  {
    path: '/',
    component: Main,
    redirect: '/view/dashboard',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/view',
    component: Main,
    redirect: '/view/overview',
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard
      },
      {
        path: 'building',
        name: 'building',
        component: Building
      },
      {
        path: 'alarm',
        name: 'alarm',
        component: Alarm
      },
      {
        path: 'faiberalarm',
        name: 'faiberalarm',
        component: Faiberalarm
      },
      {
        path: 'map',
        name: 'Map',
        component: Map
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  // { path: '*', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: "nav-item active",
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router