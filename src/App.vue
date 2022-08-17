<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <h1>OWOW</h1>
      </div>
    </v-app-bar>

    <v-main>
      <v-alert type="error" v-if="error"> {{error}}</v-alert>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: "App",

  computed: {
    ...mapGetters(['error'])
  }
};
</script>
