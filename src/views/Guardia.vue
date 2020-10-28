<template>
  <div>
    <v-toolbar flat color="primary" dark>
      <v-toolbar-title>{{ titulo }}</v-toolbar-title>
      <v-spacer/>
      <v-tooltip left v-if="guardiaRefAnterior">
        <template v-slot:activator="{ on }">
          <v-btn text large dark v-on="on" @click="abrirGuaridaRef">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </template>
        <span>{{ mensajeTooltipRef }}</span>
      </v-tooltip>
      <v-tooltip left v-if="guardiaRefSiguiente">
        <template v-slot:activator="{ on }">
          <v-btn text large dark v-on="on" @click="abrirGuaridaRef">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </template>
        <span>{{ mensajeTooltipRef }}</span>
      </v-tooltip>
    </v-toolbar>
    <v-form
      ref="form"
    >
      <v-row>
        <v-col cols="6">
          <v-select
            :disabled="deshabilitar"
            v-model="colaborador"
            :items="itemsColaboradores"
            label="Colaborador"
            required
          />
        </v-col>
        <v-col cols="6">
          <v-checkbox
            :disabled="deshabilitar"
            v-model="critica"
            label="Guardia crítica"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6" v-if="inicioTiempo !== '00:00'">
          <v-select
            v-model="inicioTiempo"
            :items="itemsTiempo"
            label="Horario de la Guardia"
            required
            @change="cambiarMensajeFinGuardia"
          />
        </v-col>
        <v-col cols="6" v-else>
          {{ continuaMensaje }}
        </v-col>
        <v-col cols="6">
          {{ mensajeFinTiempo }}
        </v-col>
      </v-row>
    </v-form>

    <v-row justify="center" class="mt-3">
      <v-btn
        :disabled="deshabilitarAgregar"
        color="success"
        class="mr-4"
        @click="agregarModificar"
      >
        {{ textoBotonAccion }}
      </v-btn>

      <v-btn
        color="error"
        class="mr-4"
        @click="volver"
      >
        volver
      </v-btn>

      <v-btn
        color="warning"
        :disabled="deshabilitar"
        @click="limpiar"
      >
        limpiar
      </v-btn>
    </v-row>

    <v-snackbar
      v-model="mensaje"
      :timeout="2000"
      color="success"
    >
      Operación exitosa
      
      <v-btn
        text
        @click="mensaje = false"
      >
        <v-icon>mdi-close-circle</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import * as fechas from '@/helpers/fechas.js'

import { createNamespacedHelpers } from 'vuex';
const { mapGetters } = createNamespacedHelpers('guardias');  

