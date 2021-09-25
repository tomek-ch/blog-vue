<template>
  <header>
    <NuxtLink to="/">
      <h1>
        Blogg
        <Pen />
      </h1>
    </NuxtLink>
    <UserOptions v-if="user && user._id" />
    <div v-else>
      <NuxtLink to="/login" class="btn-borderless">
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
import Pen from "@/components/icons/Pen";

export default {
  name: "Header",
  components: { UserOptions, Pen },
  setup() {
    return { user, signOut };
  }
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h1 {
  font-size: 1.5em;
}

.btn-borderless {
  margin-right: 0.3em;
}
</style>
