<template>
  <form @submit="handleSubmit">
    <label>
      Username:
      <input v-model="username" autofocus="autofocus" />
    </label>
    <label>
      First name:
      <input v-model="firstName" />
    </label>
    <label>
      Last name:
      <input v-model="lastName" />
    </label>
    <label>
      Password:
      <input v-model="password" type="password" />
    </label>
    <button
      class="btn-primary"
      :disabled="!username || !password || !firstName"
    >
      Register
    </button>
    <ul>
      <li v-for="error in errors" :key="error">
        {{ error }}
      </li>
    </ul>
  </form>
</template>

<script>
import { ref } from "@nuxtjs/composition-api";
import { signIn } from "@/auth/store";
import useGuestRoute from "@/composables/useGuestRoute";

export default {
  setup() {
    const username = ref("");
    const password = ref("");
    const firstName = ref("");
    const lastName = ref("");
    const errors = ref([]);

    const handleSubmit = async e => {
      e.preventDefault();

      try {
        const res = await fetch(`${process.env.baseUrl}/users`, {
          method: "POST",
          body: JSON.stringify({
            username: username.value,
            firstName: firstName.value,
            lastName: lastName.value,
            password: password.value
          }),
          headers: { "Content-Type": "application/json" }
        });

        if (res.ok) {
          signIn(await res.json());
        } else if (res.status === 400) {
          errors.value = await res.json();
        } else {
          throw new Error();
        }
      } catch {
        errors.value = ["There was a network error"];
      }
    };

    useGuestRoute();
    return { username, password, firstName, lastName, errors, handleSubmit };
  }
};
</script>

<style></style>
