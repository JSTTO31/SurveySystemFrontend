<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card
      v-bind="props"
      class="w-100 my-1 d-flex align-center rounded-lg border"
      flat
      @click="router.push({ name: 'survey.show.design', params: { id: survey.id } })"
      style="cursor: pointer"
    >
      <template #prepend>
        <v-checkbox color="#395144" hide-details @click.stop></v-checkbox>
      </template>
      <v-icon size="50" color="#1C6758" class="mr-5">mdi-text-box</v-icon>
      <div class="d-flex flex-column" style="width: 450px">
        <h3 class="text-no-wrap" style="text-overflow: ellipsis; overflow: hidden">
          {{ survey.title }}
        </h3>
        <h5 class="font-weight-regular d-flex align-center">
          Created at: {{ new Date(survey.created_at).toDateString() }}
          <v-divider vertical class="mx-2"></v-divider>
          Updated at: {{ new Date(survey.updated_at).toDateString() }}
        </h5>
      </div>
      <v-divider vertical class="my-3 mx-5"></v-divider>
      <div class="d-flex flex-column">
        <v-chip size="large" color="success">Open</v-chip>
      </div>
      <v-divider vertical class="my-3 mx-5"></v-divider>
      <div class="d-flex flex-column">
        <h3 class="text-center">{{ 100 }}</h3>
        <h5 class="text-grey-darken-2">Total Responses</h5>
      </div>
      <v-divider vertical class="my-3 mx-5"></v-divider>
      <div class="d-flex flex-column text-center">
        <h3>{{ Math.floor(Math.random() * 100) + 5 }}</h3>
        <h5 class="text-grey-darken-2">Total Points</h5>
      </div>
      <v-divider vertical class="my-3 mx-5"></v-divider>
      <v-spacer></v-spacer>
      <div class="mx-5">
        <v-btn
          v-if="isHovering"
          variant="plain"
          prepend-icon="mdi-delete"
          color="error"
          flat
          @click.stop="$survey.surveySoftDelete(survey.id)"
          >Remove</v-btn
        >
      </div>
    </v-card>
  </v-hover>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import surveyStore, { Survey } from "../store/survey";
const router = useRouter();
const $survey = surveyStore();
const props = defineProps<{ survey: Survey }>();
</script>

<style scoped></style>
