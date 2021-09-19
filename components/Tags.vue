<template>
  <div class="tags">
    <NuxtLink v-for="tag in tags" :key="tag" :to="`/tagged/${tag}`">
      {{ tag }}
    </NuxtLink>
  </div>
</template>

<script>
export default {
  props: ["tags"]
};
</script>

<style scoped>
.tags {
  display: flex;
  gap: 0.5em;
  flex-wrap: wrap;
}

.tags a {
  padding: 0.5em;
  border-radius: 5px;
  background-color: lightgray;
}
</style>
