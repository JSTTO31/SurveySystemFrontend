<template>
  <v-app>
    <AppBar
      v-model="show"
      v-model:showCreateQuestinnaire="showCreateQuestionaire"
    ></AppBar>
    <v-main>
      <RouterView></RouterView>
    </v-main>
  </v-app>
  <SurveyCreateDialogVue
    v-model:show-create-questionaire="showCreateQuestionaire"
  ></SurveyCreateDialogVue>
</template>

<script lang="ts" setup>
import AppBar from "./components/AppBar.vue";
import SurveyCreateDialogVue from "./components/SurveyCreateDialog.vue";
import { ref, provide } from "vue";
const showCreateQuestionaire = ref(false);
const show = ref(true);
provide("showAppBar", show);
</script>
