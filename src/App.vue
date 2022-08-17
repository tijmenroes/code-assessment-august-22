<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <h1>OWOW</h1>
      </div>
      <v-spacer></v-spacer>
    <v-menu offset-y v-if="isLoggedIn">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color=""
          light
          v-bind="attrs"
          v-on="on"
        >
          {{currentUser.name}} 
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-list-item-title @click="logOutUser">
            <v-icon small class="logoutIcon">mdi-lock</v-icon>Logout
            </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    </v-app-bar>

    <v-main>
      <v-alert type="error" v-if="error"> {{error}}</v-alert>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: "App",

  computed: {
    ...mapGetters(['error', 'currentUser', 'isLoggedIn']),
  },

  methods: {
    ...mapActions(['logOutUser'])
  }
};
</script>

<style scoped>
.logoutIcon {
  margin-left: 8px;
}
</style>
