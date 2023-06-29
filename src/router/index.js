import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/index.js'
import Main from '../views/Main.vue'
import Map from '../Page/Map.vue'
import Profile from '../Page/Profile.vue'
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
        path: 'profile',
        name: 'Profile',
        component: Profile
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