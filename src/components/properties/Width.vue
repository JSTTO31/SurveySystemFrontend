<template>
  <div class="mb-5">
    <h3 class="font-weight-medium mb-2">Width Options</h3>
    <v-btn-toggle
      v-model="size"
      @click="emits('update:width', size)"
      color="grey-lighten-5"
      mandatory
    >
      <v-btn value="25">25%</v-btn>
      <v-btn value="50">50%</v-btn>
      <v-btn value="75">75%</v-btn>
      <v-btn value="100">100%</v-btn>
    </v-btn-toggle>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const props = defineProps(["width"]);
const size = ref(props.width);
const emits = defineEmits(["update:width"]);
</script>

<style scoped></style>
