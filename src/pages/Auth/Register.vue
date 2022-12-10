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
      <h2 class="font-weight-medium text-h4 px-3 pb-5">Create Account</h2>
      <v-card-text>
        <div>
          <label for="" class="text-subtitle-1 font-weight-medium text-grey-darken-2"
            >Name</label
          >
          <v-text-field
            :error-messages="errorMessage($v.name)"
            v-model="$v.name.$model"
            single-line
            class="mt-2"
            color="#1c6758"
            variant="outlined"
            label="Name"
          ></v-text-field>
        </div>
        <div>
          <label for="" class="text-subtitle-1 font-weight-medium text-grey-darken-2"
            >Email address</label
          >
          <v-text-field
            :error-messages="errorMessage($v.email)"
            v-model="$v.email.$model"
            single-line
            class="mt-2"
            color="#1c6758"
            variant="outlined"
            label="Email Address"
          ></v-text-field>
        </div>
        <div>
          <label for="" class="text-subtitle-1 font-weight-medium text-grey-darken-2"
            >Password</label
          >
          <v-text-field
            :error-messages="errorMessage($v.password)"
            type="password"
            v-model="$v.password.$model"
            single-line
            class="mt-2"
            color="#1c6758"
            variant="outlined"
            label="Password"
          ></v-text-field>
        </div>
        <div>
          <label for="" class="text-subtitle-1 font-weight-medium text-grey-darken-2"
            >Confirmation Password</label
          >
          <v-text-field
            :error-messages="errorMessage($v.password_confirmation)"
            type="password"
            v-model="$v.password_confirmation.$model"
            single-line
            class="mt-2"
            color="#1c6758"
            variant="outlined"
            label="Password Confirmation"
          ></v-text-field>
        </div>
      </v-card-text>
      <div class="pa-5">
        <v-btn
          size="large"
          flat
          block
          color="#1c6758"
          class="text-white rounded-lg"
          @click="signUp"
          :loading="loading"
          >Sign up</v-btn
        >
      </div>
      <v-divider class="my-2"></v-divider>
      <h3 class="text-center text-grey-darken-1">Already have an account?</h3>
      <h3 class="text-center text-blue">
        <RouterLink :to="{ name: 'Login' }">Sign in</RouterLink>
      </h3>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { errorMessage } from "../../utils";
import { useRouter } from "vue-router";
import useRegister from "../../composable/useRegister";
const router = useRouter();
const { register, signUp, $v, loading } = useRegister();
</script>

<style scoped></style>
