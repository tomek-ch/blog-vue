<template>
  <div>
    <NuxtLink :to="`posts/${post.id}`">
      <h2>{{ post.title }}</h2>
    </NuxtLink>
    <p>{{ post.excerpt }}</p>
  </div>
</template>

<script>
export default {
  props: ["post"]
};
</script>
