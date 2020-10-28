<template>
  <v-card>
    <v-card-title>
      <span class="headline">Eliminar {{ datos.tipo }}</span>
    </v-card-title>
    <v-card-text>
      {{ datos.mensaje }}
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <!-- Cerrar -->
      <v-btn
        small
        slot="activator"
        @click.stop="cerrar"
        text
      >
        Cancelar
      </v-btn>
      <!-- Aceptar -->
      <v-btn
        dark
        small
        class="red ml-4"
        slot="activator"
        @click.stop="eliminar"
        text
      >
        Eliminar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'EliminarDialog',
  props: {
    datos: Object
  },
  methods: {
    cerrar () {
      this.$emit('close-dialog')
    },
    eliminar () {
      this.$store.dispatch(this.datos.accion, this.datos.datos)
      .then(() => {
        // Abre dialog Operacion Correcta
        this.$emit('open-alert')
      }).catch((error) => {
        // Abre dialog Error Operacion
        console.log(error)
      })
    }
  }
}
</script>