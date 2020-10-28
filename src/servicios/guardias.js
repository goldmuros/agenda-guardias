import * as api from '../api/guardias.js'
import * as fechas from '../helpers/fechas.js'

const obtenerGuardiasId = (guardia) => {
  let guardiasIds = []

  guardiasIds.push(guardia.id)

  if (guardia.guardiaRef !== '')
    guardiasIds.push(guardia.guardiaRef)

  return guardiasIds
}

const formatearGuardia = (datosGuardia, diaSeleccionado, arrayColaboradores) => {
  let guardia = {
    critica: datosGuardia.critica,
    dia: {
      ano: diaSeleccionado.split('-')[0],
      mes: diaSeleccionado.split('-')[1],
      dia: diaSeleccionado.split('-')[2]
    },
    inicioTiempo: datosGuardia.inicioTiempo,
    finTiempo: datosGuardia.finTiempo
  }

  // Referencia para guardias que continuan en otros dias
  guardia.guardiaRef = (!datosGuardia.guardiaRef) ? '' : datosGuardia.guardiaRef

  if (datosGuardia.id)
    guardia.id = datosGuardia.id

  arrayColaboradores.forEach(colaborador => {
    if (datosGuardia.colaboradorId === colaborador.id) {
      guardia.colaborador = {
        id: colaborador.id,
        nombre: colaborador.nombre + ' ' + colaborador.apellido,
        color: colaborador.color
      }
    }
  })

  return guardia
}

const getGuardias = async (fecha) => {
  let dia = {
    ano: fecha.split('-')[0],
    mes: fecha.split('-')[1]
  }

  return await api.getGuardias(dia).then((guardias) => {
    return guardias
  })
}

const listaCalendario = (arrayGuardias) => {
  let guardias = []

  arrayGuardias.forEach(datoGuardia => {
    let fecha = datoGuardia.dia.ano + '-' + datoGuardia.dia.mes + '-' + datoGuardia.dia.dia

    let guardia = {
      name: datoGuardia.colaborador.nombre,
      color: datoGuardia.colaborador.color,
      start: fecha + ' ' + datoGuardia.inicioTiempo,
      end: fecha + ' ' + datoGuardia.finTiempo
    }

    guardias.push(guardia)
  })

  return guardias
}

const cargarGuardiaRef = (arrayGuardias, guardiaRefId) => {
  return arrayGuardias.find((guardia) => {
    return guardia.id === guardiaRefId
  })
}

const agregarGuardia = async (datosGuardia, diaSeleccionado, arrayColaboradores) => {
  let guardias = []

  if (datosGuardia.inicioTiempo === '20:00') {
    let objGuardia = {
      colaboradorId: datosGuardia.colaboradorId,
      inicioTiempo: datosGuardia.inicioTiempo,
      finTiempo: '00:00',
      critica: datosGuardia.critica
    }

    //Primer guardia
    guardias.push(formatearGuardia(objGuardia, diaSeleccionado, arrayColaboradores))

    objGuardia.inicioTiempo = '00:00'
    objGuardia.finTiempo = datosGuardia.finTiempo

    //Segunda guardia
    guardias.push(formatearGuardia(objGuardia, fechas.sumarDia(diaSeleccionado, 1), arrayColaboradores))
  } else {
    let objGuardia = {
      colaboradorId: datosGuardia.colaboradorId,
      inicioTiempo: datosGuardia.inicioTiempo,
      finTiempo: datosGuardia.finTiempo,
      critica: datosGuardia.critica
    }

    guardias.push(formatearGuardia(objGuardia, diaSeleccionado, arrayColaboradores))
  }

  return await api.agregarGuardia(guardias).then((guardias) => {
    return guardias
  })
}

const modificarGuardia = async (datosGuardia, diaSeleccionado, arrayColaboradores) => {
  let guardias = []

  if (datosGuardia.inicioTiempo === '08:00') {
    if (datosGuardia.guardiaRef !== '') {
      let guardiaRefBorrar = {
        id: datosGuardia.guardiaRef
      }

      await borrarGuardia(guardiaRefBorrar)
    }

    guardias.push(formatearGuardia(datosGuardia, diaSeleccionado, arrayColaboradores))

  } else {
    let objGuardia = {
      id: datosGuardia.id,
      colaboradorId: datosGuardia.colaboradorId,
      inicioTiempo: datosGuardia.inicioTiempo,
      finTiempo: '00:00',
      critica: datosGuardia.critica,
      guardiaRef: datosGuardia.guardiaRef
    }
  
    //Primer guardia
    guardias.push(formatearGuardia(objGuardia, diaSeleccionado, arrayColaboradores))
  
    objGuardia.id = datosGuardia.guardiaRef // Invertimos los ids
    objGuardia.guardiaRef = datosGuardia.id
    objGuardia.inicioTiempo = '00:00'
    objGuardia.finTiempo = datosGuardia.finTiempo
  
    //Segunda guardia
    guardias.push(formatearGuardia(objGuardia, fechas.sumarDia(diaSeleccionado, 1), arrayColaboradores))
  }

  return await api.modificarGuardia(guardias)
}

const borrarGuardia = async (guardia) => {
  let guardias = obtenerGuardiasId(guardia)

  await api.borrarGuardia(guardias)

  return guardias
}

const modificarColaborador = async (arrayGuardias, colaborador) => {
  let guardias = []

  arrayGuardias.forEach(guardia => {
    if (guardia.colaborador.id === colaborador.id) {
      guardia.colaborador.nombre = colaborador.nombre
      guardia.colaborador.color =colaborador.color
    }

    guardias.push(guardia)
  })
  
  return await api.modificarGuardia(guardias)
}

export {
  getGuardias,
  listaCalendario,
  agregarGuardia,
  modificarGuardia,
  borrarGuardia,
  cargarGuardiaRef,
  modificarColaborador
}