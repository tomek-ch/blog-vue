<template>
  <form @submit="handleSubmit">
    <input placeholder="title" v-model="title" autofocus="autofocus" />
    <textarea v-model="body" />
    <button>Create post</button>
    <div>{{ error }}</div>
  </form>
</template>

<script>
import { ref, useRouter } from "@nuxtjs/composition-api";
import { token } from "@/auth/store";
import limitLength from "@/utils/limitLength";
import useProtectedRoute from "@/composables/useProtectedRoute";

export default {
  setup() {
    const title = ref("");
    const body = ref("");
    const error = ref("");
    const router = useRouter();

    const handleSubmit = async e => {
      e.preventDefault();

      const post = {
        title: title.value,
        paragraphs: [{ body: body.value }],
        excerpt: limitLength(body.value),
        isPublished: true,
        tags: []
      };

      try {
        const res = await fetch(`${process.env.baseUrl}/posts`, {
          method: "post",
          body: JSON.stringify(post),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.value}`
          }
        });
        const data = await res.json();

        if (res.ok) {
          const { _id } = data;
          router.push(`/posts/${_id}`);
        } else {
          error.value = data[0];
        }
      } catch (e) {
        console.log(e);
        error.value = "Error trying to submit";
      }
    };

    useProtectedRoute();
    return {
      handleSubmit,
      title,
      body,
      error
    };
  }
};
</script>

<style></style>
