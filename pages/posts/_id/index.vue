<template>
  <div>
    <div v-if="$fetchState.error">
      Error
    </div>
    <div v-else-if="post" class="post">
      <h1>{{ post.title }}</h1>
      <div class="options-section">
        <PostDetails :post="post" />
        <PostOptions
          v-if="user && post.author._id === user._id"
          :id="post._id"
          :handleDelete="handleDelete"
        />
      </div>
      <div v-for="(p, idx) of post.paragraphs" :key="`p${idx}`">
        <h2>{{ p.heading }}</h2>
        <p>{{ p.body }}</p>
      </div>
      <Tags :tags="post.tags" />
      <CommentForm :comments="comments" :post="post._id" :user="user" />
      <Comments
        @delete-comment="deleteComment"
        @edit-comment="editComment"
        :comments="comments"
      />
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
import Tags from "@/components/post/Tags";
import PostDetails from "@/components/post/PostDetails";
import PostOptions from "@/components/post/PostOptions";
import Comments from "@/components/comment/Comments";
import { user } from "@/auth/store";

export default {
  components: { Tags, PostDetails, PostOptions, Comments },
  setup() {
    const route = useRoute();
    const id = computed(() => route.value.params.id);

    const post = ref(null);
    const comments = ref([]);

    const router = useRouter();
    const handleDelete = () => router.replace("/");

    const deleteComment = id =>
      (comments.value = comments.value.filter(com => com._id !== id));

    const editComment = ({ id, text }) => {
      comments.value = comments.value.map(com =>
        com._id === id ? { ...com, text } : com
      );
    };

    useFetch(async () => {
      const data = await (
        await fetch(`${process.env.baseUrl}/posts/${id.value}`)
      ).json();

      post.value = data.post;
      comments.value = data.comments;
    });

    return { post, comments, handleDelete, user, deleteComment, editComment };
  }
};
</script>

<style scoped>
.post {
  display: flex;
  flex-direction: column;
  gap: 2em;
  margin-top: 2em;
}
</style>
