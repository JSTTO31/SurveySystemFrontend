<template>
  <v-app-bar flat>
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
  </v-app-bar>
  <v-app-bar flat>
    <div class="w-100 pl-1 d-flex pr-5 align-center">
      <div>
        <v-breadcrumbs :items="['Home']">
          <template v-slot:title="{ item }">
            <h3 class="font-weight-regular">{{ item }}</h3>
          </template>
        </v-breadcrumbs>
        <!-- <v-checkbox
          indeterminate
          color="#395144"
          hide-details
          label="Select All"
          single-line
          density-compact
        ></v-checkbox> -->
      </div>
      <v-spacer></v-spacer>
      <v-btn
        prepend-icon="mdi-plus"
        color="#F0EBCE"
        variant="elevated"
        flat
        @click="showCreateSurveyDialog = true"
        >Create Survey</v-btn
      >
      <v-btn
        prepend-icon="mdi-delete"
        variant="outlined"
        class="ml-2"
        color="error"
        flat
        disabled
        >Move to trash</v-btn
      >
    </div>
  </v-app-bar>
  <v-container>
    <FolderListItemVue
      v-for="folder in folders"
      :folder="folder"
      :key="folder.id"
    ></FolderListItemVue>
    <SurveyListItem
      v-for="survey in surveys.filter((item) => !item.folder_id)"
      :survey="survey"
      :key="survey.id"
    ></SurveyListItem>
  </v-container>
  <SurveyCreateDialogVue
    v-model:show-create-questionaire="showCreateSurveyDialog"
  ></SurveyCreateDialogVue>
</template>

<script setup lang="ts">
import SurveyCreateDialogVue from "../../../components/SurveyCreateDialog.vue";
import FolderListItemVue from "../../../components/FolderListItem.vue";
import SurveyListItem from "../../../components/SurveyListItem.vue";
import { storeToRefs } from "pinia";
import surveyStore from "../../../store/survey";
import { ref } from "vue";
const { surveys, folders } = storeToRefs(surveyStore());
const showCreateSurveyDialog = ref(false);
</script>

<style scoped></style>
