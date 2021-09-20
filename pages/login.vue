<template>
  <form @submit="handleSubmit">
    <label>
      Username:
      <input v-model="username" />
    </label>
    <label>
      Password:
      <input v-model="password" type="password" />
    </label>
    <button>Log in</button>
    <div>{{ error }}</div>
  </form>
</template>

<script>
import { ref } from "@nuxtjs/composition-api";
import { signIn } from "@/auth/store";

export default {
  setup() {
    const username = ref("");
    const password = ref("");
    const error = ref("");

    const handleSubmit = async e => {
      e.preventDefault();

      try {
        const res = await fetch(`${process.env.baseUrl}/log-in`, {
          method: "POST",
          body: JSON.stringify({
            username: username.value,
            password: password.value
          }),
          headers: { "Content-Type": "application/json" }
        });

        if (res.ok) {
          signIn(await res.json());
        } else if (res.status === 400) {
          error.value = (await res.json()).message;
        } else {
          throw new Error();
        }
      } catch {
        error.value = "There was a network error";
      }
    };

    return { username, password, error, handleSubmit };
  }
};
</script>

<style></style>
