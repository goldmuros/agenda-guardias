const formatearFechaAnoMes = (fecha) => {
  let mes = fecha.getMonth() + 1
  let mesString = (mes < 10) ? '0' + mes : mes
  let ano = fecha.getFullYear()

  return ano + '-' + mesString
}

const formatearFechaAnoMesDia = (fecha) => {
  let mes = fecha.getMonth() + 1
  let mesString = (mes < 10) ? '0' + mes : mes
  let dia = fecha.getDate()
  let diaString = (dia < 10) ? '0' + dia : dia
  let ano = fecha.getFullYear()

  return ano + '-' + mesString + '-' + diaString
}

const fechaActualAnoMes = () => {
  let fechaActual = new Date ()

  return formatearFechaAnoMes(fechaActual)
}
const fechaActual = () => {
  let fechaActual = new Date ()

  return formatearFechaAnoMesDia(fechaActual)
}

const sumarDia = (fecha, cantidad) => {
  let date = new Date (fecha + 'T00:00')
  date.setDate(date.getDate() + cantidad)

  return formatearFechaAnoMesDia(date)
}

const restarDia = (fecha, cantidad) => {
  let date = new Date (fecha + 'T00:00')
  date.setDate(date.getDate() - cantidad)

  return formatearFechaAnoMesDia(date)
}

const fechaActualMesAnoTexto = (fechaString) => {
  var opciones = { year: 'numeric', month: 'long'}
  let date = new Date(fechaString)

  let fechaTexto = date.toLocaleDateString('es-AR', opciones)
  return fechaTexto.charAt(0).toUpperCase() + fechaTexto.slice(1)
}

const formatearFechaStringAnoMesDia = (fecha) => {
  return fecha.ano + '-' + fecha.mes + '-' + fecha.dia
}

export {
  fechaActual,
  fechaActualAnoMes,
  sumarDia,
  restarDia,
  fechaActualMesAnoTexto,
  formatearFechaStringAnoMesDia
}