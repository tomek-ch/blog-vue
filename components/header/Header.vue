<template>
  <header>
    <NuxtLink to="/">
      <h1>
        Blogg
      </h1>
    </NuxtLink>
    <UserOptions v-if="user && user._id" />
    <div v-else>
      <NuxtLink to="/login">
        Log in
      </NuxtLink>
      <NuxtLink to="/register" class="btn-primary">
        Register
      </NuxtLink>
    </div>
  </header>
</template>

<script>
import { user, signOut } from "@/auth/store";
import UserOptions from "./UserOptions";

export default {
  name: "Header",
  components: { UserOptions },
  setup() {
    return { user, signOut };
  }
};
</script>

<style>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
