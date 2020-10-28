import * as servicio from '../../servicios/guardias.js'

const guardias = {
  namespaced: true,
  state: {
    listaGuardias: [],
    listaGuardiasFechaSeleccionada: [],
    diaGuardiaSeleccionado: '',
    seleccionadaGuardia: {}
  },
  getters: {
    listaGuardiasCalendario: (state) => {
      return servicio.listaCalendario(state.listaGuardias)
    },
    obtenerGuardia: (state) => (guardiaRefId) => {
      return servicio.cargarGuardiaRef(state.listaGuardias, guardiaRefId)
    }
  },
  mutations: {
    agregar: (state, guardias) => {
      guardias.forEach(guardia => {
        state.listaGuardias.push(guardia)
      })
    },
    cargarListaGuardiasFechaSeleccionada: (state) => {
      state.listaGuardiasFechaSeleccionada = []
      
      state.listaGuardias.forEach(guardia => {
        let dia = guardia.dia.ano + '-' + guardia.dia.mes + '-' + guardia.dia.dia

        if (dia === state.diaGuardiaSeleccionado) {
          if (guardia.inicioTiempo === '00:00')
            guardia.inicioTiempo = 'Continua Guardia de las 20:00 hs del día anterior'
          
          if (guardia.inicioTiempo === '20:00')
            guardia.finTiempo = 'Continua Guardia hasta las 08:00 hs del día siguiente'
          
          state.listaGuardiasFechaSeleccionada.push(guardia)
        }
      })
    },
    seleccionarGuardia: (state, guardia) => {
      state.seleccionadaGuardia = guardia
    },
    limpiarSeleccionarGuardia: (state) => {
      state.seleccionadaGuardia = {}
    },
    modificar: (state, guardias) => {
      guardias.forEach(datosGuardia => {
        let indice = state.listaGuardias.findIndex((guardia) => {
          return guardia.id === datosGuardia.id
        })
  
        if (indice > -1)
          state.listaGuardias[indice] = datosGuardia
        else
          state.listaGuardias.push(datosGuardia)
      })
    },
    modificarColaborador: (state, guardias) => {
      guardias.forEach(datosGuardia => {
        let indice = state.listaGuardias.findIndex(guardia => {
          return guardia.id === datosGuardia.id
        })

        state.listaGuardias[indice] = datosGuardia
      })
    },
    guardarDiaGuardiaSeleccionado: (state, fecha) => {
      state.diaGuardiaSeleccionado = fecha
    },
    borrar: (state, guardiaIds) => {
      guardiaIds.forEach(id => {
        let indice = state.listaGuardias.findIndex((guardia) => {
          return guardia.id === id
        })

        state.listaGuardias.splice(indice, 1)
      })
    }
  },
  actions: {
    agregar: async (context, datosGuardia) => {
      let guardias = await servicio.agregarGuardia(
        datosGuardia,
        context.state.diaGuardiaSeleccionado,
        context.rootState.colaboradores.listaColaboradores
      )

      context.commit('agregar', guardias)
      context.commit('cargarListaGuardiasFechaSeleccionada')
    },
    modificar: async (context, datosGuardia) => {
      let guardias = await servicio.modificarGuardia(
        datosGuardia,
        datosGuardia.dia,
        context.rootState.colaboradores.listaColaboradores)
      context.commit('modificar', guardias)
      context.commit('cargarListaGuardiasFechaSeleccionada')
    },
    cargar: async (context, fecha) => {
      let guardias = await servicio.getGuardias(fecha)
      context.state.listaGuardias = guardias
    },
    borrar: async (context, guardia) => {
      let guardiasIds = await servicio.borrarGuardia(guardia)
      context.commit('borrar', guardiasIds)
    },
    modificarColaboradorGuardias: {
      root: true,
      async handler (context, colaborador) {
        let guardias = await servicio.modificarColaborador(context.rootState.guardias.listaGuardias, colaborador)
        context.commit('modificarColaborador', guardias)
      }
    }
  }
}

export default guardias