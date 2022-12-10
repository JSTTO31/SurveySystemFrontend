<template>
  <div class="mt-5" :class="'w-' + question.properties.width">
    <DatePicker
      v-if="answer != null"
      v-model="date"
      color="#1C6758"
      :placeholder="question.properties.placeholder"
      hint="example"
      @change="emits('update:answer', date)"
      v-bind="$attrs"
    ></DatePicker>
    <DatePicker
      v-else
      color="#1C6758"
      :placeholder="question.properties.placeholder"
      hint="example"
      v-bind="$attrs"
    ></DatePicker>
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
const date = ref(props.answer);
const emits = defineEmits(["update:answer"]);
</script>

<style scoped></style>
