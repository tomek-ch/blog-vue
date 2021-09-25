<template>
  <div>
    <form @submit="handleSubmit">
      <input v-model="input" placeholder="Add a tag" />
      <button class="btn" :disabled="!input || tags.includes(input)">
        Add
      </button>
    </form>
    <div v-for="tag in tags" :key="tag">
      <div>
        {{ tag }}
      </div>
      <button @click="$emit('delete-tag', tag)">x</button>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/composition-api";

export default {
  emits: ["add-tag", "delete-tag"],
  props: ["tags"],
  setup(_props, context) {
    const input = ref("");

    const handleSubmit = e => {
      e.preventDefault();
      context.emit("add-tag", input.value);
      input.value = "";
    };

    return { handleSubmit, input };
  }
};
</script>

<style></style>
