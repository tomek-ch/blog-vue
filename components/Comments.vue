<template>
  <div v-if="comments.length">
    <h3>Comments:</h3>
    <div v-for="com in comments" :key="com.id">
      {{ com.text }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["comments"]
};
</script>
