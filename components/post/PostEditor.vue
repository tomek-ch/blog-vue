<template>
  <div class="editor">
    <input
      class="input"
      placeholder="Title"
      v-model="title"
      autofocus="autofocus"
    />
    <textarea class="input" v-model="body" placeholder="Body" />
    <TagEditor :tags="tags" @add-tag="addTag" @delete-tag="deleteTag" />
    <button class="btn-primary" @click="createPost" :disabled="!title || !body">
      {{ label }}
    </button>
    <div>{{ error }}</div>
  </div>
</template>

<script>
import { ref, useRouter } from "@nuxtjs/composition-api";
import { token } from "@/auth/store";
import limitLength from "@/utils/limitLength";
import useProtectedRoute from "@/composables/useProtectedRoute";
import TagEditor from "./TagEditor";

export default {
  props: ["method", "post", "label"],
  components: { TagEditor },
  setup(props) {
    const title = ref(props.post?.title || "");
    const body = ref(props.post?.paragraphs[0].body || "");
    const tags = ref(props.post?.tags || []);

    const error = ref("");
    const router = useRouter();

    const addTag = tag => tags.value.push(tag);
    const deleteTag = tag => (tags.value = tags.value.filter(t => t !== tag));

    const createPost = async () => {
      const post = {
        title: title.value,
        paragraphs: [{ body: body.value }],
        excerpt: limitLength(body.value, 100),
        isPublished: true,
        tags: tags.value
      };

      try {
        const res = await fetch(
          `${process.env.baseUrl}/posts/${props?.post?._id || ""}`,
          {
            method: props.method,
            body: JSON.stringify(post),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token.value}`
            }
          }
        );

        const data = await res.json();
        if (res.ok) {
          router.push(`/posts/${data._id}`);
        } else {
          error.value = data[0];
        }
      } catch (e) {
        console.log(e);
        error.value = "Error trying to submit";
      }
    };

    useProtectedRoute();
    return {
      createPost,
      title,
      body,
      error,
      tags,
      addTag,
      deleteTag
    };
  }
};
</script>

<style scoped>
.input {
  margin: 0.5em 0;
}

.btn-primary {
  margin-top: 0.5em;
}
</style>
