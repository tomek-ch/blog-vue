<template>
  <div>
    <NuxtLink :to="`/posts/${post.id}`">
      <h2>{{ post.title }}</h2>
    </NuxtLink>
    <p>{{ post.excerpt }}</p>
    <Tags :tags="post.tags" />
  </div>
</template>

<script>
import Tags from "./Tags.vue";

export default {
  props: ["post"],
  components: { Tags }
};
</script>
