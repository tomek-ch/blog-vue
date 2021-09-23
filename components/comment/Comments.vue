<template>
  <div v-if="comments.length">
    <Comment
      v-for="com in comments"
      :key="com.id"
      :comment="com"
      :comments="comments"
      @delete-comment="$emit('delete-comment', com.id)"
      @edit-comment="$emit('edit-comment', $event)"
    />
  </div>
</template>

<script>
import Comment from "./Comment.vue";

export default {
  props: ["comments"],
  emits: ["delete-comment", "edit-comment"],
  components: { Comment }
};
</script>
