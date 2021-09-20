<template>
  <div>
    <button @click="toggle" @blur="hide">{{ toggleText }}</button>
    <div v-if="open">
      <div v-for="option in options" :key="option.text">
        <button
          v-if="option.onClick"
          @click="handleBtnClick(option.onClick)"
          data-option="true"
          @blur="toggle"
        >
          {{ option.text }}
        </button>
        <NuxtLink v-else :to="option.to" data-option="true" @blur="toggle">
          <a @click="toggle">
            {{ option.text }}
          </a>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@nuxtjs/composition-api";

export default {
  name: "Options",
  props: ["toggleText", "options"],
  setup() {
    const open = ref(false);
    const toggle = () => (open.value = !open.value);

    const hide = e => {
      if (!e.relatedTarget?.dataset.option) {
        open.value = false;
      }
    };

    const handleBtnClick = cb => {
      cb();
      toggle();
    };

    return {
      open,
      toggle,
      hide,
      handleBtnClick
    };
  }
};
</script>
