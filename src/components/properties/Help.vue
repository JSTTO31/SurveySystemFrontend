<template>
  <div class="mb-5 d-flex">
    <div class="w-100">
      <h4 class="font-weight-medium">Placeholder</h4>
      <v-text-field
        v-model="placeholderInt"
        color="green-darken-4"
        variant="outlined"
        class="my-1 text-center"
        single-line
        hide-details
        density="compact"
        label="input"
        @blur="emits('update:placeholder', placeholderInt)"
      ></v-text-field>
    </div>
    <v-spacer class="mx-2"></v-spacer>
    <div class="w-100">
      <h4 class="font-weight-medium">Hint</h4>
      <v-text-field
        v-model="hintInt"
        @blur="emits('update:hint', hintInt)"
        color="green-darken-4"
        variant="outlined"
        class="my-1 text-center"
        single-line
        hide-details
        density="compact"
        label="input"
      ></v-text-field>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps(["placeholder", "hint"]);
const placeholderInt = ref(props.placeholder);
const hintInt = ref(props.hint);
const emits = defineEmits(["update:placeholder", "update:hint"]);
</script>

<style scoped></style>
