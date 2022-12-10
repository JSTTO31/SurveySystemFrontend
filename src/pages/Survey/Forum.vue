<template>
  <v-container
    class="h-100"
    style="padding: 0px 250px"
    :style="{ 'padding-top': showAppBar ? '50px' : '' }"
  >
    <v-layout class="h-100">
      <v-navigation-drawer class="border-0">
        <v-list>
          <h1 class="mb-4 font-weight-medium text-grey-darken-4">Categories</h1>
          <v-list-item
            active
            @click=""
            color="#4E6C50"
            class="my-2 rounded-pill text-center font-weight-medium"
            >All Discussion</v-list-item
          >
          <v-list-item
            @click=""
            color="#4E6C50"
            class="my-2 rounded-pill text-center font-weight-medium"
            >Random Discussion</v-list-item
          >
          <v-list-item
            @click=""
            color="#4E6C50"
            class="my-2 rounded-pill text-center font-weight-medium"
            >My Discussion</v-list-item
          >
          <v-list-item
            @click=""
            color="#4E6C50"
            class="my-2 rounded-pill text-center font-weight-medium"
            >My Participation</v-list-item
          >
          <v-list-item
            @click=""
            color="#4E6C50"
            class="my-2 rounded-pill text-center font-weight-medium"
            >Followed Discussion</v-list-item
          >
          <v-list-item
            @click=""
            color="#4E6C50"
            class="my-2 rounded-pill text-center font-weight-medium"
            >Most Viewed</v-list-item
          >
          <v-list-item
            @click=""
            color="#4E6C50"
            class="my-2 rounded-pill text-center font-weight-medium"
            >Most Anwered</v-list-item
          >
          <v-list-item
            @click=""
            color="#4E6C50"
            class="my-2 rounded-pill text-center font-weight-medium"
            >Solved Discussion</v-list-item
          >
          <v-list-item
            @click=""
            color="#4E6C50"
            class="my-2 rounded-pill text-center font-weight-medium"
            >Unsolved Discussion</v-list-item
          >
        </v-list>
      </v-navigation-drawer>
      <v-main
        class="ml-10"
        style="overflow-y: scroll"
        :style="{ height: showAppBar ? '850px' : '962px' }"
        @scroll="scrollFunction"
      >
        <v-container>
          <div class="d-flex align-center bg-white">
            <v-text-field
              variant="outlined"
              density="compact"
              hide-details
              single-line
              label="Search..."
              color="#4E6C50"
            ></v-text-field>
            <div class="w-25">
              <v-select
                class="ml-2"
                label="Order By"
                variant="outlined"
                density="compact"
                hide-details
                single-line
                color="#4E6C50"
              ></v-select>
            </div>
          </div>
          <div class="d-flex mt-3">
            <v-spacer></v-spacer>
            <v-btn
              color="#4E6C50"
              class="text-white"
              prepend-icon="mdi-plus"
              flat
              @click="showCreateDiscussion = true"
              >Add Discussion</v-btn
            >
          </div>
          <div class="pt-10">
            <PostCard
              :discussion="discussion"
              v-for="discussion in discussions"
              width="980"
              class="mb-3"
            ></PostCard>
          </div>
        </v-container>
      </v-main>
    </v-layout>
    <CreateDiscussionDialogVue
      v-model:showCreateDiscussion="showCreateDiscussion"
    ></CreateDiscussionDialogVue>
  </v-container>
</template>

<script setup lang="ts">
import CreateDiscussionDialogVue from "../../components/CreateDiscussionDialog.vue";
import { inject, ref } from "vue";
import PostCard from "../../components/PostCard.vue";
import discussionStore from "../../store/discussion";
import { storeToRefs } from "pinia";
const $discussion = discussionStore();
const { discussions } = storeToRefs($discussion);
const showAppBar: any = inject("showAppBar");
const scrollFunction = (e: any) => {
  if (e.target.scrollTop > 0) {
    showAppBar.value = false;
  } else {
    showAppBar.value = true;
  }
};
const showCreateDiscussion = ref(false);

$discussion.getAll();
</script>

<style scoped></style>
