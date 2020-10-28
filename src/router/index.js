import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Guardias',
    component: () => import('../views/Guardias.vue')
  },
  {
    path: '/listaGuardias',
    name: 'ListaGuardias',
    component: () => import('../views/ListaGuardias.vue')
  },
  {
    path: '/guardia',
    name: 'Guardia',
    component: () => import('../views/Guardia.vue')
  },
  {
    path: '/colaboradores',
    name: 'Colaboradores',
    component: () => import('../views/Colaboradores.vue')
  },
  {
    path: '/colaborador',
    name: 'Colaborador',
    component: () => import('../views/Colaborador.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
