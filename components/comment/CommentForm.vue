<template>
  <div>
    <div v-if="!user || !user._id">
      <NuxtLink to="/register">Sign up</NuxtLink> to comment
    </div>
    <form v-else @submit="handleSubmit">
      <input v-model="input" placeholder="Write a comment" />
      <button>Add</button>
      <div>{{ error }}</div>
    </form>
  </div>
</template>

<script>
import { ref } from "@vue/composition-api";
import { token } from "@/auth/store";

export default {
  props: ["post", "comments", "user"],
  setup(props) {
    const input = ref("");
    const error = ref("");

    const handleSubmit = async e => {
      e.preventDefault();

      try {
        const comment = {
          text: input.value,
          post: props.post
        };

        const res = await fetch(`${process.env.baseUrl}/comments`, {
          method: "post",
          body: JSON.stringify(comment),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.value}`
          }
        });

        if (res.ok) {
          props.comments.push(await res.json());
        } else if (res.status === 400) {
          error.value = (await res.json())[0];
        } else {
          throw new Error();
        }
      } catch (e) {
        console.log(e);
        error.value = "Error trying to submit";
      }
    };

    return { error, handleSubmit, input };
  }
};
</script>

<style></style>
