<template>
  <div class="">
    <v-textarea
      variant="underlined"
      color="#1C6758"
      rows="3"
      v-bind="$attrs"
      auto-grow
      placeholder="Paragraph"
    ></v-textarea>
  </div>
</template>
<script>
export default {
  inheritAttrs: false,
};
</script>
<script setup lang="ts"></script>

<style scoped></style>
