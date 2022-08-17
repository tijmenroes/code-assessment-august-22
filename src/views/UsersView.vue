<template>
  <div>
    <v-container class="usersContainer">
      <div class="header">
        <h1>Users</h1>
        <div>
          <v-switch
            class="switch"
            v-model="showDeletedUsers"
            label="Show deleted users"
          ></v-switch>
          <v-btn color="primary" @click="userModal = !userModal">
            <v-icon>mdi-plus</v-icon>
            Create user
          </v-btn>
        </div>
      </div>

      <v-card>
        <v-data-table :headers="headers" :items="items" class="elevation-1">
          <template v-slot:[`item.deleted_at`]="{ item }">
              <v-icon v-if="item.deleted_at" color="error">mdi-delete</v-icon>
          </template>
          
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn @click="editUser(item)" icon v-if="!item.deleted_at">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>

            <v-btn @click="restoreUser(item.id)" icon v-else>
              <v-icon>mdi-delete-off</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
    <v-dialog v-model="userModal" width="500">
      <CreateUserView @close="userModal = false" :user="selectedUser" :isDeleted="!!selectedUser.deleted_at" />
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
      userModal: false,
      selectedUser: {},
      showDeletedUsers: false,
    };
  },

  computed: {
    ...mapGetters(["users"]),

    headers() {
      return [
        { text: "Status", value: "deleted_at" },
        { text: "Picture", value: "picture" },
        { text: "Name", value: "name" },
        { text: "Email", value: "email" },
        { text: "Role", value: "role" },
        { text: "", value: "actions", align: "right" },
      ];
    },

    items () {
      if (!this.showDeletedUsers) return this.users.filter(item => !item.deleted_at)
      return this.users
    }
  },

  methods: {
    ...mapActions(["getUsers", "restoreUser"]),

    editUser(user) {
      this.selectedUser = user;
      this.userModal = true;
    },

    closeUserModal() {
      this.selectedUser = {};
      this.userModal = false;
    },
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

.header {
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;

  div.switch {
    display: inline-block;
    margin-right: 20px;
  }
}
</style>
