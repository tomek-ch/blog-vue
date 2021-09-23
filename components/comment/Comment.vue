<template>
  <div class="comment">
    <div class="details">
      {{ comment.author.firstName }} {{ comment.author.lastName }} •
      {{ comment.time }}
    </div>
    <div>{{ comment.text }}</div>
  </div>
</template>

<script>
export default {
  props: ["comment"]
};
</script>

<style>
.comment {
  margin: 2em 0;
}
</style>
