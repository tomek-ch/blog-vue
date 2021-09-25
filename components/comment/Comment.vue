<template>
  <div class="comment">
    <div class="options-section">
      <div class="details">
        <NuxtLink :to="`/users/${comment.author.username}`">
          {{ comment.author.firstName }} {{ comment.author.lastName }}
        </NuxtLink>
        •
        {{ comment.time }}
      </div>
      <CommentOptions
        v-if="user && comment.author._id === user._id"
        :id="comment._id"
        :handleDelete="handleDelete"
        @delete-comment="$emit('delete-comment')"
        @toggle-editable="toggleEditable"
      />
    </div>
    <CommentEditor
      v-if="isEditable"
      @toggle-editable="toggleEditable"
      @edit-comment="$emit('edit-comment', $event)"
      :text="comment.text"
      :id="comment._id"
    />
    <div v-else>{{ comment.text }}</div>
  </div>
</template>

<script>
import { ref } from "@vue/composition-api";
import CommentOptions from "./CommentOptions";
import CommentEditor from "./CommentEditor";
import { user } from "@/auth/store";

export default {
  props: ["comment", "comments"],
  components: { CommentOptions, CommentEditor },
  emits: ["delete-comment", "edit-comment"],
  setup(props) {
    const isEditable = ref(false);
    const toggleEditable = () => {
      console.log("toggle");
      isEditable.value = !isEditable.value;
    };

    const handleDelete = () =>
      (props.comments = props.comments.filter(
        com => com._id !== props.comment._id
      ));

    return { isEditable, handleDelete, user, toggleEditable };
  }
};
</script>

<style>
.comment {
  margin: 2em 0;
}
</style>
