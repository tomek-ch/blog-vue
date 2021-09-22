<template>
  <div>
    <h1>Posts tagged {{ tag }}</h1>
    <div v-if="$fetchState.error">There was a network error</div>
    <PostThumbnail v-for="post in posts" :key="post.id" :post="post" />
  </div>
</template>

<script>
import { ref, useFetch, computed, useRoute } from "@nuxtjs/composition-api";
import PostThumbnail from "@/components/post/PostThumbnail";

export default {
  components: { PostThumbnail },
  setup() {
    const posts = ref([]);
    const route = useRoute();
    const tag = computed(() => route.value.params.tag);

    useFetch(async () => {
      posts.value = await (
        await fetch(`${process.env.baseUrl}/posts?tags=${tag.value}`)
      ).json();
    });

    return { posts, tag };
  }
};
</script>
