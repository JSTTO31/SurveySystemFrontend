<template>
  <v-container class="h-100" style="background: #eef2e6; padding: 55px 550px" fluid>
    <h1
      class="my-3"
      style="color: #1c6758; cursor: pointer"
      @click="router.push({ name: 'survey.home' })"
    >
      ISurvey
    </h1>
    <v-card width="650" class="pa-5 rounded-lg" flat>
      <h2 class="font-weight-medium text-h4 px-3 pb-5">Welcome to our Survey App</h2>
      <v-card-text>
        <div>
          <label for="" class="text-subtitle-1 font-weight-medium text-grey-darken-2"
            >Email address</label
          >
          <v-text-field
            class="mt-2"
            :error-messages="errorMessage($v.email)"
            v-model="$v.email.$model"
            variant="outlined"
            label="Email Address"
            single-line
            color="#1c6758"
            @keypress.enter="signIn"
          ></v-text-field>
        </div>
        <label for="" class="text-subtitle-1 font-weight-medium text-grey-darken-2"
          >Password</label
        >
        <v-text-field
          :error-messages="errorMessage($v.password)"
          :type="showPassword ? 'text' : 'password'"
          class="mt-2"
          v-model="$v.password.$model"
          variant="outlined"
          label="Password"
          single-line
          color="#1c6758"
          :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append-inner="showPassword = !showPassword"
          @keypress.enter="signIn"
        ></v-text-field>
      </v-card-text>
      <div class="pa-5">
        <v-btn
          size="large"
          flat
          block
          color="#1c6758"
          class="text-white rounded-lg"
          @click="signIn"
          :loading="loading"
          >Log in</v-btn
        >
      </div>
      <v-divider class="my-2"></v-divider>
      <h3 class="text-center text-grey-darken-1">Don't have an account?</h3>
      <h3 class="text-center text-blue">
        <RouterLink :to="{ name: 'Register' }">Sign up</RouterLink>
      </h3>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { errorMessage } from "../../utils";
import { ref } from "vue";
import { useRouter } from "vue-router";
import useLogin from "../../composable/useLogin";
const showPassword = ref(false);
const { login, signIn, $v, loading } = useLogin();
const router = useRouter();
</script>

<style scoped></style>
