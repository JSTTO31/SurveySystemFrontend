<template>
  <div class="mt-5 w-100">
    <v-slider
      v-if="range != null"
      v-bind="$attrs"
      show-ticks="always"
      tick-size="5"
      color="#1C6758"
      :max="question.properties.options.split(/\r?\n/).length - 1"
      :ticks="ticksLabel"
      step="1"
      v-model="range"
      @click="emits('update:answer', range)"
    ></v-slider>
    <v-slider
      v-else
      v-bind="$attrs"
      show-ticks="always"
      tick-size="5"
      color="#1C6758"
      :max="question.properties.options.split(/\r?\n/).length - 1"
      :ticks="ticksLabel"
      step="1"
      v-model="range"
    ></v-slider>
  </div>
</template>
<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>
<script setup lang="ts">
import { computed, ref } from "vue";
const props = defineProps(["question", "answer"]);
const emits = defineEmits(["update:answer"]);
const range = ref();
const ticksLabel = computed(() => {
  let container: any = {};
  props.question.properties.options.split(/\r?\n/).forEach((item, key) => {
    container[key] = item;
  });

  return container;
});
</script>

<style scoped></style>
