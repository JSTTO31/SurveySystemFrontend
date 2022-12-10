<template>
  <div class="mb-5">
    <h3 class="font-weight-medium mb-2">Alignment</h3>
    <v-btn-toggle
      mandatory
      color="grey-lighten-5"
      v-model="alignmentInt"
      @click="emits('update:alignment', alignmentInt)"
    >
      <v-btn value="horizontal">Horizontal</v-btn>
      <v-btn value="vertical">Vertical</v-btn>
    </v-btn-toggle>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const props = defineProps(["alignment"]);
const alignmentInt = ref(props.alignment);
const emits = defineEmits(["update:alignment"]);
</script>

<style scoped></style>
