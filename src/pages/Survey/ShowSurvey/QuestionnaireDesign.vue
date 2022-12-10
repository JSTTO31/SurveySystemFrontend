<template>
  <NavigationToolsVue
    @main-scrollY="scrollMainY"
    v-model:selected-question="selectedQuestion"
  ></NavigationToolsVue>
  <v-container
    fluid
    class="bg-grey-lighten-4 pb-15"
    style="padding: 15px 55px; overflow-y: scroll"
    :style="{ height: showAppBar ? '750px' : '814px' }"
    id="QuestionnaireDesignMain"
    @scroll="scrollFunction"
  >
    <div @click="selectedQuestion = {}">
      <v-card
        class="pa-10 rounded-lg"
        id="main-card"
        flat
        @drop="onDropContainer"
        @dragover.prevent=""
        @dragenter.prevent=""
      >
        <v-container fluid>
          <v-row class="w-100">
            <input
              id="title"
              class="w-100"
              placeholder="Title"
              v-model="edit.title"
              @keyup="$v.$touch"
              @blur="update"
            />
          </v-row>
          <v-row>
            <input
              @keyup="$v.$touch"
              class="w-100 text-grey-darken-1"
              id="description"
              v-model="edit.description"
              placeholder="Description"
              @blur="update"
            />
          </v-row>
        </v-container>
        <div class="pa-15" v-if="survey.questions.length < 1">
          <v-card
            class="my-5 w-100 rounded-xl"
            flat
            height="250"
            style="border: 4px dashed #1c6758"
          >
            <v-card
              class="w-100 rounded-xl bg-grey-lighten-5 h-100 d-flex align-center justify-center"
            >
              <h1 class="font-weight-bold text-grey-darken-1">
                <v-icon>mdi-drag-variant</v-icon> Drag Here
              </h1>
            </v-card>
          </v-card>
        </div>
        <div id="cards-container">
          <QuestionCard
            class="card"
            @dragenter.prevent="onDragEnter"
            @dragover.prevent=""
            v-model:selected-question="selectedQuestion"
            v-for="(question, n) in survey.questions"
            :question="question"
            :index="n"
          ></QuestionCard>
        </div>
      </v-card>
    </div>
    <NavigationPropertiesVue
      :key="selectedQuestion"
      :selected-question="selectedQuestion"
    ></NavigationPropertiesVue>
  </v-container>
</template>

<script setup lang="ts">
import useDragAndDrop from "../../../composable/useDragAndDrop";
import NavigationToolsVue from "../../../components/NavigationTools.vue";
import NavigationPropertiesVue from "../../../components/NavigationProperties.vue";
import { storeToRefs } from "pinia";
import surveyStore from "../../../store/survey";
import QuestionCard from "../../../components/QuestionCard.vue";
import { authApi } from "../../../store/user";
import useSurveyEdit from "../../../composable/useSurveyEdit";
import { inject, ref, watch } from "vue";
import { onBeforeRouteLeave } from "vue-router";
const { survey } = storeToRefs(surveyStore());
const { edit, $v, update } = useSurveyEdit();
const showAppBar: any = inject("showAppBar");
const scrollFunction = (e: any) => {
  if (e.target.scrollTop > 0) {
    showAppBar.value = false;
  } else {
    showAppBar.value = true;
  }
};
const selectedQuestion: any = ref({});
const {
  onDragEnter,
  onDropContainer,
  windowPreventDefault,
  onDropOutside,
} = useDragAndDrop(selectedQuestion);
window.addEventListener("dragover", windowPreventDefault);
window.addEventListener("drop", onDropOutside);

onBeforeRouteLeave((to, from, next) => {
  window.removeEventListener("drop", onDropOutside, false);
  window.removeEventListener("dragover", onDropOutside, false);
  showAppBar.value = true;
  next();
});

const scrollMainY = (y: number) => {
  console.log("triggered");

  document.getElementById("QuestionnaireDesignMain")?.scrollTo(0, y);
};
</script>

<style scoped>
#title {
  font-size: 40px !important;
  outline: none;
  padding-left: 5px;
}
#description {
  font-size: 25px !important;
  outline: none;
  padding-left: 5px;
  margin-top: 20px;
}

#card-actions {
  position: fixed;
  top: 225px;
  right: 300px;
}
#QuestionnaireDesignMain {
  scroll-behavior: smooth;
}
#QuestionnaireDesignMain::-webkit-scrollbar {
  width: 0;
}

.card {
  top: 0;
  position: relative;
  transition: top 0.2s ease-out, left 0.2s ease-out !important;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
