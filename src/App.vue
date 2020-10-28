<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-spacer></v-spacer>
      <h1 class="d-flex align-center">
        Agenda Guardias
      </h1>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
      <v-container fluid class="pt-0">
        <v-row>
          <v-col cols="3">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <router-link to="/colaboradores">Lista Colaboradores</router-link>
                </v-list-item-title>
                <v-list-item-title>
                  <router-link to="/">Guardias</router-link>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="9">
            <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  beforeCreate () {
    this.$store.dispatch('colaboradores/cargar')
  },
}
</script>
