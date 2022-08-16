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
            <v-btn @click="editUser(item)" icon color="danger">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>

            <v-btn @click="deleteUser(item)" icon>
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
    <v-dialog v-model="userModal" width="500">
      <CreateUserView @close="closeUserModal" :user="selectedUser" />
    </v-dialog>

    <v-dialog v-model="createUserModal" width="500">
      <CreateUserView @close="createUserModal = false" />
    </v-dialog>


  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CreateUserView from "@/components/CreateUserView.vue";

export default {
  components: {
    CreateUserView,
  },

  data() {
    return {
      createUserModal: false,
      editUserModal: false,
      userModal: false,
      selectedUser: {}
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
      this.selectedUser = user
      this.userModal = true
    },

    closeUserModal () {
      this.selectedUser = {}
      this.userModal = false
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
