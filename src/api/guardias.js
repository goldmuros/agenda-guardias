import { 
  getListaGuardias,
  setGuardia,
  updateGuardia,
  deleteGuardia
} from '../dao/firebase.js'

const callDeleteGuardia = (idGuardia) => {
  return new Promise ((resolve) => {
    deleteGuardia(idGuardia).then(() => {
      return resolve()
    })
  })
}

const callUpdateGuardia = (guardia) => {
  return new Promise ((resolve) => {
    updateGuardia(guardia).then(() => {
      return resolve(guardia)
    })
  })
}

const callSetGuardia = (datosGuardia) => {
  return new Promise ((resolve) => {
    setGuardia(datosGuardia).then((id) => {
      let guardiaCreada = {
        id: id,
        guardiaRef: datosGuardia.guardiaRef,
        colaborador: datosGuardia.colaborador,
        critica: datosGuardia.critica,
        dia: datosGuardia.dia,
        inicioTiempo: datosGuardia.inicioTiempo,
        finTiempo: datosGuardia.finTiempo
      }

      resolve(guardiaCreada)
    })
  })
}

const getGuardias = async (fecha) => {
  return await getListaGuardias(fecha).then((guardias) => {
    return guardias
  })
}

const agregarGuardia = async (datosGuardias) => {
  let promesasGuardias = []

  datosGuardias.forEach( (datosGuardia) => {
    promesasGuardias.push(callSetGuardia(datosGuardia))
  })

  return Promise.all(promesasGuardias).then(guardias => {
    if ( guardias.length > 1 ) {
      for ( let i = 0; i < guardias.length; i++ ) {
        if ( i === 0 )
          guardias[i].guardiaRef = guardias[i + 1].id
        else
          guardias[i].guardiaRef = guardias[i - 1].id
  
        updateGuardia(guardias[i])
      }
    }

    return guardias
  })
}

const modificarGuardia = async (datosGuardias) => {
  let promesasGuardias = []

  datosGuardias.forEach( (datosGuardia) => {
    // Si es una modificacion pero no habia guardia para el dia siguiente se la crea
    let promesa = (datosGuardia.id) ? callUpdateGuardia(datosGuardia) : callSetGuardia(datosGuardia)

    promesasGuardias.push(promesa)
  })

  return Promise.all(promesasGuardias).then(guardias => {
    if ( guardias.length > 1 ) {
      for ( let i = 0; i < guardias.length; i++ ) {
        if ( i === 0 )
          guardias[i].guardiaRef = guardias[i + 1].id
        else
          guardias[i].guardiaRef = guardias[i - 1].id
  
        updateGuardia(guardias[i])
      }
    }

    return guardias
  })
}

const borrarGuardia = async (idGuardias) => {
  let promesasGuardias = []

  idGuardias.forEach( (idGuardia) => {
    promesasGuardias.push(callDeleteGuardia(idGuardia))
  })

  return Promise.all(promesasGuardias)
}

export {
  getGuardias,
  agregarGuardia,
  modificarGuardia,
  borrarGuardia
}