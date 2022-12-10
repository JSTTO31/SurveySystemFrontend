<template>
  <v-navigation-drawer width="450" color="transparent" class="border-0 bg-grey-lighten-4">
    <div class="h-100 w-100 pa-5 pt-4">
      <v-card class="h-100 w-100 mb-5 rounded-lg">
        <h1 class="pa-5 text-h4 font-weight-medium text">Custom Tools</h1>
        <v-list class="px-2">
          <v-card
            flat
            v-for="tool in tools"
            draggable="true"
            @dragstart="($event : any) => pickUpTool($event, tool)"
            :prepend-icon="tool.icon"
            class="text-h6 mb-2 d-flex align-center"
            @click="addQuestion(tool.label, tool.properties)"
            >{{ tool.label }}</v-card
          >
        </v-list>
      </v-card>
    </div>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import surveyStore from "../store/survey";
import { authApi } from "../store/user";
const { getCountQuestions, survey } = storeToRefs(surveyStore());
const props = defineProps(["selectedQuestion"]);
const emits = defineEmits(["update:selected-question", "main-scrollY"]);
const $survey = surveyStore();
const addQuestion = async (type: string, properties: Object) => {
  const question = {
    text: "",
    index: getCountQuestions.value,
    type,
    properties,
    response_questions: [],
  };
  //@ts-ignore
  survey.value.questions.push(question);
  emits("update:selected-question", question);
  let maincard = document.getElementById("QuestionnaireDesignMain");
  let card = document.getElementById("question" + question.index);
  if (card && maincard) {
    emits(
      "main-scrollY",
      card?.getBoundingClientRect().y +
        card.getBoundingClientRect().height +
        maincard?.scrollTop
    );
  }

  $survey.addQuestion({ ...question, properties: JSON.stringify(question.properties) });
};
const tools = [
  {
    icon: "mdi-text",
    label: "Text",
    properties: {
      placeholder: "",
      hint: "",
      position: "left",
      width: "75",
    },
  },
  {
    icon: "mdi-radiobox-marked",
    label: "Agree Disagree",
    properties: {
      alignment: "vertical",
      position: "left",
      options: "Agree\nStrongly Agree\nDisagree\nStrongly Disagree",
    },
  },
  {
    icon: "mdi-chevron-down",
    label: "Select",
    properties: {
      placeholder: "",
      hint: "",
      position: "left",
      width: "50",
      options: "",
    },
  },
  {
    icon: "mdi-calendar",
    label: "Date",
    properties: {
      placeholder: "",
      position: "left",
      width: "50",
    },
  },
  {
    icon: "mdi-thumbs-up-down",
    label: "YesOrNo",
    properties: {
      variant: "elevated",
      size: "medium",
      position: "left",
      options: "yes\nno",
    },
  },
  {
    icon: "mdi-numeric-positive-1",
    label: "Number",
    properties: {
      placeholder: "",
      hint: "",
      position: "left",
      width: "25",
    },
  },
  {
    icon: "mdi-tune-variant",
    label: "Range",
    properties: {
      options: "0\n1\n2\n3\n4\n5",
    },
  },
];

const pickUpTool = (e: any, tool: any) => {
  const question = {
    text: "",
    index: getCountQuestions.value,
  };
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.dropEffect = "move";
  e.dataTransfer.setData(
    "question",
    JSON.stringify({
      ...question,
      type: tool.label,
      properties: tool.properties,
    })
  );
};
</script>

<style scoped></style>
