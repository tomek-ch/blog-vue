<template>
  <div>
    <h2>{{ post.title }}</h2>
    <p>{{ post.excerpt }}</p>
  </div>
</template>

<script>
export default {
  props: ["post"]
};
</script>
