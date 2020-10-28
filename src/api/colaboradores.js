import {
  getListaColaboradores,
  setColaborador,
  deleteColaborador,
  updateColaborador
} from '../dao/firebase.js'

const getLista = async () => {
  return await getListaColaboradores().then((colaboradores) => {
      return colaboradores
  })
}

const agregarColaborador = async (datosColaborador) => {
  return await setColaborador(datosColaborador).then((id) => {
    return id
  })
}

const modificarColaborador = async (datosColaborador) => {
  return await updateColaborador(datosColaborador)
}

const borrarColaborador = async (idColaborador) => {
  return await deleteColaborador(idColaborador)
}

export {
  getLista,
  agregarColaborador,
  borrarColaborador,
  modificarColaborador
}
