<template>
  <div>
    <v-toolbar flat color="primary" dark>
      <v-toolbar-title>Guardias del día {{ fecha }}</v-toolbar-title>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn text large dark v-on="on"
            :disabled="guardiasDiaAnterior"
            @click="abrirDia('anterior')"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </template>
        <span>Día anterior</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn text large dark v-on="on"
            :disabled="guardiasDiaSiguiente"
            @click="abrirDia('siguiente')"
          >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </template>
        <span>Día siguiente</span>
      </v-tooltip>
      <v-spacer/>
      <v-btn
        icon
        @click="volver"
      >
        <v-icon>mdi-calendar-month</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card dark class="mt-3" :color="guardia.colaborador.color"
      v-for="(guardia, index) in guardias"
      :key="index"
      @click="abrirGuardia(guardia)"
    >
      <v-card-title class="headline">{{ guardia.colaborador.nombre }}</v-card-title>

      <v-card-text>
        <v-row >
          <v-col cols="4" class="subtitle-1 pb-0">
            <b>Hora de entrada:</b> {{ guardia.inicioTiempo }}
          </v-col>
          <v-col cols="4" class="subtitle-1 pb-0">
            <b>Hora de salida:</b> {{ guardia.finTiempo }}
          </v-col>
          <v-col cols="4" class="subtitle-1 pb-0">
            <v-checkbox disabled class="mt-0 mb-0"
              v-model="guardia.critica"
              label="Guardia crítica"
            />
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions class="pt-0">
        <v-btn @click.stop="eliminar(guardia)" text>Eliminar</v-btn>
      </v-card-actions>
    </v-card>

    <v-fab-transition>
      <v-btn color="pink" dark bottom right fab fixed
        @click="agregar"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>

    <v-snackbar
      v-model="mensaje"
      :timeout="2000"
      color="success"
    >
      Operación exitosa
      
      <v-btn text
        @click="mensaje = false"
      >
        <v-icon>mdi-close-circle</v-icon>
      </v-btn>
    </v-snackbar>

    <v-dialog
      max-width="50%"
      v-model="dialog"
    >
      <eliminar-dialog
        :datos="datosEliminar"
        @open-alert="abrirAlerta"
        @close-dialog="cerrarDialog"
      />
    </v-dialog>
  </div>
</template>

<script>
import * as fechas from '@/helpers/fechas.js'

import EliminarDialog from '@/components/Generales/EliminarDialog'

export default {
  name: 'ListaGuardias',
  data: () => ({
    fab: false,
    right: true,
    mensaje: false,
    dialog: false,
    datosEliminar: {},
    guardiasDiaAnterior: true,
    guardiasDiaSiguiente: true
  }),
  computed: {
    guardias () {
      return this.$store.state.guardias.listaGuardiasFechaSeleccionada
    },
    fecha () {
      return this.$store.state.guardias.diaGuardiaSeleccionado
    }
  },
  mounted () {
    this.$store.commit('guardias/cargarListaGuardiasFechaSeleccionada')

    this.guardiasDiaAnterior = this.hayGuardiasDia('anterior')
    this.guardiasDiaSiguiente = this.hayGuardiasDia('siguiente')
  },
  methods: {
    abrirDia (tipoDia) {
      let fecha = (tipoDia === 'anterior') 
                  ? fechas.restarDia(this.fecha, 1)
                  : fechas.sumarDia(this.fecha, 1)
      
      this.$store.commit('guardias/guardarDiaGuardiaSeleccionado', fecha)
      this.$store.commit('guardias/cargarListaGuardiasFechaSeleccionada')
      this.guardiasDiaAnterior = this.hayGuardiasDia('anterior')
      this.guardiasDiaSiguiente = this.hayGuardiasDia('siguiente')
    },
    obtenerLista (fecha) {
      let guardias = []

      this.$store.state.guardias.listaGuardias.forEach(guardia => {
        let dia = guardia.dia.ano + '-' + guardia.dia.mes + '-' + guardia.dia.dia

        if (dia === fecha)
          guardias.push(guardia)
      })

      return guardias
    },
    hayGuardiasDia (tipoDia) {
      let nuevaFecha = (tipoDia === 'anterior') 
                        ? fechas.restarDia(this.fecha, 1)
                        : fechas.sumarDia(this.fecha, 1)
      
      let guardias = this.obtenerLista(nuevaFecha)

      return (guardias.length > 0) ? false : true
    },
    eliminar (guardia) {
      let dato = {
        tipo: 'Guardia',
        datos: guardia,
        accion: 'guardias/borrar',
        mensaje: 'Se eliminará la guardia de ' + guardia.inicioTiempo + ' a ' + guardia.finTiempo + ', desea continuar?'
      }

      this.datosEliminar = dato
      this.dialog = true
    },
    abrirGuardia (guardia) {
      this.$store.commit('guardias/seleccionarGuardia', guardia)
      this.$router.push('Guardia')
    },
    agregar () {
      this.$store.commit('guardias/seleccionarGuardia', {})
      this.$router.push('Guardia')
    },
    cerrarDialog () {
      this.dialog = false
    },
    abrirAlerta () {
      this.dialog = false
      this.mensaje = true
    },
    volver () {
      this.$store.commit('guardias/limpiarSeleccionarGuardia')
      this.$router.push('/')
    },
  },
  components: {
    EliminarDialog
  }
}
</script>

<style>

</style>