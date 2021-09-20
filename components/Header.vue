<template>
  <header>
    <NuxtLink to="/">
      <h1>
        Blogg
      </h1>
    </NuxtLink>
    <div v-if="user">
      {{ user.username }}
      <button @click="signOut">Sign out</button>
    </div>
    <div v-else>
      <NuxtLink to="/login">
        Log in
      </NuxtLink>
      <NuxtLink to="/register">
        Register
      </NuxtLink>
    </div>
  </header>
</template>

<script>
import { user, signOut } from "@/auth/store";

export default {
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
