<template>
  <div>
    <v-container class="usersContainer">
      <h1>Users</h1>
      <v-btn color="primary" @click="createUserModal = !createUserModal">
        <v-icon>mdi-plus</v-icon>
        Create user
      </v-btn>
      <v-card>
        <v-data-table :headers="headers" :items="users" class="elevation-1">
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn @click="deleteUser(item.id)" icon color="danger">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>

            <v-btn @click="editUser(item)" icon>
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
    <v-dialog v-model="editUserModal" width="500">
      Edit User
    </v-dialog>

    <v-dialog v-model="createUserModal" width="500">
      <CreateUserView @close="createUserModal = false"/>
    </v-dialog>


  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CreateUserView from "./CreateUserView.vue";

export default {
  components: {
    CreateUserView,
  },

  data() {
    return {
      createUserModal: false,
      editUserModal: false
    };
  },

  computed: {
    ...mapGetters(["users"]),

    headers() {
      return [
        { text: "Picture", value: "picture" },
        { text: "Name", value: "name" },
        { text: "Email", value: "email" },
        { text: "Role", value: "role" },
        { text: "", value: "actions", align: "right" },
      ];
    },
  },

  methods: {
    ...mapActions(["getUsers"]),

    deleteUser(id) {
      console.log(id);
    },

    editUser(user) {
      console.log(user)
    }
  },

  created() {
    this.getUsers();
  },
};
</script>

<style scoped lang="scss">
.usersContainer {
  max-width: 1000px;
}
</style>
