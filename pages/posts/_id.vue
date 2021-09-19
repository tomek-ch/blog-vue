<template>
  <div>
    <div v-if="$fetchState.error">
      Error
    </div>
    <div v-else-if="post">
      <h1>{{ post.title }}</h1>
      <div v-for="(p, idx) of post.paragraphs" :key="`p${idx}`">
        <h2>{{ p.heading }}</h2>
        <p>{{ p.body }}</p>
      </div>
      <Tags :tags="post.tags" />
    </div>
  </div>
</template>

<script>
import { computed, useRoute, ref, useFetch } from "@nuxtjs/composition-api";
import Tags from "@/components/Tags.vue";

export default {
  components: { Tags },
  setup() {
    const route = useRoute();
    const id = computed(() => route.value.params.id);
    const post = ref(null);

    useFetch(async () => {
      const data = await (
        await fetch(`${process.env.baseUrl}/posts/${id.value}`)
      ).json();

      post.value = data.post;
    });

    return { post };
  }
};
</script>
