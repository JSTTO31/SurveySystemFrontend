<template>
  <div :class="'w-' + question.properties.width">
    <v-text-field
      v-if="answer != null"
      v-model="text"
      variant="underlined"
      single-line
      :label="question.properties.placeholder || 'Text'"
      color="#1C6758"
      v-bind="$attrs"
      :hint="question.properties.hint || ''"
      style="font-size: 50px"
      @blur="emits('update:answer', text)"
    ></v-text-field>
    <v-text-field
      v-else
      v-model="text"
      variant="underlined"
      single-line
      :label="question.properties.placeholder || 'Text'"
      color="#1C6758"
      v-bind="$attrs"
      :hint="question.properties.hint || ''"
      style="font-size: 50px"
    ></v-text-field>
  </div>
</template>
<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>
<script setup lang="ts">
import { ref } from "vue";
const props = defineProps(["question", "answer"]);
const text = ref(props.answer);
const emits = defineEmits(["update:answer"]);
</script>

<style scoped></style>
