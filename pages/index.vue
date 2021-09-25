<template>
  <div class="posts">
    <div v-if="$fetchState.error">There was a network error</div>
    <PostThumbnail v-for="post in posts" :key="post.id" :post="post" />
  </div>
</template>

<script>
import { ref, useFetch } from "@nuxtjs/composition-api";
import PostThumbnail from "@/components/post/PostThumbnail";

export default {
  components: { PostThumbnail },
  setup() {
    const posts = ref([]);

    useFetch(async () => {
      posts.value = await (await fetch(`${process.env.baseUrl}/posts`)).json();
    });

    return { posts };
  }
};
</script>
