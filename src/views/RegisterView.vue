<template>
  <v-container class="registerContainer">
    <v-card>
      <v-card-title> Register </v-card-title>

      <v-card-text>
        <CreateUserView>
          <template #primaryButtonContent> Register </template>
        </CreateUserView>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import CreateUserView from "@/components/CreateUserView.vue";

export default {
  components: {
    CreateUserView,
  },
};
</script>

<style lang="scss" scoped>
.registerContainer {
  margin-top: 200px;
  max-width: 400px;
}
</style>
