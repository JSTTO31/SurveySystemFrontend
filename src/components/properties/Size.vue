<template>
  <div class="mb-5">
    <h3 class="font-weight-medium mb-2">Size</h3>
    <v-btn-toggle
      color="green-darken-4"
      mandatory
      v-model="sizeInt"
      @click="emits('update:size', sizeInt)"
    >
      <v-btn value="small">small</v-btn>
      <v-btn value="medium">Medium</v-btn>
      <v-btn value="large">Large</v-btn>
      <v-btn value="x-large">X Large</v-btn>
    </v-btn-toggle>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps(["size"]);
const sizeInt = ref(props.size);
const emits = defineEmits(["update:size"]);
</script>

<style scoped></style>
