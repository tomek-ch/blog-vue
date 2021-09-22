<template>
  <Options toggleText="..." :options="options" />
</template>

<script>
import Options from "../Options";
import { token } from "@/auth/store";

export default {
  components: { Options },
  props: ["id", "handleDelete"],
  setup(props) {
    const deletePost = async () => {
      await fetch(`${process.env.baseUrl}/posts/${props.id}`, {
        method: "delete",
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      });
      props.handleDelete();
    };

    return {
      options: [
        { text: "Edit", to: `/posts/${props.id}/edit` },
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
