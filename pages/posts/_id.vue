<template>
  <div>
    <div v-if="$fetchState.error">
      Error
    </div>
    <div v-else-if="post">
      <h1>{{ post.title }}</h1>
      <div class="details">
        <PostDetails :post="post" />
        <PostOptions :id="post._id" :handleDelete="handleDelete" />
      </div>
      <div v-for="(p, idx) of post.paragraphs" :key="`p${idx}`">
        <h2>{{ p.heading }}</h2>
        <p>{{ p.body }}</p>
      </div>
      <Tags :tags="post.tags" />
      <Comments :comments="comments" />
    </div>
  </div>
</template>

<script>
import {
  computed,
  useRoute,
  ref,
  useFetch,
  useRouter
} from "@nuxtjs/composition-api";
import Tags from "@/components/Tags";
import PostDetails from "@/components/PostDetails";
import PostOptions from "@/components/PostOptions";

export default {
  components: { Tags, PostDetails, PostOptions },
  setup() {
    const route = useRoute();
    const id = computed(() => route.value.params.id);

    const post = ref(null);
    const comments = ref([]);

    const router = useRouter();
    const handleDelete = () => router.replace("/");

    useFetch(async () => {
      const data = await (
        await fetch(`${process.env.baseUrl}/posts/${id.value}`)
      ).json();

      post.value = data.post;
      comments.value = data.comments;
    });

    return { post, comments, handleDelete };
  }
};
</script>

<style scoped>
.details {
  display: flex;
  justify-content: space-between;
}
</style>
