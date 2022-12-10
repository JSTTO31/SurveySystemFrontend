import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import surveyStore from '../store/survey';


export default () => {
    const $survey = surveyStore()
    const survey = reactive({
        title: '',
        description: ''
    })
    const loading = ref(false)
    const route = useRoute()
    const create = () => {
        let folder_id : any = null 
        if(route.name == 'my-survey.folder'){
            folder_id = route.params.id
        }
        loading.value = true
        return $survey.store(survey.title, survey.description, folder_id).then(() => loading.value  = false);
    }

    return {survey, create, loading};
}