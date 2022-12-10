import { storeToRefs } from "pinia";
import { ref } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import surveyStore from "../store/survey";
import { authApi } from "../store/user";


export default (selectedQuestion: any) => {
    const $survey = surveyStore()
    const {survey} = storeToRefs(surveyStore())
    const ghostIndex: any = ref(null);
    const onDropContainer = async (e: any) => {
        e.stopPropagation();
        const cardsContainer = document.getElementById("cards-container");
        const cardList = Array.prototype.slice.call(cardsContainer?.children);
        const modifiedCardList = cardList.slice(ghostIndex);
        modifiedCardList.forEach((item) => {
          item.style.top = 0;
        });
        const question = JSON.parse(e.dataTransfer.getData("question"));
        if (ghostIndex.value != null) {
          survey.value.questions = survey.value.questions.map((item) =>
            item.index >= ghostIndex.value ? { ...item, index: item.index + 1 } : item
          );
          survey.value.questions.splice(ghostIndex.value, 0, {
            ...question,
            index: ghostIndex.value,
            response_questions: [],
          });
          selectedQuestion.value = survey.value.questions[ghostIndex.value]
          ghostIndex.value = null;
        } else {
          survey.value.questions.push(question);
          selectedQuestion.value = survey.value.questions[question.index]
        }
        
        $survey.addQuestion({...selectedQuestion.value, properties: JSON.stringify(selectedQuestion.value.properties)})
      };

      const onDragEnter = (e: any) => {
        const cardsContainer = document.getElementById("cards-container");
        const cardList = Array.prototype.slice.call(cardsContainer?.children);
        const questionId = parseInt(e.currentTarget.id.replace("question", ""));
        var newCardList = null;
      
        if (
          e.currentTarget.getBoundingClientRect().y +
            e.currentTarget.getBoundingClientRect().height / 2 <
          e.clientY
        ) {
          newCardList = cardList.slice(
            parseInt(e.currentTarget.id.replace("question", "")) + 1
          );
      
          ghostIndex.value = questionId + 1;
          e.currentTarget.style.top = 0;
        } else {
          newCardList = cardList.slice(parseInt(e.currentTarget.id.replace("question", "")));
          ghostIndex.value = questionId;
        }
      
        newCardList.forEach((item) => {
          item.style.top = 80 + "px";
        });
      };

      function onDropOutside(e: any) {
        e.preventDefault();
        if (ghostIndex.value != null) {
          const cardsContainer = document.getElementById("cards-container");
          const cardList = Array.prototype.slice.call(cardsContainer?.children);
          const modifiedCardList = cardList.slice(ghostIndex);
          modifiedCardList.forEach((item) => {
            item.style.top = 0;
          });
          const question = JSON.parse(e.dataTransfer.getData("question"));
      
          survey.value.questions.map((item) => {
            if (item.index >= ghostIndex) {
              item.index = item.index + 1;
              return item;
            }
      
            return item;
          });
      
          survey.value.questions.splice(ghostIndex.value, 0, {
            ...question,
            index: ghostIndex.value,
            response_questions: [],
          });
          selectedQuestion.value = question
          ghostIndex.value = null;

          $survey.addQuestion({...selectedQuestion.value, properties: JSON.stringify(selectedQuestion.value.properties)})
        }
      }

      function windowPreventDefault(e: any) {
        e.preventDefault();
      }
    

      return {ghostIndex, onDropContainer, onDragEnter, windowPreventDefault, onDropOutside}
}