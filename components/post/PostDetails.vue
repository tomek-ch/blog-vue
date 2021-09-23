<template>
  <div class="details">
    {{ post.readTime === 0 ? "Less than a min" : `${post.readTime} min read` }}
    <span v-if="post.author.username">
      •
      <NuxtLink :to="`/users/${post.author.username}`"
        >{{ post.author.firstName }} {{ post.author.lastName }}</NuxtLink
      >
    </span>
    • {{ post.time }}
  </div>
</template>

<script>
export default {
  props: ["post"]
};
</script>
