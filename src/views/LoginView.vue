<template>
  <v-container class="loginContainer">
    <v-card>
      <v-card-title> Login </v-card-title>

      <v-card-text>
        <v-text-field
          label="Name"
          :rules="inputRules"
          hide-details="auto"
          v-model="formData.name"
        />

        <v-text-field
          label="password"
          :rules="inputRules"
          type="password"
          hide-details="auto"
          v-model="formData.password"
        />
        <div class="forgotPassword">forgot password?</div>

        <div class="actions">
          <v-btn
            class="loginButton"
            color="primary"
            @click="loginUser(formData)"
            >Login</v-btn
          >
          <span> or </span>
          <v-btn
            class="loginButton"
            color="dark"
            @click="$router.push('/register')"
            >Register</v-btn
          >
          <span> or </span>
          <v-btn
            class="loginButton"
            color="dark"
            @click="$router.push('/users')"
            >Continue as guest</v-btn
          >
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      formData: {
        name: "",
        password: "",
      },
    };
  },

  computed: {
    ...mapGetters(["inputRules"]),
  },

  methods: {
    ...mapActions(["loginUser"]),
  },
};
</script>

<style lang="scss" scoped>
.loginContainer {
  margin-top: 200px;
  max-width: 400px;
}

.loginButton {
  width: 100%;
}

.forgotPassword {
  padding-top: 10px;
  text-decoration: underline;
  cursor: pointer;
}
.forgotPassword:hover {
  color: blue;
}

.actions {
  margin-top: 25px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
</style>
