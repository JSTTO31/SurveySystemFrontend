import { storeToRefs } from "pinia";
import { reactive } from "vue"
import surveyStore from "../store/survey";
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'


export default () => {
    const {survey} = storeToRefs(surveyStore());
    const $survey = surveyStore();
    const edit = reactive({
        title: survey.value.title,
        description: survey.value.description,
    });

    const rules = {
        title: {required},
        description: {}
    }

    const $v = useVuelidate(rules, edit)

    const update = () => {
        if($v.value.$dirty){
            if($v.value.$invalid){
                edit.title = survey.value.title;
                return 
            }
            $v.value.$reset();
            $survey.update(edit)
        }
    }

    return {$v, edit, update};
}