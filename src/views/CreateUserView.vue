<template>
  <v-container>
    <h1>Create user</h1>
    <v-card class="formContainer">
      <v-alert type="error" v-if="error"> Fill all values</v-alert>
      <v-text-field
        label="Name"
        :rules="rules"
        hide-details="auto"
        v-model="formData.name"
      />
      <v-text-field
        label="email"
        :rules="rules"
        hide-details="auto"
        v-model="formData.email"
      />
      <v-text-field
        label="password"
        :rules="rules"
        type="password"
        hide-details="auto"
        v-model="formData.password"
      />
      <v-file-input
        label="picture"
        hide-details="auto"
      />
      <v-select
        label="role"
        :items="roles"
        hide-details="auto"
        v-model="formData.role"
      />
      <v-btn color="primary" @click="checkValues">
        <v-icon>mdi-plus</v-icon>
        Create user
      </v-btn>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  // TODO: Make this component?
  data() {
    return {
      formData: {
        name: null,
        email: "",
        password: "",
        picture: "abcdefg", // Didn't apply v-model because of time reasons, just a string for now.
        role: "developer",
      },

      error: false,
      rules: [
        (value) => !!value || "Required.",
        (value) => (value && value.length >= 3) || "Min 3 characters",
      ],
      roles: ["developer", "designer", "intern", "boss"],
    };
  },

  methods: {

    ...mapActions(['createUser']),

    /**
     * Simple check to see if all values are filled, if they are send create user request
     */
    checkValues() {
      if (Object.values(this.formData).every((item) => item)) {
        this.createUser(this.formData)
      } else {
        this.error = true;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.formContainer {
  & > * {
    margin-bottom: 5px;
  }
}
</style>
