<template>
  <div
    :id="'question' + question.index"
    @click.stop="emits('update:selected-question', question)"
  >
    <v-card
      class="rounded-lg pa-5 mb-5"
      :class="{ 'bg-grey-lighten-5': !isSelected }"
      :style="[
        { border: isSelected ? '2px solid #1C6758' : '' },
        { cursor: isSelected ? 'arrow' : 'pointer' },
      ]"
      :flat="isSelected ? true : false"
    >
      <div :id="'question' + (index + 1)">
        <h3 class="font-weight-regular" :class="{ 'text-grey-darken-1': !isSelected }">
          {{ question.index + 1 }}. {{ question.text || "Question?" }}
        </h3>
        <ContainerType
          :question="question"
          :type="question.type"
          :is-selected="isSelected"
        ></ContainerType>
      </div>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="!isSelected"
          variant="text"
          icon="mdi-card-plus-outline"
          color="grey-darken-2"
          @click="duplicateQuestion"
        ></v-btn>
        <v-btn
          :disabled="!isSelected"
          variant="text"
          icon="mdi-delete"
          color="error"
          @click.stop="removeQuestion"
        ></v-btn>
        <v-divider class="mr-3 my-3" vertical></v-divider>
        <div>
          <v-switch
            v-model="question.required"
            color="#1C6758"
            :disabled="!isSelected"
            hide-details
            @change="$survey.updateQuestion(question)"
            label="required"
          ></v-switch>
        </div>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import ContainerType from "../components/types/TypeContainer.vue";
import { storeToRefs } from "pinia";
import surveyStore, { Question, Answer } from "../store/survey";
import { authApi } from "../store/user";
import { ref, computed, watch } from "vue";
import { onBeforeRouteLeave } from "vue-router";
const $survey = surveyStore();
const { survey } = storeToRefs($survey);
const props = defineProps<{
  question: Question;
  index: number;
  selectedQuestion: any;
}>();
const isSelected = computed(
  () =>
    props.selectedQuestion != null && props.selectedQuestion.index == props.question.index
);
const question = computed(() => props.question);
const emits = defineEmits(["update:selected-question", "update:showProperties"]);
const duplicateQuestion = async () => {
  survey.value.questions = survey.value.questions.map((item) =>
    item.index >= props.question.index + 1 ? { ...item, index: item.index + 1 } : item
  );

  survey.value.questions.splice(props.question.index + 1, 0, {
    ...props.question,
    index: props.question.index + 1,
  });

  $survey.addQuestion({
    ...props.question,
    index: props.question.index + 1,
    properties: JSON.stringify(props.question.properties),
  });

  emits("update:selected-question", survey.value.questions[props.question.index + 1]);
};
const removeQuestion = async () => {
  if (props.selectedQuestion.index == props.question.index) {
    emits("update:selected-question", {});
  }
  survey.value.questions.splice(props.question.index, 1);
  survey.value.questions.map((item) =>
    item.index > props.question.index ? { ...item, index: item.index-- } : item
  );

  $survey.deleteQuestion(props.question.id);
};
</script>

<style scoped>
.scale-enter-from,
.scale-leave-to {
  opacity: 0;
}

.scale-enter-active,
.scale-leave-active {
  transition: 0.2s;
}

.scale-animation {
  /* Start the shake animation and make the animation last for 0.5 seconds */
  animation: scale 0.2s;

  /* When the animation is finished, start again */
  animation-iteration-count: 1;
}

@keyframes scale {
  from {
    transform: scale(0.1);
  }
  to {
    transform: scale(1);
  }
}
</style>
