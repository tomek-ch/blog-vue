<template>
  <div v-if="comments.length">
    <Comment v-for="com in comments" :key="com.id" :comment="com" />
  </div>
</template>

<script>
import Comment from "./Comment.vue";

export default {
  props: ["comments"],
  components: { Comment }
};
</script>
