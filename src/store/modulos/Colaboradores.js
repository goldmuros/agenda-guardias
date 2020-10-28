import * as servicio from '../../servicios/colaboradores.js'

const colaboradores = {
  namespaced: true,
  state: {
    listaColaboradores: [],
    seleccionadoColaborador: {}
  },
  getters: {
    getLista: state => state.listaColaboradores,
    getListaSelect: state => servicio.obtenerListaSelect(state.listaColaboradores)
  },
  mutations: {
    agregar: (state, colaborador) => {
      state.listaColaboradores.push(colaborador)
    },
    modificar: (state, datosColaborador) => {
      let indice = state.listaColaboradores.findIndex((colaborador) => {
        return colaborador.id === datosColaborador.id
      })

      state.listaColaboradores[indice] = datosColaborador
    },
    borrar: (state, id) => {
      let indice = state.listaColaboradores.findIndex((colaborador) => {
        return colaborador.id === id
      })

      state.listaColaboradores.splice(indice, 1)
    },
    seleccionarColaborador: (state, colaborador) => {
      state.seleccionadoColaborador = colaborador
    }
  },
  actions: {
    async agregar (context, datosColaborador) {
      let colaborador = await servicio.agregarColaborador(datosColaborador)
      context.commit('agregar', colaborador)
    },
    async modificar ({dispatch, commit}, datosColaborador) {
      await servicio.modificarColaborador(datosColaborador)
      let colaborador = {
        id: datosColaborador.id,
        nombre: datosColaborador.nombre + ' ' + datosColaborador.apellido,
        color: datosColaborador.color
      }

      dispatch('modificarColaboradorGuardias', colaborador, { root: true })
      commit('modificar', datosColaborador)
    },
    async cargar (context) {
      let colaboradores = await servicio.loadColaboradores()
      context.state.listaColaboradores = colaboradores
    },
    async borrar (context, colaborador) {
      await servicio.borrarColaborador(colaborador.id)
      context.commit('borrar', colaborador.id)
    }
  }
}

export default colaboradores