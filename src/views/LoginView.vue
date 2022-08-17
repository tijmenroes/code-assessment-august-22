<template>
  <v-container class="loginContainer">
    <v-card>
      <v-card-title> Login </v-card-title>

      <v-card-text>
        <v-text-field
          label="Name"
          :rules="rules"
          hide-details="auto"
          v-model="formData.name"
        />

        <v-text-field
          label="password"
          :rules="rules"
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
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      formData: {
        name: "",
        password: "",
      },
      rules: [
        (value) => !!value || "Required.",
        (value) => (value && value.length >= 3) || "Min 3 characters",
      ],
    };
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
