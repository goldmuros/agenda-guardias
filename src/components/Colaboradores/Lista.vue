<template>
  <div>
    <v-toolbar flat color="primary" dark>
      <v-toolbar-title>Lista Colaboradores</v-toolbar-title>
    </v-toolbar>
    <v-card
      v-for="(colaborador, index) in colaboradores"
      :color="colaborador.color"
      :key="index"
      class="mt-3"
      @click="abrirColaborador(colaborador)"
      dark
    >
      <v-card-title class="headline">{{ colaborador.nombre }} {{ colaborador.apellido }}</v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="3" class="subtitle-1">
            <b>DNI:</b> {{ colaborador.dni }}
          </v-col>
          <v-col cols="3" class="subtitle-1">
            <b>Función:</b> {{ colaborador.funcion }}
          </v-col>
          <v-col cols="3" class="subtitle-1">
            <b>Tipo:</b> {{ colaborador.tipo }}
          </v-col>
          <v-col cols="3" class="subtitle-1">
            <b>Teléfono:</b> {{ colaborador.telefono }}
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-btn @click.stop="eliminar(colaborador)" text>Eliminar</v-btn>
      </v-card-actions>
    </v-card>

    <v-fab-transition>
      <v-btn
        color="pink"
        dark
        bottom
        right
        fab
        fixed
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
      
      <v-btn
        text
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
import EliminarDialog from '../Generales/EliminarDialog'

export default {
  name: 'ListaColaboradores',
  data () {
    return {
      mensaje: false,
      dialog: false,
      datosEliminar: {}
    }
  },
  computed: {
    colaboradores () {
      return this.$store.getters['colaboradores/getLista']
    }
  },
  methods: {
    agregar () {
      this.$store.commit('colaboradores/seleccionarColaborador', {})
      this.$router.push('Colaborador')
    },
    eliminar (colaborador) {
      let dato = {
        tipo: 'Colaborador',
        datos: colaborador,
        accion: 'colaboradores/borrar',
        mensaje: 'Se eliminará al colaborador ' + colaborador.nombre + ' ' + colaborador.apellido + ', desea continuar?'
      }

      this.datosEliminar = dato
      this.dialog = true
    },
    abrirAlerta () {
      this.dialog = false
      this.mensaje = true
    },
    cerrarDialog () {
      this.dialog = false
    },
    abrirColaborador (colaborador) {
      this.$store.commit('colaboradores/seleccionarColaborador', colaborador)
      this.$router.push('Colaborador')
    }
  },
  components: {
    EliminarDialog
  }
}
</script>