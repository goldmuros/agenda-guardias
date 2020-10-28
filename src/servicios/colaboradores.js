import * as api from '../api/colaboradores.js'

const loadColaboradores = async () => {
  return await api.getLista().then((colaboradores) => {
    return colaboradores
  })
}

const agregarColaborador = async (datosColaborador) => {
  return await api.agregarColaborador(datosColaborador).then((id) => {
    let colaborador = {
      id: id,
      nombre: datosColaborador.nombre,
      apellido: datosColaborador.apellido,
      telefono: datosColaborador.telefono,
      dni: datosColaborador.dni,
      funcion: datosColaborador.funcion,
      tipo: datosColaborador.tipo,
      color: datosColaborador.color
    }

    return colaborador
  })
}

const modificarColaborador = async (datosColaborador) => {
  return await api.modificarColaborador(datosColaborador)
}

const borrarColaborador = async (idColaborador) => {
  return await api.borrarColaborador(idColaborador)
}

const obtenerListaSelect = (arrayColaboradores) => {
  let colaboradoresSelect = []

  arrayColaboradores.forEach(colaborador => {
    colaboradoresSelect.push({
      value: colaborador.id,
      text: colaborador.nombre + ' ' + colaborador.apellido
    })
  })

  return colaboradoresSelect
}

export {
  loadColaboradores,
  agregarColaborador,
  borrarColaborador,
  modificarColaborador,
  obtenerListaSelect
}