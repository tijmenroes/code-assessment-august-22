<template>
  <v-container class="createUserContainer">
    <div class="formContainer">
      <v-text-field
        label="Name"
        :rules="inputRules"
        hide-details="auto"
        v-model="formData.name"
      />
      <v-text-field
        label="email"
        :rules="inputRules"
        hide-details="auto"
        v-model="formData.email"
      />
      <v-text-field
        label="password"
        :rules="inputRules"
        type="password"
        hide-details="auto"
        v-if="!isEditingUser"
        v-model="formData.password"
      />
      <v-file-input label="picture" hide-details="auto" />
      <v-select
        label="role"
        :items="availableRoles"
        hide-details="auto"
        v-model="formData.role"
      />

      <div v-if="!isEditingUser">
        <v-btn color="primary" @click="checkValues">
          <slot name="primaryButtonContent">
            <v-icon>mdi-plus</v-icon>
            Create user
          </slot>
        </v-btn>
      </div>

      <div class="actions" v-else>
        <v-btn color="error" @click="handleRemove(user)">
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
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    user: {
      type: Object,
      required: false,
    },

    isDeleted: {
      type: Boolean,
      default: false,
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
    };
  },

  computed: {
    ...mapGetters(["availableRoles", "inputRules"]),

    isEditingUser() {
      return !!this.user && Object.keys(this.user).length > 0;
    },
  },

  methods: {
    ...mapActions(["updateUser", "deleteUser", "registerUser"]),

    /**
     * Simple check to see if all values are filled, if they are send create user request
     */
    checkValues() {
      if (this.isEditingUser) {
        this.updateUser({ data: this.formData, id: this.user.id });
      } else {
        this.registerUser(this.formData);
      }
      this.$emit("close");
    },

    handleRemove(user) {
      this.deleteUser(user);
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
