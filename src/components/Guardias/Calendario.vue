<template>
  <div>
    <v-toolbar flat color="primary" dark>
      <v-toolbar-title>Guardias del mes {{ titulo }}</v-toolbar-title>
      <v-spacer/>
      <v-btn outlined class="mr-4" color="darken-2" @click="cargarHoy">
        Hoy
      </v-btn>
      <v-btn fab text small color="darken-2" @click="previoMes">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn fab text small color="darken-2" @click="siguienteMes">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-toolbar>

    <v-sheet height="600">
      <v-calendar
        ref="calendar"
        color="primary"
        :events="guardias"
        :event-color="cargarEventosColores"
        :type="'month'"
        v-model="focusHoy"
        locale="es-AR"
        @click:day="abrirDia"
        @click:more="abrirDia"
        @click:date="abrirDia"
        @change="mostrarTitulo"
      />
    </v-sheet>
  </div>
</template>

<script>
  import * as fechas from '@/helpers/fechas.js'

  export default {
    name: 'Calendario',
    data: () => ({
      focusHoy: '',
      fechaActual: '',
      fechaParaTitulo: '',
      titulo: ''
    }),
    computed: {
      guardias () {
        return this.$store.getters['guardias/listaGuardiasCalendario']
      }
    },
    mounted () {
      this.$store.dispatch('guardias/cargar', fechas.fechaActualAnoMes())
    },
    methods: {
      abrirDia ({ date }) {
        this.$store.commit('guardias/guardarDiaGuardiaSeleccionado', date)
        this.$router.push('ListaGuardias')
      },
      cargarEventosColores (evento) {
        return evento.color
      },
      cargarHoy () {
        this.focusHoy = fechas.fechaActual()
      },
      previoMes () {
        this.$refs.calendar.prev()
      },
      siguienteMes () {
        this.$refs.calendar.next()
      },
      mostrarTitulo ({end}) {
        this.titulo = fechas.fechaActualMesAnoTexto(end.date)
      }
    }
  }
</script>