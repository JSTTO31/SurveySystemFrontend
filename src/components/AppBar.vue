<template>
  <v-app-bar
    flat
    class="border pr-10"
    color="#1C6758"
    v-if="
      route.name != 'Login' && route.name != 'Register' && route.name != 'survey.view'
    "
    id="app"
  >
    <div class="px-5">
      <v-app-bar-title
        style="cursor: pointer"
        class="font-weight-black text-h5 text-white pa-0 ma-0"
        @click="router.push({ name: 'survey.home' })"
        >iSurvey</v-app-bar-title
      >
    </div>
    <div class="ml-15" v-if="isLogin">
      <v-btn
        variant="text"
        class="text-capitalize mr-2"
        color="white"
        :to="{ name: 'survey.dashboard' }"
        >Dashboard</v-btn
      >
      <v-btn
        variant="text"
        class="mr-2 text-capitalize"
        color="white"
        :to="{ name: 'my-survey.index' }"
        >My Survey</v-btn
      >
      <v-btn
        variant="text"
        class="mr-2 text-capitalize"
        color="white"
        :to="{ name: 'Forum' }"
        >Forum</v-btn
      >
      <v-btn variant="text" class="mr-2 text-capitalize" color="white"
        >Make Response</v-btn
      >
    </div>
    <v-spacer></v-spacer>
    <div class="d-flex align-center mr-5" v-if="isLogin">
      <v-btn
        class="mr-5"
        @click="emits('update:showCreateQuestinnaire', true)"
        color="#D6CDA4"
        variant="elevated"
        prepend-icon="mdi-plus"
        v-if="!/my-survey/.test(String(route.name))"
        >Create Survey</v-btn
      >
      <v-icon color="white">mdi-bell</v-icon>
      <v-divider vertical class="mx-5"></v-divider>
      <v-avatar size="50" class="mr-2" color="white">
        <v-img src="https://avatars.githubusercontent.com/u/59255732?v=4"></v-img>
      </v-avatar>
      <div class="mr-3 text-white">
        <h4>Joshua Sotto</h4>
        <h5 class="font-weight-light">Student</h5>
      </div>
      <v-menu>
        <template #activator="{ props }">
          <v-btn v-bind="props" icon="mdi-chevron-down" color="white"></v-btn>
        </template>
        <v-card width="250">
          <v-list>
            <v-list-item prepend-icon="mdi-account" @click="">Profile</v-list-item>
            <v-list-item prepend-icon="mdi-logout" @click="$user.logout()"
              >Logout</v-list-item
            >
          </v-list>
        </v-card>
      </v-menu>
    </div>
    <div class="d-flex align-center" v-if="!route.meta.requiresAuth && !isLogin">
      <v-btn
        variant="elevated"
        color="transparent"
        class="text-white"
        :to="{ name: 'Login' }"
        >Login</v-btn
      >
      <v-divider vertical class="mx-2"></v-divider>
      <v-btn variant="elevated" color="#D6CDA4" :to="{ name: 'Register' }"
        >Register</v-btn
      >
    </div>
  </v-app-bar>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import userStore from "../store/user";
const $user = userStore();
const { isLogin } = storeToRefs($user);
defineProps(["showCreateQuestinnaire"]);
const emits = defineEmits(["update:showCreateQuestinnaire"]);
const route = useRoute();
const showMenu = ref(false);
const router = useRouter();
</script>

<style scoped></style>
