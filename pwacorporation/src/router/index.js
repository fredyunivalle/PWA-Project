import Vue from 'vue'
import VueRouter from 'vue-router'
import Navbar from "@/layout/Navbar";

import Login from '../views/Login.vue'
import Users from '../views/Users.vue'
import Clients from '../views/Clients.vue'
import Projects from '../views/Projects.vue'
import Reports from '../views/Reports.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/users',
    component: Users,
  },
  {
    path: '/client',
    component: Clients,
  },
  {
    path: '/project',
    component: Projects
  },
  {
    path: '/reports',
    component: Reports
  },
  {
    path: '*',
    name: 'Not Found',
    redirect: '/login'
  }
]

const router = new VueRouter({
  routes
})

export default router
