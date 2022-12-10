<template>
  <div class="w-50">
    <v-text-field
      variant="underlined"
      :placeholder="'Short Text'"
      color="#1C6758"
      v-bind="$attrs"
    ></v-text-field>
  </div>
</template>
<script>
export default {
  inheritAttrs: false,
};
</script>
<script setup lang="ts"></script>

<style scoped></style>
