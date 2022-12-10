<template>
  <v-container
    fluid
    class="bg-grey-lighten-4 pb-15"
    style="padding: 15px 350px; overflow-y: scroll"
    @scroll="scrollFunction"
    :style="{ height: showAppBar ? '780px' : '842px' }"
  >
    <v-card>
      <v-card-title class="d-flex align-center"
        >Responses {{ currentIndexResponse + 1 }}/{{ survey.responses.length
        }}<v-spacer></v-spacer>
        <v-btn
          variant="text"
          icon="mdi-chevron-left"
          @click="currentIndexResponse--"
          :disabled="currentIndexResponse + 1 < 2"
        ></v-btn>
        <v-btn
          variant="text"
          icon="mdi-chevron-right"
          :disabled="currentIndexResponse + 1 >= survey.responses.length"
          @click="currentIndexResponse++"
        ></v-btn>
      </v-card-title>
    </v-card>
    <v-card class="pa-5 my-3">
      <h1 style="color: #1c6758">{{ survey.title }}</h1>
      <h4 class="text-grey-darken-1 mb-5">{{ survey.description }}</h4>
      <div
        class="mt-5"
        v-for="(question, index) of survey.questions"
        :key="survey.responses[currentIndexResponse]"
      >
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
            readonly
            v-model:answer="
              survey.responses[currentIndexResponse].response_questions.find(
                (item: any) => item.question_id == question.id
              ).answer
            "
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
    </v-card>
    <v-card>
      <v-card-title class="d-flex align-center"
        >Responses {{ currentIndexResponse + 1 }}/{{ survey.responses.length
        }}<v-spacer></v-spacer>
        <v-btn
          variant="text"
          icon="mdi-chevron-left"
          @click="currentIndexResponse--"
          :disabled="currentIndexResponse + 1 < 2"
        ></v-btn>
        <v-btn
          variant="text"
          icon="mdi-chevron-right"
          :disabled="currentIndexResponse + 1 >= survey.responses.length"
          @click="currentIndexResponse++"
        ></v-btn>
      </v-card-title>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import AgreeDisagreeVue from "../../../components/types/AgreeDisagree.vue";
import NumberVue from "../../../components/types/Number.vue";
import DateVue from "../../../components/types/Date.vue";
import RangeVue from "../../../components/types/Range.vue";
import SelectVue from "../../../components/types/Select.vue";
import TextVue from "../../../components/types/Text.vue";
import YesOrNoVue from "../../../components/types/YesOrNo.vue";
import { storeToRefs } from "pinia";
import { inject, ref } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import surveyStore from "../../../store/survey";
const { survey } = storeToRefs(surveyStore());
const currentIndexResponse = ref(0);
const showAppBar: any = inject("showAppBar");
const components: any = {
  "Agree Disagree": AgreeDisagreeVue,
  Select: SelectVue,
  Date: DateVue,
  YesOrNo: YesOrNoVue,
  Range: RangeVue,
  Number: NumberVue,
  Text: TextVue,
};
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
