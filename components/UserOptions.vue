<template>
  <Options :toggleText="username" :options="options" />
</template>

<script>
import { user, signOut } from "@/auth/store";
import Options from "./Options";

export default {
  name: "UserOptions",
  components: { Options },
  setup() {
    const { username } = user.value;
    return {
      username,
      options: [
        { text: "New post", to: "/new" },
        { text: "View profile", to: `/users/${username}` },
        {
          text: "Sign out",
          btn: true,
          onClick: signOut
        }
      ]
    };
  }
};
</script>

<style></style>
