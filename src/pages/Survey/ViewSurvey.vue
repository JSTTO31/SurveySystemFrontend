<template>
  <v-container
    style="padding: 55px 380px; background: #eef2e6; overflow-y: scroll"
    class="w-screen h-screen"
    id="main"
    fluid
  >
    <Head>
      <title>{{ survey.title }}</title>
    </Head>
    <v-card class="pa-5" flat>
      <h1 style="color: #1c6758">{{ survey.title }}</h1>
      <h4 class="text-grey-darken-1">{{ survey.description }}</h4>
      <div class="mt-5" v-for="(question, index) of survey.questions">
        <h4 class="font-weight-regular">
          {{ index + 1 }}. {{ question.text || "What is your question?" }}
        </h4>
        <div class="d-flex w-100">
          <v-spacer
            v-if="
              question.properties.position == 'right' ||
              question.properties.position == 'center'
            "
          ></v-spacer>
          <component
            :is="components[question.type]"
            :question="question"
            v-model:answer="response_questions[index].answer"
          ></component>
          <v-spacer
            v-if="
              question.properties.position == 'right' ||
              question.properties.position == 'center'
            "
          ></v-spacer>
        </div>
        <v-divider class="mt-5"></v-divider>
      </div>
      <div class="d-flex align-center">
        <v-btn
          class="mt-5"
          flat
          color="grey-lighten-3"
          d
          size="large"
          @click="sendResponse"
          >Clear</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn class="text-white mt-5" size="large" color="#1c6758" @click="sendResponse"
          >Submit</v-btn
        >
      </div>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import AgreeDisagreeVue from "../../components/types/AgreeDisagree.vue";
import NumberVue from "../../components/types/Number.vue";
import DateVue from "../../components/types/Date.vue";
import RangeVue from "../../components/types/Range.vue";
import SelectVue from "../../components/types/Select.vue";
import TextVue from "../../components/types/Text.vue";
import YesOrNoVue from "../../components/types/YesOrNo.vue";
import { ref } from "vue";
import { Survey } from "../../store/survey";
import { authApi } from "../../store/user";
const props = defineProps<{ survey: Survey }>();
const components: any = {
  "Agree Disagree": AgreeDisagreeVue,
  Select: SelectVue,
  Date: DateVue,
  YesOrNo: YesOrNoVue,
  Range: RangeVue,
  Number: NumberVue,
  Text: TextVue,
};
const response_questions: any = ref(
  props.survey.questions.map((item) => ({
    //@ts-ignore
    survey_id: item.survey_id,
    question_id: item.id,
    answer: "",
  }))
);

const sendResponse = async () => {
  try {
    await authApi.post(`/survey/${props.survey.id}/responses`, {
      questions: response_questions.value,
    });
  } catch (e) {}
};
</script>

<style scoped>
body::-webkit-scrollbar {
  width: 5px !important;
  color: #1c6758;
}
</style>
