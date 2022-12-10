<template>
  <div class="mt-5">
    <v-btn
      color="green-darken-4"
      :variant="question.properties.variant"
      :size="question.properties.size == 'medium' ? 'default' : question.properties.size"
      v-bind="$attrs"
      prepend-icon="mdi-thumb-up-outline"
      @click="emits('update:answer', 'yes')"
      :disabled="answer == 'yes'"
      >Yes</v-btn
    >
    <span class="mx-1"></span>
    <v-btn
      @click="emits('update:answer', 'no')"
      color="green-darken-4"
      :variant="question.properties.variant"
      :size="question.properties.size == 'medium' ? 'default' : question.properties.size"
      v-bind="$attrs"
      prepend-icon="mdi-thumb-down-outline"
      :disabled="answer == 'no'"
      >No</v-btn
    >
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
const emits = defineEmits(["update:answer"]);
</script>

<style scoped></style>
