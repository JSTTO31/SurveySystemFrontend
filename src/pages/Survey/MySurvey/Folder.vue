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
    <div class="w-100 d-flex pr-5 pl-1 align-center">
      <div>
        <v-breadcrumbs :items="['Home', folder.name]">
          <template v-slot:title="{ item }">
            <h3 class="font-weight-regular">{{ item }}</h3>
          </template>
        </v-breadcrumbs>
      </div>
      <v-spacer></v-spacer>
      <v-btn
        prepend-icon="mdi-plus"
        color="#F0EBCE"
        variant="elevated"
        flat
        @click="showCreateSurvey = true"
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
    <SurveyListItemVue
      v-for="survey in folder.surveys"
      :survey="survey"
    ></SurveyListItemVue>
    <span
      style="position: absolute; top: 35%; left: 50%"
      v-if="folder.surveys.length < 1"
    >
      <v-img src="/src/assets/undraw_no_data_re_kwbl.svg" width="250"></v-img>
      <h1 class="text-center mt-10 text-grey-darken-1">No files</h1>
    </span>
  </v-container>
  <SurveyCreateDialogVue
    v-model:show-create-questionaire="showCreateSurvey"
  ></SurveyCreateDialogVue>
</template>

<script setup lang="ts">
import SurveyListItemVue from "../../../components/SurveyListItem.vue";
import SurveyCreateDialogVue from "../../../components/SurveyCreateDialog.vue";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { onBeforeRouteUpdate } from "vue-router";
import surveyStore from "../../../store/survey";
import { authApi } from "../../../store/user";
const { folder } = storeToRefs(surveyStore());
const showCreateSurvey = ref(false);
//@ts-ignore
onBeforeRouteUpdate(async (to, from, next) => {
  const { folders, folder } = storeToRefs(surveyStore());
  const existsFolder = folders.value.find((item) => item.id == to.params.id);
  if (existsFolder) {
    folder.value = existsFolder;
    return next();
  }

  try {
    const response = await authApi.get("/folders/" + to.params.id);
    folder.value = response.data;
    next();
    return response;
  } catch (e) {
    console.log(e);
  }
});
</script>

<style scoped></style>
