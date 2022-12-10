<template>
  <div :class="'w-' + question.properties.width">
    <v-text-field
      v-if="answer != null"
      type="number"
      variant="underlined"
      v-bind="$attrs"
      label="Number"
      single-line
      hide-details
      v-model="number"
      @blur="emits('update:answer', number)"
      color="#1C6758"
    ></v-text-field>
    <v-text-field
      v-else
      type="number"
      variant="underlined"
      v-bind="$attrs"
      label="Number"
      single-line
      hide-details
      color="#1C6758"
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
const number = ref();
const emits = defineEmits(["update:answer"]);
</script>

<style scoped></style>
