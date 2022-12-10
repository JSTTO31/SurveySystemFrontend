<template>
  <v-layout class="h-screen" id="layout">
    <!-- 
   
    <v-main style="overflow-y: scroll">
      <router-view></router-view>
    </v-main> -->
    <!-- <v-navigation-drawer color="grey-lighten-5" width="350" v-model="showNav">
      <div class="pa-8">
        <v-avatar class="bg-white" size="85">
          <v-img src="https://avatars.githubusercontent.com/u/59255732?v=4"></v-img>
        </v-avatar>
        <h1 class="text-h4 font-weight-medium mt-3 text-capitalize">{{ user.name }}</h1>
        <h4 class="text-grey-darken-1">{{ user.email }}</h4>
      </div>
      <v-list nav>
        <v-list-item
          :to="{ name: 'survey.dashboard' }"
          color="#1C6758"
          variant="elevated"
          active-class="text-white"
          prepend-icon="mdi-newspaper"
          class="my-2 text-h6 pl-12"
          >Dashboard</v-list-item
        >
        <v-list-item @click="" prepend-icon="mdi-magnify" class="my-2 text-h6 pl-12"
          >Search
        </v-list-item>
        <v-list-item
          @click=""
          prepend-icon="mdi-account-multiple-plus-outline"
          class="my-2 text-h6 pl-12"
          >Friend Request</v-list-item
        >
        <v-list-item
          @click=""
          prepend-icon="mdi-book-outline"
          class="my-2 text-h6 pl-12 border-0"
          >Activities</v-list-item
        >
      </v-list>
    </v-navigation-drawer> -->

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts"></script>

<style scoped>
#title {
  @import url("https://fonts.googleapis.com/css?family=Tangerine");
  font-family: "Tangerine", serif;
  font-size: 38px;
}
</style>
