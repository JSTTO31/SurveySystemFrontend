<template>
  <div class="w-100 d-flex">
    <v-spacer
      v-if="
        question.properties.position == 'right' ||
        question.properties.position == 'center'
      "
    ></v-spacer>
    <component
      :disabled="!isSelected"
      :readonly="isSelected"
      :is="component[type]"
      :question="question"
    ></component>
    <v-spacer
      v-if="
        question.properties.position == 'left' || question.properties.position == 'center'
      "
    ></v-spacer>
  </div>
</template>

<script setup lang="ts">
import AgreeDisagree from "./AgreeDisagree.vue";
import Range from "./Range.vue";
import YesOrNo from "./YesOrNo.vue";
import Select from "./Select.vue";
import Numbers from "./Number.vue";
import Date from "./Date.vue";
import Text from "./Text.vue";
const component = {
  "Agree Disagree": AgreeDisagree,
  Select: Select,
  Date: Date,
  YesOrNo: YesOrNo,
  Range: Range,
  Number: Numbers,
  Text: Text,
};
const props = defineProps(["type", "isSelected", "question"]);
</script>

<style scoped></style>
