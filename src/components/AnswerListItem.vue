<template>
  <div class="d-flex align-center">
    <div class="pt-5">
      <v-radio hide-details disabled></v-radio>
    </div>
    <v-text-field
      @keyup="isDirty = true"
      @blur="updateAnswer"
      v-model="text"
      single-line
      hide-details
      color="#1C6758"
      variant="underlined"
      :label="'Option ' + (answer.index + 1)"
    ></v-text-field>
    <v-btn
      class="mt-3"
      icon="mdi-close"
      variant="text"
      color="error"
      @click="removeAnswer"
    ></v-btn>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref } from "vue";
import surveyStore, { Answer, Question } from "../store/survey";
import { authApi } from "../store/user";
const props = defineProps<{ question: Question; answer: Answer }>();
const { survey } = storeToRefs(surveyStore());
const text = ref(props.answer.text);
const isDirty = ref(false);

const updateAnswer = async () => {
  if (isDirty.value) {
    isDirty.value = false;
    try {
      await authApi.put(
        `/survey/${survey.value.id}/questions/${props.question.index}/answers/${props.answer.index}`,
        { text: text.value }
      );
    } catch (e) {
      console.error(e);
    }
  }
  return;
};
const removeAnswer = async () => {
  const index = props.answer.index;
  props.question.answers.splice(props.answer.index, 1);
  props.question.answers.map((item) => (item.index > index ? item.index-- : item));
  try {
    const response = await authApi.delete(
      `/survey/${survey.value.id}/questions/${props.question.index}/answers/${index}`
    );
  } catch (e) {
    console.log(e);
  }
};
</script>

<style scoped></style>
