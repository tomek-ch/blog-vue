<template>
  <div class="options-container">
    <button
      @click="toggle"
      @blur="hide"
      class="toggle"
      :class="{ 'text-toggle': textToggle, 'open-toggle-text': open }"
    >
      <Dots v-if="icon" />
      {{ toggleText }}
      <ArrowDown v-if="textToggle" :flipped="open" />
    </button>
    <div v-if="open" class="options">
      <div v-for="option in options" :key="option.text" class="option">
        <button
          v-if="option.onClick"
          data-option="true"
          @blur="hide"
          @click="
            hide();
            option.onClick();
          "
        >
          {{ option.text }}
        </button>
        <NuxtLink
          v-else
          :to="option.to"
          data-option="true"
          @blur.native="hide"
          @click.native="hide"
        >
          {{ option.text }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@nuxtjs/composition-api";
import ArrowDown from "./icons/ArrowDown";
import Dots from "./icons/Dots";

export default {
  name: "Options",
  props: ["toggleText", "options", "textToggle", "icon"],
  components: { ArrowDown, Dots },
  setup() {
    const open = ref(false);
    const toggle = () => {
      open.value = !open.value;
    };

    const hide = e => {
      if (!e?.relatedTarget?.dataset.option) {
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

<style scoped>
.options {
  display: flex;
  flex-direction: column;
  padding: 0.5em 0;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  width: fit-content;
  position: absolute;
  right: 0em;
  white-space: nowrap;
  background-color: white;
  overflow: hidden;
  z-index: 1;
  animation: popUp 150ms;
}

@keyframes popUp {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.option {
  cursor: pointer;
  text-align: left;
  color: black;
  padding: 0.5em 1em;
}

.option:hover {
  background-color: dodgerblue;
  color: white;
}

.toggle {
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2em;
  height: 2em;
}

.text-toggle {
  width: unset;
  height: unset;
  padding: 0.5em 1em;
}

.toggle:hover {
  background-color: #efefef;
  transition: all 150ms;
}

.options-container {
  position: relative;
}

.open-toggle-text,
.open-toggle-text:hover {
  background-color: #ddd;
}
</style>
