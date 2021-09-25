<template>
  <div>
    <NuxtLink :to="`/posts/${post.id}`">
      <h2>{{ post.title }}</h2>
    </NuxtLink>
    <PostDetails :post="post" />
    <p>{{ post.excerpt }}</p>
    <Tags :tags="post.tags" />
  </div>
</template>

<script>
import Tags from "./Tags.vue";
import PostDetails from "./PostDetails.vue";

export default {
  props: ["post"],
  components: { Tags, PostDetails }
};
</script>

<style scoped>
p {
  margin: 1em 0;
}

h2 {
  margin-bottom: 0.5em;
}
</style>
