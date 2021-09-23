<template>
  <div class="comment">
    <div class="options-section">
      <div class="details">
        {{ comment.author.firstName }} {{ comment.author.lastName }} •
        {{ comment.time }}
      </div>
      <CommentOptions
        v-if="comment.author._id === user._id"
        :isEditable="isEditable"
        :id="comment._id"
        :handleDelete="handleDelete"
        @delete-comment="$emit('delete-comment')"
      />
    </div>
    <div>{{ comment.text }}</div>
  </div>
</template>

<script>
import { ref } from "@vue/composition-api";
import CommentOptions from "./CommentOptions";
import { user } from "@/auth/store";

export default {
  props: ["comment", "comments"],
  components: { CommentOptions },
  emits: ["delete-comment"],
  setup(props) {
    const isEditable = ref(false);

    const handleDelete = () =>
      (props.comments = props.comments.filter(
        com => com._id !== props.comment._id
      ));

    return { isEditable, handleDelete, user };
  }
};
</script>

<style>
.comment {
  margin: 2em 0;
}
</style>
