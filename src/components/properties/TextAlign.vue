<template>
  <div>
    <div class="mb-5">
      <h3 class="font-weight-medium mb-2">Text Alignment</h3>
      <v-btn-toggle
        color="grey-lighten-5"
        v-model="pos"
        @click="emits('update:position', pos)"
      >
        <v-btn value="left"><v-icon>mdi-format-align-left</v-icon></v-btn>
        <v-btn value="center"><v-icon>mdi-format-align-center</v-icon></v-btn>
        <v-btn value="right"><v-icon>mdi-format-align-right</v-icon></v-btn>
      </v-btn-toggle>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const props = defineProps(["position"]);
const pos = ref(props.position);
const emits = defineEmits(["update:position"]);
</script>

<style scoped></style>
