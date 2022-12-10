<template>
  <v-overlay
    :model-value="showCreateQuestionaire"
    @click:outside="emits('update:showCreateQuestionaire', false)"
    class="d-flex align-start justify-center"
    style="padding-top: 120px"
  >
    <v-card class="mx-auto rounded-lg px-3 pb-5" width="850">
      <v-card-title class="text-h5 py-5 d-flex align-center"
        ><span
          >Home
          <span v-if="route.name == 'my-survey.folder'">
            / {{ folder.name }} /</span
          ></span
        >
        <v-spacer></v-spacer>
        <v-btn
          @click="emits('update:showCreateQuestionaire', false)"
          icon="mdi-close"
          variant="text"
          color="error"
        ></v-btn>
      </v-card-title>
      <v-card-text>
        <div class="d-flex">
          <label
            for=""
            class="text-subtitle-1 w-25 font-weight-medium text-grey-darken-2 pt-2"
            >Title</label
          >
          <v-text-field
            density="compact"
            color="#3D8361"
            v-model="survey.title"
            variant="outlined"
            label="Enter title"
            single-line
            class="mt-2"
          >
            <template #prepend-inner>
              <div class="d-flex"></div>
            </template>
          </v-text-field>
        </div>
        <div class="d-flex">
          <label for="" class="text-subtitle-1 w-25 font-weight-medium text-grey-darken-2"
            >Description</label
          >
          <v-textarea
            single-line
            v-model="survey.description"
            color="#3D8361"
            variant="outlined"
            class="mt-2"
            label="Enter Description"
          ></v-textarea>
        </div>
        <!-- <div>
          <label for="">Pick your Respondents</label>
          <v-container fluid>
            <v-row>
              <v-col class="pa-0" cols="3">
                <v-checkbox
                  hide-details
                  label="College Students"
                  color="#3D8361"
                ></v-checkbox>
              </v-col>
              <v-col class="pa-0" cols="3" v-for="n in 6">
                <v-checkbox
                  hide-details
                  :label="'Grade ' + n"
                  color="#3D8361"
                ></v-checkbox>
              </v-col>
              <v-col class="pa-0" cols="3"
                ><v-checkbox
                  hide-details
                  label="Elementary Teachers"
                  color="#3D8361"
                ></v-checkbox
              ></v-col>
              <v-col class="pa-0" cols="3"
                ><v-checkbox
                  hide-details
                  label="College Teachers"
                  color="#3D8361"
                ></v-checkbox
              ></v-col>
            </v-row>
          </v-container>
        </div> -->
      </v-card-text>
      <v-card-actions>
        <v-btn class="mx-2 px-5" variant="elevated" color="grey-lighten-4">Clear</v-btn>
        <v-spacer></v-spacer>
        <v-btn
          flat
          variant="elevated"
          color="#3D8361"
          class="mx-2 px-5 text-white"
          :loading="loading"
          @click="submit"
          >Create</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-overlay>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import useSurveyCreate from "../composable/useSurveyCreate";
import surveyStore from "../store/survey";
const { folder } = storeToRefs(surveyStore());
const route = useRoute();
const props = defineProps(["showCreateQuestionaire"]);
const emits = defineEmits(["update:showCreateQuestionaire"]);
const { survey, create, loading } = useSurveyCreate();
const submit = () => {
  create().then(() => {
    emits("update:showCreateQuestionaire", false);
  });
};
</script>

<style scoped></style>
