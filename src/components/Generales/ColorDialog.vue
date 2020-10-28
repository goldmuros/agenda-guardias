<template>
  <v-card>
      <v-card-title class="headline">Color</v-card-title>

      <v-card-text>
        <v-row justify="center" class="mt-3">
          <v-color-picker
            v-model="colorSeleccionado"
            dark
            class="ma-2"
            hide-canvas
            hide-inputs
            show-swatches
            :value="colorEntrada"
          />
        </v-row>
        <v-row justify="center" class="mt-3">
          <v-col cols="6">
            <v-btn
              color="success"
              @click="seleccionarColor"
            >
              Aceptar
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn
              color="error"
              @click="cerrar"
            >
              Cancelar
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
</template>

<script>
export default {
  name: 'ColorDialog',
  props: {
     colorEntrada: String
  },
  data: () => ({
    colorSeleccionado: ''
  }),
  methods: {
    seleccionarColor () {
      this.$emit('color-seleccionado', this.colorSeleccionado)
    },
    cerrar () {
      this.$emit('close-dialog')
    }
  }
}
</script>

<style>

</style>