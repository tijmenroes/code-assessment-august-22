<template>
  <v-container class="createUserContainer">
    <h1>{{ isEditingUser ? "Create" : "Edit" }} user</h1>
    <div class="formContainer">
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
        v-if="!isEditingUser"
        v-model="formData.password"
      />
      <v-file-input label="picture" hide-details="auto" />
      <v-select
        label="role"
        :items="roles"
        hide-details="auto"
        v-model="formData.role"
      />
      <v-btn color="primary" @click="checkValues" v-if="!isEditingUser">
        <v-icon>mdi-plus</v-icon>
        Create user
      </v-btn>

      <div class="actions" v-else>
        <v-btn color="error" @click="handleRemove(user.id)">
          <v-icon>mdi-delete</v-icon>
          Delete user
        </v-btn>

        <v-btn color="primary" @click="checkValues">
          <v-icon>mdi-pencil</v-icon>
          Update user
        </v-btn>
      </div>
    </div>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    user: {
      type: Object,
      required: false,
    },
  },
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

  computed: {
    isEditingUser() {
      return !!this.user;
    },
  },

  methods: {
    ...mapActions(["createUser", "updateUser", "deleteUser"]),

    /**
     * Simple check to see if all values are filled, if they are send create user request
     */
    checkValues() {
      if (Object.values(this.formData).every((item) => item)) {
        if (this.isEditingUser) {
          this.updateUser(this.formData);
        } else {
          this.createUser(this.formData);
        }
        this.$emit("close");
      } else {
        this.error = true;
      }
    },

    handleRemove(id) {
      this.deleteUser(id);
      this.$emit("close");
    },
  },
  created() {
    if (this.isEditingUser) {
      const whitelist = ["id", "name", "email", "role", "picture"];
      const user = {};
      Object.keys(this.user).forEach((key) => {
        if (whitelist.includes(key)) user[key] = this.user[key];
      });
      this.formData = user;
    }
  },
};
</script>

<style scoped lang="scss">
.formContainer {
  display: flex;
  flex-direction: column;
  gap: 8px;

  .v-btn {
    margin-top: 30px;
  }
}

.createUserContainer {
  background: white;
}

.actions {
  display: flex;
  gap: 5px;
  justify-content: flex-end;
}
</style>
