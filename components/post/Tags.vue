<template>
  <div class="tags">
    <NuxtLink v-for="tag in tags" :key="tag" :to="`/tagged/${tag}`" class="tag">
      {{ tag }}
    </NuxtLink>
  </div>
</template>

<script>
export default {
  props: ["tags"]
};
</script>
