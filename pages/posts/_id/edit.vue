<template>
  <PostEditor method="PUT" label="Update" :id="id" :post="post" />
</template>

<script>
import PostEditor from "@/components/post/PostEditor";
import { useRoute, computed, useFetch, ref } from "@nuxtjs/composition-api";

export default {
  components: { PostEditor },
  setup() {
    const route = useRoute();
    const id = computed(() => route.value.params.id);

    const title = ref("");
    const body = ref("");

    useFetch(async () => {
      const data = await (
        await fetch(`${process.env.baseUrl}/posts/${id.value}`)
      ).json();

      title.value = data.post.title;
      body.value = data.post.paragraphs?.[0].body;
    });

    return {
      id: id.value,
      post: {
        title,
        body
      }
    };
  }
};
</script>

<style></style>
