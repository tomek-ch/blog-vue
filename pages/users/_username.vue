<template>
  <div>
    <div v-if="$fetchState.error">There was a network error</div>
    <div v-else-if="user">
      <h1>{{ user.firstName }}</h1>
      <h2 class="details username">{{ user.username }}</h2>
      <p>{{ user.description }}</p>
      <h2 class="posts-label">Latest posts:</h2>
      <div class="posts">
        <PostThumbnail v-for="post in posts" :key="post.id" :post="post" />
      </div>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import { ref, useFetch, computed, useRoute } from "@nuxtjs/composition-api";
import PostThumbnail from "@/components/post/PostThumbnail";

export default {
  components: { PostThumbnail },
  setup() {
    const user = ref(null);
    const posts = ref([]);

    const route = useRoute();
    const username = computed(() => route.value.params.username);

    useFetch(async () => {
      const data = await (
        await fetch(`${process.env.baseUrl}/users/${username.value}`)
      ).json();

      user.value = data.user;
      posts.value = data.posts;
    });

    return { user, posts };
  }
};
</script>

<style scoped>
h1 {
  margin-top: 1em;
}

.username {
  margin: 0.5em 0;
}

.posts-label {
  margin-top: 2em;
}
</style>
