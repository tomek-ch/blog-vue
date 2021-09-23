<template>
  <div v-if="comments.length">
    <Comment
      v-for="com in comments"
      :key="com.id"
      :comment="com"
      :comments="comments"
      @delete-comment="$emit('delete-comment', com.id)"
    />
  </div>
</template>

<script>
import Comment from "./Comment.vue";

export default {
  props: ["comments"],
  emits: ["delete-comment"],
  components: { Comment }
};
</script>
