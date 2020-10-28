import Vue from 'vue'
import Vuex from 'vuex'
import colaboradores from './modulos/Colaboradores'
import guardias from './modulos/Guardias'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    colaboradores: colaboradores,
    guardias: guardias
  }
})
