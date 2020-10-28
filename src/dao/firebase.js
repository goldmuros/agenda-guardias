import { db } from '../config/firebase.js'

const setGuardia = (datosGuardia) => {
  return new Promise ((resolve) => {
    db.collection('guardias').add(datosGuardia)
    .then((guardia) => {
      return resolve(guardia.id)
    })
    .catch((error) => {
      console.log('Error DAO Firebase setGuardia')
      console.log(error)
    })
  })
}

const updateGuardia = (datosGuardia) => {
  return new Promise ((resolve) => {
    db.collection('guardias').doc(datosGuardia.id).update({
      guardiaRef: datosGuardia.guardiaRef,
      colaborador: datosGuardia.colaborador,
      critica: datosGuardia.critica,
      dia: datosGuardia.dia,
      inicioTiempo: datosGuardia.inicioTiempo,
      finTiempo: datosGuardia.finTiempo
    })
    .then(() => {
      return resolve()
    })
    .catch((error) => {
      console.log('Error DAO Firebase updateGuardia')
      console.log(error)
    })
  })
}

const deleteGuardia = (idGuardia) => {
  return new Promise ((resolve) => {
    db.collection('guardias').doc(idGuardia).delete().then(() => {
      return resolve()
    })
    .catch((error) => {
      console.log('Error DAO Firebase deleteGuardia')
      console.log(error)
    })
  })
}

const getListaGuardias = (fecha) => {
  return new Promise((resolve) => {
    let arrayGuardias = []

    db.collection('guardias')
    .where('dia.ano', '==', fecha.ano)
    .where('dia.mes', '==', fecha.mes)
    .get().then((guardias) => {
      guardias.forEach(guardia => {
        let datoGuardia = {
          id: guardia.id,
          colaborador: guardia.data().colaborador,
          critica: guardia.data().critica,
          dia: guardia.data().dia,
          guardiaRef: guardia.data().guardiaRef,
          inicioTiempo: guardia.data().inicioTiempo,
          finTiempo: guardia.data().finTiempo
        }

        arrayGuardias.push(datoGuardia)
      })

      return resolve(arrayGuardias)
    })
    .catch((error) => {
      console.log('Error DAO Firebase getListaGuardias')
      console.log(error)
    })
  })
}

const getListaColaboradores = () => {
  return new Promise ((resolve) => {
    let arrayColaboradores = []

    db.collection('colaboradores').get().then((colaboradores) => {
      colaboradores.docs.forEach(colaborador => {
        let datoColaborador = {
          id: colaborador.id,
          apellido: colaborador.data().apellido,
          nombre: colaborador.data().nombre, 
          dni: colaborador.data().dni,
          funcion: colaborador.data().funcion,
          telefono: colaborador.data().telefono,
          tipo: colaborador.data().tipo,
          color: colaborador.data().color
        }

        arrayColaboradores.push(datoColaborador)
      })
      
      return resolve(arrayColaboradores)
    })
    .catch((error) => {
      console.log('Error DAO Firebase getListaColaboradores')
      console.log(error)
    })
  })
}

const setColaborador = (datosColaborador) => {
  return new Promise ((resolve) => {
    db.collection('colaboradores').add(datosColaborador)
    .then((colaborador) => {
      return resolve(colaborador.id)
    })
    .catch((error) => {
      console.log('Error DAO Firebase setColaborador')
      console.log(error)
    })
  })
}

const updateColaborador = (datosColaborador) => {
  return new Promise ((resolve) => {
    db.collection('colaboradores').doc(datosColaborador.id).update({
      nombre: datosColaborador.nombre,
      apellido: datosColaborador.apellido,
      telefono: datosColaborador.telefono,
      dni: datosColaborador.dni,
      funcion: datosColaborador.funcion,
      tipo: datosColaborador.tipo,
      color: datosColaborador.color
    })
    .then(() => {
      return resolve()
    })
    .catch((error) => {
      console.log('Error DAO Firebase updateColaborador')
      console.log(error)
    })
  })
}

const deleteColaborador = (idColaborador) => {
  return new Promise ((resolve) => {
    db.collection('colaboradores').doc(idColaborador).delete().then(() => {
      return resolve()
    })
    .catch((error) => {
      console.log('Error DAO Firebase deleteColaborador')
      console.log(error)
    })
  })
}

export {
  getListaColaboradores,
  setColaborador,
  deleteColaborador,
  updateColaborador,
  getListaGuardias,
  setGuardia,
  updateGuardia,
  deleteGuardia
}