export default {
  name: 'FormularioColaborador',
  data: () => ({
    titulo: 'Agregar Guardia',
    mensaje: false,
    inicioTiempo: '08:00',
    finTiempo: '20:00',
    colaborador: '',
    guardiaRef: '',
    critica: false,
    itemsTiempo: ['08:00', '20:00'],
    esModificacion: false,
    textoBotonAccion: 'agregar',
    continuaMensaje: '',
    mensajeFinTiempo: 'La Guardia finaliza a las 20:00 hs',
    guardiaRefAnterior: false,
    guardiaRefSiguiente: false,
    mensajeTooltipRef: 'Más datos de la Guardia',
    guardiaOriginal: {}
  }),
  computed: {
    ...mapGetters(['obtenerGuardia']),
    itemsColaboradores () {
      return this.$store.getters['colaboradores/getListaSelect']
    },
    deshabilitarAgregar () {
      return (this.colaborador === '' || this.colaborador === undefined || this.inicioTiempo === '00:00') 
        ? true
        : false
    },
    deshabilitar () {
      return (this.inicioTiempo === '00:00') ? true : false
    }
  },
  methods: {
    cambiarMensajeFinGuardia () {
      this.mensajeFinTiempo = (this.inicioTiempo === '08:00')
        ? 'La Guardia finaliza a las 20:00 hs'
        : 'Continua Guardia hasta las 08:00 hs del día siguiente'

      this.finTiempo = (this.inicioTiempo === '08:00')
        ? '20:00'
        : '08:00'
    },
    cerrarDialog () {
      this.dialogColor = false
    },
    volver () {
      this.$router.go(-1)
    },
    abrirGuaridaRef () {
      let guardia = this.obtenerGuardia(this.guardiaOriginal.guardiaRef)

      this.inicioTiempo = guardia.inicioTiempo
      this.colaborador = guardia.colaborador.id
      this.critica = guardia.critica

      let fecha = fechas.formatearFechaStringAnoMesDia(this.$store.state.guardias.seleccionadaGuardia.dia)

      this.titulo = 'Modificar Guardia del día ' + fecha

      this.guardiaOriginal = guardia
      this.guardiaRefAnterior = (this.inicioTiempo === '00:00') ? true : false
      this.guardiaRefSiguiente = (this.inicioTiempo === '20:00') ? true : false

      if (this.inicioTiempo === '00:00')
        this.continuaMensaje = 'Continua Guardia de las 20:00 hs del día anterior'
    },
    agregarModificar () {
      if (this.validarCampos()) {
        let guardia = {
          colaboradorId: this.colaborador,
          inicioTiempo: this.inicioTiempo,
          finTiempo: this.finTiempo,
          critica: this.critica
        }

        if (this.esModificacion) {
          guardia.guardiaRef = this.guardiaOriginal.guardiaRef
          guardia.id = this.guardiaOriginal.id

          guardia.dia = this.guardiaOriginal.dia.ano + '-' + this.guardiaOriginal.dia.mes + '-' + this.guardiaOriginal.dia.dia 
        }

        let accion = (this.esModificacion)
          ? 'guardias/modificar'
          : 'guardias/agregar'

        this.$store.dispatch(accion, guardia).then(() => {
          this.limpiar()
          this.mensaje = true
        })
      }
    },
    validarCampos () {
      if (!this.$refs.form.validate()) return false

      return true
    },
    limpiar () {
      this.colaborador = ''
      this.critica = false
      this.inicioTiempo = this.itemsTiempo[0]
      this.finTiempo = '20:00'
      this.mensajeFinTiempo = 'La Guardia finaliza a las 20:00 hs'
      this.guardiaRefAnterior = false
      this.guardiaRefSiguiente = false
    }
  },
  mounted () {
    if (Object.keys(this.$store.state.guardias.seleccionadaGuardia).length > 0) {
      let fecha = fechas.formatearFechaStringAnoMesDia(this.$store.state.guardias.seleccionadaGuardia.dia)

      this.esModificacion = true
      this.textoBotonAccion = 'modificar'
      this.titulo = 'Modificar Guardia del día ' + fecha
      this.inicioTiempo = this.$store.state.guardias.seleccionadaGuardia.inicioTiempo
      this.finTiempo = this.$store.state.guardias.seleccionadaGuardia.finTiempo
      this.colaborador = this.$store.state.guardias.seleccionadaGuardia.colaborador.id
      this.critica = this.$store.state.guardias.seleccionadaGuardia.critica

      this.guardiaOriginal = this.$store.state.guardias.seleccionadaGuardia

      if (this.inicioTiempo === '00:00') {
        this.continuaMensaje = 'Continua Guardia de las 20:00 hs del día anterior'
        this.mensajeFinTiempo = 'La Guardia finaliza a las 08:00 hs'
        this.guardiaRefAnterior = true
        this.guardiaRefSiguiente = false
      }

      if (this.inicioTiempo === '20:00') {
        this.continuaMensaje = 'Continua Guardia hasta las 08:00 hs del día siguiente'
        this.mensajeFinTiempo = 'La Guardia finaliza a las 08:00 hs'
        this.guardiaRefSiguiente = true
        this.guardiaRefAnterior = false
      }
    }
  }
}
</script>