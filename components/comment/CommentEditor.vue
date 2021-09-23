<template>
  <div>
    <textarea v-model="input" autofocus="autofocus" />
    <button @click="save">Save</button>
    <button @click="cancel">Cancel</button>
  </div>
</template>

<script>
import { ref } from "@vue/composition-api";
import { token } from "@/auth/store";

export default {
  props: ["text", "id"],
  emits: ["toggle-editable", "edit-comment"],
  setup(props, context) {
    const input = ref(props.text);

    const cancel = () => {
      input.value = props.text;
      context.emit("toggle-editable");
    };

    const save = async () => {
      const res = await fetch(`${process.env.baseUrl}/comments/${props.id}`, {
        method: "put",
        body: JSON.stringify({ text: input.value }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`
        }
      });

      if (res.ok) {
        context.emit("edit-comment", { id: props.id, text: input.value });
        context.emit("toggle-editable");
      }
    };

    return { input, cancel, save };
  }
};
</script>

<style></style>
