<template>
  <v-container
    class="bg-grey-lighten-4 d-flex align-center"
    style="height: 180px; padding: 15px 350px"
    fluid
  >
    <v-row>
      <v-col cols="6" class="">
        <v-card class="pa-5">
          <v-row>
            <v-col>
              <h2 class="text-grey-darken-2">Open</h2>
              <h1 class="font-weight-regular text-grey-darken-4">
                {{ Math.floor(Math.random() * 1000) + 100 }}
              </h1>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col>
              <h2 class="text-grey-darken-2">Draft</h2>
              <h1 class="font-weight-regular text-grey-darken-4">
                {{ Math.floor(Math.random() * 1000) + 100 }}
              </h1>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="pa-5">
          <h2 class="text-grey-darken-2">Total Responses</h2>
          <h1 class="font-weight-regular text-grey-darken-4">
            {{ Math.floor(Math.random() * 1000) + 100 }}
          </h1>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="pa-5">
          <h2 class="text-grey-darken-2">Total Points</h2>
          <h1 class="font-weight-regular text-grey-darken-4">
            {{ Math.floor(Math.random() * 1000) + 100 }}
          </h1>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-container style="height: 180px; padding: 15px 350px" fluid>
    <h2 class="font-weight-medium">Recent Surveys</h2>
    <div v-if="surveys.length > 0" class="pb-10 pt-2">
      <SurveyRecentListItemVue
        v-for="survey in surveys"
        :survey="survey"
      ></SurveyRecentListItemVue>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import SurveyRecentListItemVue from "../../components/SurveyRecentListItem.vue";
import { storeToRefs } from "pinia";
import surveyStore from "../../store/survey";
const { surveys } = storeToRefs(surveyStore());
const $survey = surveyStore();
$survey.getAll();
</script>

<style scoped></style>
