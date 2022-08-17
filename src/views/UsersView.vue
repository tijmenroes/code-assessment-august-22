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
        </div>
      </div>

      <v-card>
        <v-card-title class="filterOptions">
          <div>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </div>

          <div>
            <v-select
              :items="roles"
              label="Outlined style"
              v-model="filteredRole"
              @change="roleSelected"
              outlined
              hide-details
              height="10"
            ></v-select>
          </div>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="items"
          :search="search"
          class="elevation-1"
        >
          <template v-slot:[`item.deleted_at`]="{ item }">
            <v-icon v-if="item.deleted_at" color="error">mdi-delete</v-icon>
            <v-icon v-else color="success">mdi-check</v-icon>
          </template>

          <template v-slot:[`item.actions`]="{ item }">
            <div v-if="item.id !== currentUser.id">
              <v-btn @click="editUser(item)" icon v-if="!item.deleted_at">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>

              <v-btn @click="restoreUser(item.id)" icon v-else>
                <v-icon>mdi-delete-off</v-icon>
              </v-btn>
            </div>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
    <v-dialog v-model="userModal" width="500">
      <CreateUserView
        @close="userModal = false"
        :user="selectedUser"
        :isDeleted="!!selectedUser.deleted_at"
      />
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
      search: "",
      userModal: false,
      selectedUser: {},
      showDeletedUsers: false,
      filteredRole: null
    };
  },

  computed: {
    ...mapGetters(["users", "currentUser", "isLoggedIn", "availableRoles"]),

    headers() {
      let headers = [
        { text: "Status", value: "deleted_at" },
        { text: "Picture", value: "picture" },
        { text: "Name", value: "name" },
        { text: "Role", value: "role" },
      ];

      if (this.isLoggedIn) {
        headers = [
          ...headers,
          { text: "Email", value: "email" },
          { text: "Phone number", value: "phone_number" },
        ];
      }
      headers.push({ text: "", value: "actions", align: "right" });
      return headers;
    },

    items() {
      let items = this.users
      if (!this.showDeletedUsers) {
        items = items.filter((item) => !item.deleted_at);
      }

      if (this.filteredRole) {
        items = items.filter((item) => item.role === this.filteredRole)
      }
      return items;
    },

    roles () {
      return ["all", ...this.availableRoles]
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

    roleSelected (role) {
      if (role === 'all') this.filteredRole = null
      else this.filteredRole = role
    }
  },

  created() {
    this.getUsers();
  },
};
</script>

<style scoped lang="scss">
.usersContainer {
  max-width: 1400px;
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

.filterOptions {
  display: flex;
  justify-content: space-between;

  & > * {
    width: 450px;
  }
}
</style>
