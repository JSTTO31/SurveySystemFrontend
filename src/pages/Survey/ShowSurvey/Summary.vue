<template>
  <v-container
    fluid
    class="bg-grey-lighten-4 pb-15"
    style="padding: 15px 450px; overflow-y: scroll"
    :style="{ height: showAppBar ? '780px' : '842px' }"
    @scroll="scrollFunction"
  >
    <v-card class="d-flex rounded-lg">
      <v-card flat class="w-100 px-2 py-3">
        <v-card-title class="font-weight-regular">Total of Responses</v-card-title>
        <v-card-text>
          <h1 class="text-h4 font-weight-medium text-grey-darken-3">
            {{ Math.floor(Math.random() * 1000) + 100 }}
          </h1>
        </v-card-text>
      </v-card>
      <v-divider vertical class="mx-2 my-5"></v-divider>

      <v-card flat class="w-100 px-2 py-3">
        <v-card-title class="font-weight-regular">Survey Status</v-card-title>
        <v-card-text>
          <h1 class="text-h4 text-success">OPEN</h1>
        </v-card-text>
      </v-card>

      <v-divider vertical class="mx-2 my-5"></v-divider>

      <v-card flat class="w-100 px-2 py-3">
        <v-card-title class="font-weight-regular">Given Points</v-card-title>
        <v-card-text>
          <h1 class="text-h4 font-weight-medium text-grey-darken-3">
            {{ Math.floor(Math.random() * 1000) + 100 }}
          </h1>
        </v-card-text>
      </v-card>
    </v-card>
    <v-card class="pa-5 my-5 rounded-lg">
      <barchart></barchart>
    </v-card>
    <div v-if="survey.questions.length > 0">
      <v-card v-for="(question, index) in survey.questions" class="my-4 rounded-lg">
        <v-card-title class="d-flex align-center text-grey-darken-2 pa-5">
          {{ index + 1 }}. {{ question.text }}
          <v-spacer></v-spacer>
          Question {{ index + 1 }}/{{ survey.questions.length }}
        </v-card-title>
        <v-card-text>
          <piechart
            v-if="question.properties.options"
            :labels="Object.keys(question.response_questions)"
            :data="
              Object.keys(question.response_questions).map(
                (item) => question.response_questions[item]
              )
            "
          ></piechart>
          <v-list v-else>
            <v-list-item
              v-for="answer in question.response_questions"
              :title="answer"
              class="bg-grey-lighten-5"
            ></v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed, inject } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import barchart from "../../../components/Barchart";
import piechart from "../../../components/Piechart";
import surveyStore, { Question } from "../../../store/survey";
const { survey } = storeToRefs(surveyStore());
const showAppBar: any = inject("showAppBar");
const scrollFunction = (e: any) => {
  if (e.target.scrollTop > 0) {
    showAppBar.value = false;
  } else {
    showAppBar.value = true;
  }
};

onBeforeRouteLeave((to, from, next) => {
  next();
  showAppBar.value = true;
});
</script>

<style scoped></style>
