<template>
  <PostEditor
    v-if="!$fetchState.pending"
    method="PUT"
    label="Update"
    :post="post"
  />
</template>

<script>
import PostEditor from "@/components/post/PostEditor";
import { useRoute, computed, useFetch, ref } from "@nuxtjs/composition-api";
import useProtectedRoute from "@/composables/useProtectedRoute";

export default {
  components: { PostEditor },
  setup() {
    const route = useRoute();
    const id = computed(() => route.value.params.id);
    const post = ref(null);

    const { fetchState } = useFetch(async () => {
      const data = await (
        await fetch(`${process.env.baseUrl}/posts/${id.value}`)
      ).json();
      post.value = data.post;
    });

    useProtectedRoute();
    return {
      post,
      fetchState
    };
  }
};
</script>

<style></style>
