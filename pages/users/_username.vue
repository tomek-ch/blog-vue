<template>
  <div>
    <div v-if="$fetchState.error">There was a network error</div>
    <div v-else-if="user">
      <h2>{{ user.firstName }}</h2>
      <p>{{ user.description }}</p>
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
