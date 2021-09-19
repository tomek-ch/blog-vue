<template>
  <div class="tags">
    <div v-for="tag in tags" :key="tag">
      {{ tag }}
    </div>
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

.tags div {
  padding: 0.5em;
  border-radius: 5px;
  background-color: lightgray;
}
</style>
