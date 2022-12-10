<template>
  <!-- <v-app-bar flat>
    <div class="w-75 py-5">
      <v-text-field
        class="mt-5 ml-5"
        single-line
        density="compact"
        label="Search..."
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
      ></v-text-field>
    </div>
    <v-select
      :model-value="'Latest Survey'"
      class="mt-5 mx-5"
      single-line
      density="compact"
      label="Order By"
      variant="outlined"
      :items="['Oldest Survey', 'Latest Survey', 'Modified']"
    ></v-select>
  </v-app-bar> -->
  <v-app-bar flat>
    <div class="w-100 d-flex px-5 align-center">
      <v-alert type="warning" variant="tonal" density="compact"
        >All surveys will be permanently deleted after 30 days</v-alert
      >
      <v-spacer></v-spacer>
      <v-btn
        prepend-icon="mdi-delete"
        variant="outlined"
        class="ml-2"
        color="error"
        flat
        disabled
        >Delete Permanently</v-btn
      >
    </div>
  </v-app-bar>
  <v-container>
    <FolderListItemVue
      v-for="folder in folder_trashed"
      :folder="folder"
    ></FolderListItemVue>
    <SurveyListItemVue
      v-for="survey in survey_trashed.filter((item) => !item.folder_id)"
      :survey="survey"
    ></SurveyListItemVue>
    <span
      style="position: absolute; top: 35%; left: 50%"
      v-if="folder_trashed.length < 1 && survey_trashed.length < 1"
    >
      <v-img src="/src/assets/undraw_no_data_re_kwbl.svg" width="250"></v-img>
      <h1 class="text-center mt-10 text-grey-darken-1">No Trashed</h1>
    </span>
  </v-container>
</template>

<script setup lang="ts">
import FolderListItemVue from "../../../components/FolderListItem.vue";
import SurveyListItemVue from "../../../components/SurveyListItem.vue";
import { storeToRefs } from "pinia";
import surveyStore from "../../../store/survey";

const { folder_trashed, survey_trashed } = storeToRefs(surveyStore());
</script>

<style scoped></style>
