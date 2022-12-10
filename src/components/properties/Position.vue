<template>
  <div class="mb-5">
    <h3 class="font-weight-medium mb-2">Position</h3>
    <v-btn-toggle
      mandatory
      color="grey-lighten-5"
      v-model="pos"
      @click="emits('update:position', pos)"
    >
      <v-btn value="left">Left</v-btn>
      <v-btn value="center">Center</v-btn>
      <v-btn value="right">Right</v-btn>
    </v-btn-toggle>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps(["position"]);
const pos = ref(props.position);
const emits = defineEmits(["update:position"]);
</script>

<style scoped></style>
