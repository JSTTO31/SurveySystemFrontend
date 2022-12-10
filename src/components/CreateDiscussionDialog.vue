<template>
  <v-overlay
    class="d-flex justify-center align-center"
    :model-value="showCreateDiscussion"
    @click:outside="emits('update:showCreateDiscussion', false)"
  >
    <v-card width="750" class="pa-5 rounded-lg">
      <input
        style="font-size: 25px; font-weight: 500; outline: none; color: #395144"
        placeholder="Enter your Title"
        class="w-100"
        v-model="title"
      />
      <v-textarea
        v-model="paragraph"
        rows="5"
        single-line
        solo
        hide-details
        label="What's on your mind?"
        variant="plain"
        auto-grow
      ></v-textarea>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          class="px-8 rounded-xl"
          @click="emits('update:showCreateDiscussion', false)"
          >Cancel</v-btn
        >
        <v-btn
          class="px-8 rounded-xl text-white"
          color="#395144"
          variant="elevated"
          :disabled="!title || !paragraph"
          :loading="loading"
          @click="submit"
          >Post</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-overlay>
</template>

<script setup lang="ts">
import discussionStore from "../store/discussion";
import { ref } from "vue";
defineProps(["showCreateDiscussion"]);
const emits = defineEmits(["update:showCreateDiscussion"]);
const $discussion = discussionStore();
const title = ref("");
const paragraph = ref("");
const loading = ref(false);
const submit = () => {
  loading.value = true;
  $discussion.addDiscussion(title.value, paragraph.value).then(() => {
    loading.value = false;
    emits("update:showCreateDiscussion", false);
    title.value = paragraph.value = "";
  });
};
</script>

<style scoped></style>
