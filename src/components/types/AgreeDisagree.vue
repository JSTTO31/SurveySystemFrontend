<template>
  <div class="pt-5">
    <v-radio-group
      v-bind="$attrs"
      :inline="question.properties.alignment == 'horizontal'"
      v-model="selectedOption"
      @change="emits('update:answer', selectedOption)"
    >
      <v-radio
        :value="option"
        :label="option"
        v-for="option in optionList"
        color="#1C6758"
      ></v-radio>
    </v-radio-group>
  </div>
</template>
<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>
<script lang="ts" setup>
import { computed, ref } from "vue";
const props = defineProps(["question", "answer"]);
const selectedOption = ref(props.answer);
const emits = defineEmits(["update:answer"]);
const optionList = computed(() => props.question.properties.options.split(/\r?\n/));
</script>
<style scoped></style>
