<template>
  <Options toggleText="..." :options="options" />
</template>

<script>
import Options from "./Options";

export default {
  components: { Options },
  setup() {
    return {
      options: [
        { text: "Edit", to: `/posts/${_id}/edit` },
        {
          text: "Delete",
          onClick: deletePost
        }
      ]
    };
  }
};
</script>

<style></style>
