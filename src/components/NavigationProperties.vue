<template>
  <v-navigation-drawer
    color="transparent"
    class="text-grey-darken-3 border-0 bg-grey-lighten-4"
    width="440"
    location="right"
  >
    <transition name="fade">
      <v-card class="w-100 h-100 pa-5" v-if="Object.keys(selectedQuestion).length > 0">
        <h2>Properties</h2>
        <div class="my-5">
          <div class="mb-5">
            <h3 class="font-weight-medium">What is your question?</h3>
            <v-text-field
              v-model="text"
              @blur="($event : any) => selectedQuestion.text = $event.target.value"
              color="green-darken-4"
              variant="outlined"
              class="my-1 text-center"
              single-line
              hide-details
              label="input"
            ></v-text-field>
          </div>
          <Help
            v-model:placeholder="selectedQuestion.properties.placeholder"
            v-model:hint="selectedQuestion.properties.hint"
            v-if="
              selectedQuestion.type != 'Agree Disagree' &&
              selectedQuestion.type != 'YesOrNo' &&
              selectedQuestion.type != 'Range'
            "
          ></Help>
          <Option
            v-model:options="selectedQuestion.properties.options"
            v-if="
              selectedQuestion.type == 'Agree Disagree' ||
              selectedQuestion.type == 'Select' ||
              selectedQuestion.type == 'Range'
            "
          ></Option>
          <VariantVue
            v-model:variant="selectedQuestion.properties.variant"
            v-if="selectedQuestion.type == 'YesOrNo'"
          ></VariantVue>
          <Alignment
            v-model:alignment="selectedQuestion.properties.alignment"
            v-if="selectedQuestion.type == 'Agree Disagree'"
          ></Alignment>
          <!-- <Column v-if="selectedQuestion.type == 'Agree Disagree'"></Column> -->
          <TextAlignVue
            v-model:position="selectedQuestion.properties.position"
            v-if="selectedQuestion.type == 'Text'"
          ></TextAlignVue>
          <Width
            v-model:width="selectedQuestion.properties.width"
            v-if="
              selectedQuestion.type != 'Agree Disagree' &&
              selectedQuestion.type != 'YesOrNo' &&
              selectedQuestion.type != 'Range'
            "
          ></Width>
          <Position
            v-model:position="selectedQuestion.properties.position"
            v-if="selectedQuestion.type != 'Text' && selectedQuestion.type != 'Range'"
          ></Position>
          <Size
            v-model:size="selectedQuestion.properties.size"
            v-if="selectedQuestion.type == 'YesOrNo'"
          ></Size>
        </div>
      </v-card>
    </transition>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import VariantVue from "./properties/Variant.vue";
import Option from "./properties/Options.vue";
import Alignment from "./properties/Alignment.vue";
// import Column from "./properties/Column.vue";
import Help from "./properties/Help.vue";
import Size from "./properties/Size.vue";
import Position from "./properties/Position.vue";
import Width from "./properties/Width.vue";
import TextAlignVue from "./properties/TextAlign.vue";
import { ref, watch, watchEffect } from "vue";
import { storeToRefs } from "pinia";
import surveyStore from "../store/survey";
const $survey = surveyStore();
const { survey } = storeToRefs(surveyStore());
const props = defineProps(["selectedQuestion"]);
const text = ref(props.selectedQuestion.text);
watch(props.selectedQuestion, async (current) => {
  $survey.updateQuestion(props.selectedQuestion);
});
</script>

<style scoped>
.fade-enter-from,
.fade-leave-to {
  transform: translateX(100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: 0.1s;
}
</style>
