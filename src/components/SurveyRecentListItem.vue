<template>
  <v-card
    class="w-100 pa-5 border my-2 d-flex align-center rounded-lg"
    flat
    :to="{ name: 'survey.show.design', params: { id: survey.id } }"
  >
    <template #prepend>
      <v-icon size="50" color="#1C6758">mdi-text-box</v-icon>
    </template>
    <div class="d-flex flex-column" style="width: 450px">
      <h3 class="text-no-wrap" style="text-overflow: ellipsis; overflow: hidden">
        {{ survey.title }}
      </h3>
      <h5 class="font-weight-regular d-flex align-center">
        Created at: {{ new Date(survey.created_at).toDateString() }}
        <v-divider vertical class="mx-2"></v-divider>
        Updated at: {{ new Date(survey.updated_at).toDateString() }}
      </h5>
    </div>
    <v-divider vertical class="mx-5"></v-divider>
    <div class="d-flex flex-column">
      <v-chip size="large" color="success">Open</v-chip>
    </div>
    <v-divider vertical class="mx-5"></v-divider>
    <div class="d-flex flex-column">
      <h3 class="text-center">{{ 100 }}</h3>
      <h5 class="text-grey-darken-2">Total Responses</h5>
    </div>
    <v-divider vertical class="mx-5"></v-divider>
    <div class="d-flex flex-column text-center">
      <h3>{{ Math.floor(Math.random() * 100) + 5 }}</h3>
      <h5 class="text-grey-darken-2">Total Points</h5>
    </div>
    <v-divider vertical class="mx-5"></v-divider>
    <v-spacer></v-spacer>
    <v-menu>
      <template #activator="{ props }">
        <v-btn
          v-bind="props"
          variant="text"
          @click.prevent
          class="rounded-lg"
          size="large"
        >
          <v-icon color="grey-darken-3" size="35">mdi-dots-horizontal</v-icon>
        </v-btn>
      </template>
      <v-card width="250" class="rounded-lg">
        <v-list>
          <v-list-item
            class="text-grey-darken-2 text-h6"
            prepend-icon="mdi-text"
            @click=""
            >Rename</v-list-item
          >
          <v-list-item
            class="text-grey-darken-2 text-h6"
            prepend-icon="mdi-delete-outline"
            @click=""
            >Remove</v-list-item
          >
          <v-list-item
            class="text-grey-darken-2 text-h6"
            prepend-icon="mdi-open-in-new"
            @click=""
            >Open new tab</v-list-item
          >
        </v-list>
      </v-card>
    </v-menu>
  </v-card>
</template>

<script setup lang="ts">
import { Survey } from "../store/survey";
const props = defineProps<{ survey: Survey }>();
</script>

<style scoped></style>
