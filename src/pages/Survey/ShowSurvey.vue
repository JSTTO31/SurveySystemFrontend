<template>
  <v-container
    class="d-flex align-center"
    style="height: 100px; padding: 15px 25px"
    fluid
  >
    <v-btn
      icon="mdi-chevron-left"
      class="rounded-lg border mr-5"
      :to="{ name: 'my-survey.index' }"
      color="grey-lighten-5"
      flat
    ></v-btn>
    <h1 class="font-weight-medium text-grey-darken-3">
      {{ survey.title }}
    </h1>
    <v-spacer></v-spacer>
    <v-btn variant="text" color="grey-darken-1" class="mx-1" icon="mdi-undo"></v-btn>
    <v-btn variant="text" color="grey-darken-1" class="mx-1" icon="mdi-redo"></v-btn>
    <v-btn
      icon="mdi-eye"
      variant="text"
      color="grey-darken-1"
      class="mx-5"
      @click="viewSurvey"
    ></v-btn>
    <div>
      <v-switch hide-details color="#1C6758" label="Accept responses"></v-switch>
    </div>
    <v-divider vertical class="mx-5 py-5"></v-divider>
    <v-btn
      color="#D6CDA4"
      icon="mdi-printer"
      variant="elevated"
      class="rounded-lg"
      flat
    ></v-btn>
  </v-container>
  <v-layout style="overflow-y: hidden" v-if="survey">
    <v-app-bar density="compact" :flat="showAppBar" class="border-b">
      <v-tabs color="#1C6758">
        <v-tab
          class="text-capitalize"
          :to="{ name: 'survey.show.design', params: { id: survey.id } }"
          >Questionnaire Design</v-tab
        >
        <v-tab
          class="text-capitalize"
          :to="{ name: 'survey.show.summary', params: { id: survey.id } }"
          >Summary</v-tab
        >
        <v-tab
          class="text-capitalize"
          :to="{ name: 'survey.show.individual', params: { id: survey.id } }"
          >Analyze Individual</v-tab
        >
      </v-tabs>
    </v-app-bar>
    <v-main id="main" class="h-100">
      <RouterView></RouterView>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { inject } from "vue";
import { useRouter } from "vue-router";
import surveyStore from "../../store/survey";
const $survey = surveyStore();
const { survey } = storeToRefs(surveyStore());
const router = useRouter();
const showAppBar = inject("showAppBar");
const routeData = router.resolve({
  name: "survey.view",
  params: { id: survey.value.id },
});
const viewSurvey = () => {
  window.open(routeData.href, "_blank");
};
$survey.getAll();
</script>

<style scoped></style>
