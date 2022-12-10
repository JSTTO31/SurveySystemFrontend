<template>
  <v-card flat @click.stop class="rounded-xl bg-grey-lighten-5 pa-5 d-flex">
    <v-avatar class="rounded-lg bg-grey-lighten-3 mt-4" size="80">
      <v-img src="https://statinfer.com/wp-content/uploads/dummy-user.png"></v-img>
    </v-avatar>
    <div>
      <v-card-title class="text-h5 font-weight-medium d-flex">
        <span style="text-overflow: ellipsis; overflow: hidden; width: 650px">{{
          discussion.title
        }}</span>
        <v-spacer></v-spacer>
        <span class="text-h6 text-grey-darken-1">25 minutes ago</span>
      </v-card-title>
      <v-card-text
        class="text-h6 font-weight-regular text-justify"
        style="line-height: 1.2; height: 50px; overflow: hidden; text-overflow: ellipsis"
      >
        {{ discussion.paragraph }}
      </v-card-text>
      <div class="px-5 d-flex mt-2">
        <div class="d-flex align-center text-grey-darken-1">
          <v-chip color="primary" prepend-icon="mdi-check">Solved</v-chip>
        </div>
        <v-spacer></v-spacer>
        <div class="d-flex align-center text-grey-darken-1 mr-5">
          <v-icon color="grey-darken-1">mdi-eye</v-icon>
          <span class="ml-2 font-weight-medium">15</span>
        </div>
        <div class="d-flex align-center text-grey-darken-1">
          <v-icon color="grey-darken-1">mdi-message</v-icon>
          <span class="ml-2 font-weight-medium">5</span>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
const props = defineProps(["discussion"]);
</script>

<style scoped></style>
