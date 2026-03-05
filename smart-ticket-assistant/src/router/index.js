import { createWebHistory, createRouter } from 'vue-router'
import Login from '../views/Login.vue'
import TicketList from '../views/TicketList.vue'
import AddList from '../views/AddList.vue'
import component from 'element-plus/es/components/tree-select/src/tree-select-option.mjs'
import TicketDetail from '../views/TicketDetail.vue'
import TickEdit from '../views/TickEdit.vue'
import Dashboard from '../views/Dashboard.vue'
const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/ticketList',
    name: 'TicketList',
    component: TicketList,

  },
  {
    path: '/addList',
    name: 'AddList',
    component: AddList

  },
  {
    path: '/ticketDetail/:id',
    name: 'TicketDetail',
    component: TicketDetail
  },
  {
    path: '/tickEdit/:id',
    name: 'TickEdit',
    component: TickEdit
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },

]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
export default router