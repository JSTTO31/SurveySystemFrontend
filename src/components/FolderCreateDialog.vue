<template>
  <v-overlay
    @click:outside="emits('update:showDialog', false)"
    class="d-flex align-center justify-center"
    :model-value="showDialog"
  >
    <v-card class="mx-auto rounded-lg px-3 pb-5 px-5" width="450">
      <div class="text-h6 pt-5 pb-2 d-flex align-center">New Folder</div>
      <v-text-field
        density="compact"
        color="#3D8361"
        variant="outlined"
        label="Folder name"
        single-line
        v-model="$v.name.$model"
        :error-messages="errorMessage($v.name)"
      ></v-text-field>
      <div class="d-flex mt-3">
        <v-spacer></v-spacer>
        <v-btn
          flat
          color="grey-lighten-4"
          class="px-5 mr-2"
          @click="emits('update:showDialog', false)"
          >Cancel</v-btn
        >
        <v-btn
          flat
          variant="elevated"
          color="#3D8361"
          class="px-5 text-white"
          @click="submit"
          :loading="loading"
          >Create</v-btn
        >
      </div>
    </v-card>
  </v-overlay>
</template>

<script setup lang="ts">
import surveyStore from "../store/survey";
import { errorMessage } from "../utils";
import { ref } from "vue";
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
defineProps(["showDialog"]);
const $survey = surveyStore();
const emits = defineEmits(["update:showDialog"]);
const rules = {
  name: { required },
};
const name = ref("");
const loading = ref(false);
const $v = useVuelidate(rules, { name });

const submit = async () => {
  if ($v.value.$invalid) {
    $v.value.name.$touch();
    return;
  }
  loading.value = true;
  $survey.addFolder(name.value).then(() => {
    loading.value = false;
    emits("update:showDialog", false);
  });
};
</script>

<style scoped></style>
