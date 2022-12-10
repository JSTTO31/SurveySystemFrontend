<template>
  <v-layout class="w-100 h-100">
    <v-navigation-drawer width="320" color="grey-lighten-4">
      <div class="h-100 d-flex flex-column">
        <h1 class="text-h6 text-grey-darken-1 px-3 pt-5">Surveys</h1>
        <v-list class="px-2">
          <v-list-item
            @click="router.push({ name: 'my-survey.index' })"
            prepend-icon="mdi-home"
            class="rounded-lg"
          >
            Home
          </v-list-item>
        </v-list>
        <h1 class="text-h6 text-grey-darken-1 px-3 pt-5">My Surveys</h1>
        <v-list class="px-2">
          <NavFolderListItemVue
            :folder="folder"
            v-for="folder in folders"
          ></NavFolderListItemVue>
          <v-list-item
            prepend-icon="mdi-file"
            class="rounded-lg"
            v-for="survey in surveys.filter((item) => !item.folder_id)"
            :title="survey.title"
            :to="{ name: 'survey.show.design', params: { id: survey.id } }"
          ></v-list-item>
          <v-list-item
            class="font-weight-regular rounded-lg"
            prepend-icon="mdi-plus-circle-outline"
            color="grey-lighten-4"
            @click="showCreateFolderDialog = true"
            >Create new folder</v-list-item
          >
        </v-list>
        <v-spacer></v-spacer>
        <v-divider></v-divider>
        <v-list class="px-2">
          <v-list-item
            prepend-icon="mdi-delete-outline"
            class="font-weight-regular rounded-lg text-error font-weight-medium"
            :to="{ name: 'my-survey.trashed' }"
          >
            <template #append>
              <v-chip color="red">{{ numberOfTrashed }}</v-chip>
            </template>
            Trash</v-list-item
          >
        </v-list>
      </div>
    </v-navigation-drawer>
    <v-main id="main-container" style="overflow-y: scroll; height: 900px" class="pb-15">
      <RouterView></RouterView>
    </v-main>
    <FolderCreateDialogVue
      v-model:show-dialog="showCreateFolderDialog"
    ></FolderCreateDialogVue>
    <TrashedDialogVue v-model:show-dialog="showTrashed"></TrashedDialogVue>
  </v-layout>
</template>

<script setup lang="ts">
import TrashedDialogVue from "../../components/TrashedDialog.vue";
import NavFolderListItemVue from "../../components/NavFolderListItem.vue";
import FolderCreateDialogVue from "../../components/FolderCreateDialog.vue";
import { storeToRefs } from "pinia";
import surveyStore from "../../store/survey";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const { surveys, folders, numberOfTrashed } = storeToRefs(surveyStore());
const $survey = surveyStore();
const showCreateFolderDialog = ref(false);
const showTrashed = ref(false);
const router = useRouter();
$survey.getAll();
$survey.getAllFolders();
$survey.getAllTrashed();
</script>

<style scoped>
#main-container::-webkit-scrollbar {
  width: 5px;
}

#main-container::-webkit-scrollbar-thumb {
  background-color: #4e6c50;
}
</style>
