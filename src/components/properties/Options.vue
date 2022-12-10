<template>
  <div class="mb-5">
    <h3 class="font-weight-medium">Options</h3>
    <v-textarea
      v-model="optionsInt"
      label="Enter your options"
      single-line
      variant="underlined"
      color="green-darken-4"
      density="compact"
      hide-details
      rows="1"
      auto-grow
      @blur="emits('update:options', optionsInt)"
    ></v-textarea>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps(["options"]);
const optionsInt = ref(props.options);
const emits = defineEmits(["update:options"]);
</script>

<style scoped></style>
