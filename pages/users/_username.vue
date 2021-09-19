<template>
  <div>
    <div v-if="$fetchState.error">There was a network error</div>
    <div v-else-if="user">
      <h2>{{ user.firstName }}</h2>
      <p>{{ user.description }}</p>
      <PostThumbnail v-for="post in user.posts" :key="post.id" :post="post" />
    </div>
  </div>
</template>

<script>
import { ref, useFetch, computed, useRoute } from "@nuxtjs/composition-api";
import PostThumbnail from "@/components/PostThumbnail";

export default {
  components: { PostThumbnail },
  setup() {
    const user = ref(null);
    const route = useRoute();
    const username = computed(() => route.value.params.username);

    useFetch(async () => {
      user.value = await (
        await fetch(`${process.env.baseUrl}/users/${username.value}`)
      ).json();
    });

    return { user };
  }
};
</script>
