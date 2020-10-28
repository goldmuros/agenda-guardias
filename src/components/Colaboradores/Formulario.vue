<template>
  <div>
    <v-toolbar flat color="primary" dark>
      <v-toolbar-title>{{ titulo }}</v-toolbar-title>
    </v-toolbar>
    <v-form
      ref="form"
    >
      <v-row>
        <v-col cols="6">
          <v-text-field
            v-model="nombre"
            label="Nombre"
            :rules="stringRules"
            required
          />
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="apellido"
            label="Apellido"
            :rules="stringRules"
            required
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-text-field
            v-model="telefono"
            label="Télefono"
            type="tel"
            :rules="numeroRules"
            required
          />
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="dni"
            label="DNI"
            type="number"
            :rules="numeroRules"
            required
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-select
            v-model="funcion"
            :items="itemsFuncion"
            label="Función"
            :rules="stringRules"
            required
          />
        </v-col>
        <v-col cols="6">
          <v-select
            v-model="tipo"
            :items="itemsTipo"
            label="Tipo"
            :rules="stringRules"
            required
          />
        </v-col>
      </v-row>
      <v-row justify="center" align-content="center">
        <v-btn
          dark
          elevation="24"
          :color="color"
          @click="abrirDialogColor"
        >
          color
        </v-btn>
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
        @click="cancelar"
      >
        cancelar
      </v-btn>

      <v-btn
        color="warning"
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

    <v-dialog
      max-width="30%"
      v-model="dialogColor"
    >
      <color-dialog
        :colorEntrada="color"
        @color-seleccionado="colorSeleccionado"
        @close-dialog="cerrarDialog"
      />
    </v-dialog>
  </div>
</template>

<script>
import ColorDialog from '../Generales/ColorDialog'

export default {
  name: 'FormularioColaborador',
  data: () => ({
    titulo: 'Agregar Colaborador',
    textoBotonAccion: 'agregar',
    mensaje: false,
    nombre: '',
    apellido: '',
    stringRules: [
      v => !!v || 'Texto requerido'
    ],
    telefono: '',
    dni: '',
    numeroRules: [
      v => !!v || 'Número requerido.',
      v => /^[0-9]*$/.test(v) || 'Ingrese un número.',
    ],
    funcion: '',
    tipo: '',
    itemsFuncion: ['JEFE UNIDAD', 'STAFF MEDICO', 'REEMPLAZO'],
    itemsTipo: ['PLANTA', 'GUARDIA CRÍTICA'],
    color: '#03a9f4',
    dialogColor: false,
    esModificacion: false
  }),
  computed: {
    deshabilitarAgregar () {
      if (this.nombre === '' || this.nombre === undefined) return true
      if (this.apellido === '' || this.apellido === undefined) return true
      if (this.telefono === '' || this.telefono === undefined) return true
      if (this.dni === '' || this.dni === undefined) return true
      if (this.tipo === '' || this.tipo === undefined) return true
      if (this.funcion === '' || this.funcion === undefined) return true

      return false
    }
  },
  methods: {
    abrirDialogColor () {
      this.dialogColor = true
    },
    colorSeleccionado (color) {
      this.color = color
      this.dialogColor = false
    },
    cerrarDialog () {
      this.dialogColor = false
    },
    cancelar () {
      this.$router.go(-1)
    },
    agregarModificar () {
      if (this.validarCampos()) {
        let colaborador = {
          nombre: this.nombre,
          apellido: this.apellido,
          telefono: this.telefono,
          dni: this.dni,
          funcion: this.funcion,
          tipo: this.tipo,
          color: this.color
        }

        if (this.esModificacion)
          colaborador.id = this.$store.state.colaboradores.seleccionadoColaborador.id

        let accion = (this.esModificacion)
          ? 'colaboradores/modificar'
          : 'colaboradores/agregar'

        this.$store.dispatch(accion, colaborador).then(() => {
          this.limpiar()
          this.mensaje = true
        })

        // if (this.esModificacion) {
        //   colaborador.id = this.$store.state.colaboradores.seleccionadoColaborador.id

        //   this.$store.dispatch('colaboradores/modificar', colaborador).then(() => {
        //     this.limpiar()
        //     this.mensaje = true
        //   })
        // } else {
        //   this.$store.dispatch('colaboradores/agregar', colaborador).then(() => {
        //     this.limpiar()
        //     this.mensaje = true
        //   })
        // }
      }
    },
    validarCampos () {
      if (!this.$refs.form.validate()) return false
      if (this.funcion === '') return false
      if (this.tipo === '') return false

      return true
    },
    limpiar () {
      this.$refs.form.reset()
      this.color = '#03a9f4'
    }
  },
  mounted () {
    if (Object.keys(this.$store.state.colaboradores.seleccionadoColaborador).length > 0) {
      this.esModificacion = true
      this.nombre = this.$store.state.colaboradores.seleccionadoColaborador.nombre
      this.apellido = this.$store.state.colaboradores.seleccionadoColaborador.apellido
      this.telefono = this.$store.state.colaboradores.seleccionadoColaborador.telefono
      this.dni = this.$store.state.colaboradores.seleccionadoColaborador.dni
      this.funcion = this.$store.state.colaboradores.seleccionadoColaborador.funcion
      this.tipo = this.$store.state.colaboradores.seleccionadoColaborador.tipo
      this.color = this.$store.state.colaboradores.seleccionadoColaborador.color

      this.titulo = 'Modificar Colaborador'
      this.textoBotonAccion = 'modificar'
    }
  },
  components: {
    ColorDialog
  }
}
</script>