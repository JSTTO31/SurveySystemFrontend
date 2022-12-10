<template>
  <v-hover v-slot="{ props, isHovering }">
    <v-card
      v-bind="props"
      class="w-100 my-1 d-flex align-center rounded-lg border"
      flat
      :to="{ name: 'my-survey.folder', params: { id: folder.id } }"
    >
      <template #prepend>
        <v-checkbox color="#395144" hide-details @click.stop></v-checkbox>
      </template>
      <v-icon size="50" class="mr-5" color="grey-darken-2">mdi-folder</v-icon>
      <div class="d-flex flex-column" style="width: 450px">
        <h3
          class="text-no-wrap text-grey-darken-2"
          style="text-overflow: ellipsis; overflow: hidden"
        >
          {{ folder.name }}
        </h3>
      </div>
      <v-spacer></v-spacer>
      <div class="mx-5">
        <v-btn variant="plain" v-if="isHovering" color="error" prepend-icon="mdi-delete"
          >Remove</v-btn
        >
      </div>
    </v-card>
  </v-hover>
</template>

<script setup lang="ts">
const props = defineProps<{ folder: any }>();
</script>

<style scoped></style>
