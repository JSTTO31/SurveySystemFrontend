<template>
  <div class="mb-5">
    <h3 class="font-weight-medium mb-2">Variant</h3>
    <v-btn-toggle
      v-model="variantInt"
      @click="emits('update:variant', variantInt)"
      color="grey-lighten-5"
      mandatory
    >
      <v-btn value="elevated">Elevated</v-btn>
      <v-btn value="outlined">Outlined</v-btn>
      <v-btn value="text">Text</v-btn>
    </v-btn-toggle>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const props = defineProps(["variant"]);
const variantInt = ref(props.variant);
const emits = defineEmits(["update:variant"]);
</script>

<style scoped></style>
