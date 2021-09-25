<template>
  <div>
    <form @submit="handleSubmit" class="tag-form">
      <input class="input" v-model="input" placeholder="Add a tag" />
      <button
        class="btn"
        :disabled="!input || tags.includes(input) || tags.length === 5"
      >
        Add
      </button>
    </form>
    <div class="tag-list">
      <div v-for="tag in tags" :key="tag">
        <div class="tag">
          {{ tag }}
          <button @click="$emit('delete-tag', tag)" class="remove-btn">
            <Cross />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/composition-api";
import Cross from "@/components/icons/Cross";

export default {
  emits: ["add-tag", "delete-tag"],
  props: ["tags"],
  components: { Cross },
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

<style scoped>
.tag-list {
  display: flex;
  gap: 0.5em;
  align-items: center;
  flex-wrap: wrap;
}

.tag {
  padding: 0.5em;
  border-radius: var(--radius);
  background-color: var(--foreground);
  display: flex;
  align-items: center;
}

.remove-btn {
  color: inherit;
  margin-left: 0.1em;
  width: 1.5em;
  height: 1.5em;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.remove-btn:hover {
  background-color: var(--darker-foreground);
  transition: all 150ms;
}

.tag-form {
  display: flex;
  gap: 0.5em;
  margin-bottom: 0.5em;
}
</style>
