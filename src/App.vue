<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <h1>OWOW</h1>
      </div>
      <v-spacer></v-spacer>
      <v-menu offset-y v-if="isLoggedIn">
        <template v-slot:activator="{ on, attrs }">
          <v-btn outlined light v-bind="attrs" v-on="on">
            {{ currentUser.name }}
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
      <v-alert type="error" v-if="error"> {{ error }}</v-alert>
      <div class="loadingContainer" v-if="isLoading" >
        <div class="loadingBar">
          Loading...
          <v-progress-linear color="primary" indeterminate rounded height="6" />
        </div>
      </div>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",

  computed: {
    ...mapGetters(["error", "currentUser", "isLoggedIn", "isLoading"]),
  },

  methods: {
    ...mapActions(["logOutUser"]),
  },
};
</script>

<style scoped lang="scss">
.logoutIcon {
  margin-left: 8px;
}

.loadingContainer {
  width: 100%;
  height: 100%;
  position: absolute;
  background: white;
  z-index: 2;

  .loadingBar {
    position: absolute;
    top: 50%;
    width: 50%;
    left: 25%;
    text-align: center;
  }
}
</style>
