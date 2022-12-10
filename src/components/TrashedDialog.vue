<template>
  <v-overlay
    @click:outside="emits('update:showDialog', false)"
    class="d-flex align-center justify-center"
    :model-value="showDialog"
  >
    <v-card class="mx-auto rounded-lg px-3 pb-5 px-5" width="850">
      <div class="text-h5 text-error pt-5 pb-2 d-flex align-center">
        <v-icon>mdi-delete-outline</v-icon>
        Trash
      </div>
      <div class="py-4 px-2">
        <h2 class="text-grey-darken-1">Folder</h2>
        <v-card @click="" v-for="folder in folder_trashed">
          <h3>{{ folder.name }}</h3>
        </v-card>
      </div>
      <div class="d-flex mt-3">
        <v-spacer></v-spacer>
        <v-btn flat color="grey-lighten-4" class="px-5 mr-2">Cancel</v-btn>
        <v-btn flat variant="elevated" color="error" class="px-5 text-white"
          >Delete All</v-btn
        >
      </div>
    </v-card>
  </v-overlay>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import surveyStore from "../store/survey";

defineProps(["showDialog"]);
const $survey = surveyStore();
const { folder_trashed, survey_trashed } = storeToRefs(surveyStore());
const emits = defineEmits(["update:showDialog"]);
</script>

<style scoped></style>
