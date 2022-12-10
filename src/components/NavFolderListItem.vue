<template>
  <v-list-item
    active-class=""
    class="font-weight-regular rounded-lg"
    prepend-icon="mdi-folder"
    color="#395144"
    :title="folder.name"
    :to="{ name: 'my-survey.folder', params: { id: folder.id } }"
  >
    <template #append>
      <v-menu>
        <template #activator="{ props }">
          <v-btn
            variant="text"
            v-bind="props"
            size="small"
            @click.stop
            icon="mdi-dots-vertical"
          ></v-btn>
        </template>
        <v-card class="rounded-lg" width="220">
          <v-list>
            <v-list-item
              class="text-error"
              prepend-icon="mdi-delete"
              @click="$survey.folderSoftDelete(folder.id)"
              >Move to trash</v-list-item
            >
          </v-list>
        </v-card>
      </v-menu>
    </template>
  </v-list-item>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import surveyStore from "../store/survey";
const router = useRouter();
const $survey = surveyStore();
const props = defineProps(["folder"]);
</script>

<style scoped></style>
