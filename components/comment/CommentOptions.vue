<template>
  <Options toggleText="..." :options="options" />
</template>

<script>
import Options from "../Options";
import { token } from "@/auth/store";

export default {
  components: { Options },
  props: ["id", "handleDelete", "handleDelete"],
  emits: ["delete-comment"],
  setup(props, context) {
    const deleteComment = async () => {
      const res = await fetch(`${process.env.baseUrl}/comments/${props.id}`, {
        method: "delete",
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      });

      if (res.ok) {
        context.emit("delete-comment");
      }
    };

    const toggleEditable = () => (props.isEditable = !props.isEditable);

    return {
      options: [
        { text: "Edit", onClick: toggleEditable },
        {
          text: "Delete",
          onClick: deleteComment
        }
      ]
    };
  }
};
</script>

<style></style>
