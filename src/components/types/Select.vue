<template>
  <div class="mt-5" :class="'w-' + question.properties.width">
    <v-select
      v-if="answer != null"
      v-model="select"
      :hint="question.properties.hint"
      density="compact"
      variant="outlined"
      :label="question.properties.placeholder || 'Select'"
      color="#1C6758"
      hidedetails
      single-line
      :items="question.properties.options.split(/\r?\n/)"
      v-bind="{ ...$attrs, readonly: false }"
      @change="emits('update:answer', select)"
    ></v-select>
    <v-select
      v-else
      :hint="question.properties.hint"
      density="compact"
      variant="outlined"
      :label="question.properties.placeholder || 'Select'"
      color="#1C6758"
      hidedetails
      single-line
      :items="question.properties.options.split(/\r?\n/)"
      v-bind="{ ...$attrs, readonly: false }"
      @change=""
    ></v-select>
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
const select = ref();
const emits = defineEmits(["update:answer"]);
</script>

<style scoped></style>
